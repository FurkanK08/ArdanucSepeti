-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 0. Clean old test data
-- public.orders ve diğer tablolar ON DELETE CASCADE içermediği için önce onlardaki dışa bağımlı verileri siliyoruz
DELETE FROM public.order_items WHERE order_id IN (
  SELECT id FROM public.orders WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333')
);
DELETE FROM public.orders WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333');
DELETE FROM public.addresses WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333');
DELETE FROM public.products WHERE category_id IN (
  SELECT id FROM public.categories WHERE store_id IN (
    SELECT id FROM public.stores WHERE owner_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333')
  )
);
DELETE FROM public.categories WHERE store_id IN (
  SELECT id FROM public.stores WHERE owner_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333')
);
DELETE FROM public.stores WHERE owner_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333');
DELETE FROM auth.users WHERE id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333');

-- 1. Insert Test Users into auth.users 
-- Müşteri (Customer), Restoran (Vendor), Kurye (Courier)
INSERT INTO auth.users (id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin)
VALUES 
(
  '11111111-1111-1111-1111-111111111111', 'authenticated', 'authenticated', '+905551112233@test.com', crypt('123456', gen_salt('bf')), now(), now(), now(), 
  '{"provider": "email", "providers": ["email"]}'::jsonb, '{}'::jsonb, false
),
(
  '22222222-2222-2222-2222-222222222222', 'authenticated', 'authenticated', '+905552223344@test.com', crypt('123456', gen_salt('bf')), now(), now(), now(), 
  '{"provider": "email", "providers": ["email"]}'::jsonb, '{}'::jsonb, false
),
(
  '33333333-3333-3333-3333-333333333333', 'authenticated', 'authenticated', '+905553334455@test.com', crypt('123456', gen_salt('bf')), now(), now(), now(), 
  '{"provider": "email", "providers": ["email"]}'::jsonb, '{}'::jsonb, false
)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Profiles into public.profiles
INSERT INTO public.profiles (id, full_name, phone, role, is_active)
VALUES 
('11111111-1111-1111-1111-111111111111', 'Test Müşteri', '5551112233', 'customer', true),
('22222222-2222-2222-2222-222222222222', 'Test Restoran Sahibi', '5552223344', 'vendor', true),
('33333333-3333-3333-3333-333333333333', 'Test Kurye', '5553334455', 'courier', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Store into public.stores
INSERT INTO public.stores (id, owner_id, name, is_open, min_order)
VALUES 
('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'Test Burger', true, 50.00)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Categories into public.categories
INSERT INTO public.categories (id, store_id, name, display_order)
VALUES 
('55555555-5555-5555-5555-555555555551', '44444444-4444-4444-4444-444444444444', 'Burgerler', 1),
('55555555-5555-5555-5555-555555555552', '44444444-4444-4444-4444-444444444444', 'İçecekler', 2)
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Products into public.products
INSERT INTO public.products (id, category_id, name, price, is_out_of_stock)
VALUES 
('66666666-6666-6666-6666-666666666661', '55555555-5555-5555-5555-555555555551', 'Klasik Burger', 120.00, false),
('66666666-6666-6666-6666-666666666662', '55555555-5555-5555-5555-555555555551', 'Cheeseburger', 140.00, false),
('66666666-6666-6666-6666-666666666663', '55555555-5555-5555-5555-555555555552', 'Kutu Kola', 30.00, false),
('66666666-6666-6666-6666-666666666664', '55555555-5555-5555-5555-555555555552', 'Ayran', 20.00, false)
ON CONFLICT (id) DO NOTHING;

-- 6. Insert Address into public.addresses
INSERT INTO public.addresses (id, user_id, title, address_text)
VALUES 
('77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', 'Evim', 'Atatürk Mah. Cumhuriyet Cad. No:1')
ON CONFLICT (id) DO NOTHING;

-- 7. Insert Orders into public.orders
INSERT INTO public.orders (id, store_id, user_id, courier_id, status, total_price, order_note, payment_method)
VALUES 
-- 1. Tamamlanmış sipariş (Kurye 333... tarafından teslim edilmiş)
('88888888-8888-8888-8888-888888888881', '44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'delivered', 270.00, 'Zili çalmayın lütfen', 'Kredi Kartı'),
-- 2. Bekleyen yeni sipariş (Henüz atanmamış)
('88888888-8888-8888-8888-888888888882', '44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', NULL, 'pending', 150.00, 'Bol ketçap olsun', 'Nakit')
ON CONFLICT (id) DO NOTHING;

-- 8. Insert Order Items into public.order_items
INSERT INTO public.order_items (id, order_id, product_id, quantity, unit_price)
VALUES 
-- İlk siparişin ürünleri
(gen_random_uuid(), '88888888-8888-8888-8888-888888888881', '66666666-6666-6666-6666-666666666662', 1, 140.00), -- 1x Cheeseburger
(gen_random_uuid(), '88888888-8888-8888-8888-888888888881', '66666666-6666-6666-6666-666666666661', 1, 120.00), -- 1x Klasik Burger
(gen_random_uuid(), '88888888-8888-8888-8888-888888888881', '66666666-6666-6666-6666-666666666664', 2, 20.00), -- 1x Ayran x 2 = 2 (id: ...64 -> null?) - wait, 2x Ayran
-- İkinci siparişin ürünleri
(gen_random_uuid(), '88888888-8888-8888-8888-888888888882', '66666666-6666-6666-6666-666666666661', 1, 120.00), -- 1x Klasik Burger
(gen_random_uuid(), '88888888-8888-8888-8888-888888888882', '66666666-6666-6666-6666-666666666663', 1, 30.00); -- 1x Kutu Kola
