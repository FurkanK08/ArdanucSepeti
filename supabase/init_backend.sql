-- Extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Enum Types
CREATE TYPE user_role AS ENUM ('customer', 'vendor', 'courier');
CREATE TYPE order_status AS ENUM ('pending', 'preparing', 'ready', 'picked_up', 'delivered', 'cancelled');

-- 1. profiles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  role user_role DEFAULT 'customer',
  push_token TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. stores
CREATE TABLE public.stores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES public.profiles(id),
  name TEXT NOT NULL,
  is_open BOOLEAN DEFAULT false,
  service_area GEOGRAPHY(POLYGON),
  min_order DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. categories
CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);

-- 4. products
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_out_of_stock BOOLEAN DEFAULT false
);

-- 5. addresses
CREATE TABLE public.addresses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT,
  address_text TEXT NOT NULL,
  location GEOGRAPHY(POINT)
);

-- 6. orders
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID REFERENCES public.stores(id),
  user_id UUID REFERENCES public.profiles(id),
  courier_id UUID REFERENCES public.profiles(id),
  status order_status DEFAULT 'pending',
  total_price DECIMAL(10,2) NOT NULL,
  order_note TEXT,
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. order_items
CREATE TABLE public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL
);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Stores are viewable by everyone" ON public.stores FOR SELECT USING (true);
CREATE POLICY "Vendors can update own store" ON public.stores FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Categories viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Products viewable by everyone" ON public.products FOR SELECT USING (true);

CREATE POLICY "Users view own addresses" ON public.addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage own addresses" ON public.addresses FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "customer_own_orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "vendor_own_orders" ON public.orders FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.stores 
    WHERE stores.id = orders.store_id AND stores.owner_id = auth.uid()
  )
);
CREATE POLICY "courier_own_delivery" ON public.orders FOR UPDATE USING (courier_id = auth.uid());
CREATE POLICY "Users can insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Real-time
alter publication supabase_realtime add table public.orders;
alter publication supabase_realtime add table public.products;

-- Storage
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT DO NOTHING;
CREATE POLICY "Public Access to product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Vendors can upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
