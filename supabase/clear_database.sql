-- DİKKAT: Bu kod test amaçlıdır ve auth.users ile beraber ona bağlı tüm public şemalarındaki verileri (profiles, orders, vb.) siler!

-- Sadece test hesaplarını temizler
DELETE FROM public.order_items WHERE order_id IN (
  SELECT id FROM public.orders WHERE user_id IN (SELECT id FROM auth.users WHERE phone IN ('+905551112233', '+905552223344', '+905553334455') OR email LIKE '%@test.com')
);
DELETE FROM public.orders WHERE user_id IN (SELECT id FROM auth.users WHERE phone IN ('+905551112233', '+905552223344', '+905553334455') OR email LIKE '%@test.com');
DELETE FROM public.addresses WHERE user_id IN (SELECT id FROM auth.users WHERE phone IN ('+905551112233', '+905552223344', '+905553334455') OR email LIKE '%@test.com');
DELETE FROM public.products WHERE category_id IN (
  SELECT id FROM public.categories WHERE store_id IN (
    SELECT id FROM public.stores WHERE owner_id IN (SELECT id FROM auth.users WHERE phone IN ('+905551112233', '+905552223344', '+905553334455') OR email LIKE '%@test.com')
  )
);
DELETE FROM public.categories WHERE store_id IN (
  SELECT id FROM public.stores WHERE owner_id IN (SELECT id FROM auth.users WHERE phone IN ('+905551112233', '+905552223344', '+905553334455') OR email LIKE '%@test.com')
);
DELETE FROM public.stores WHERE owner_id IN (SELECT id FROM auth.users WHERE phone IN ('+905551112233', '+905552223344', '+905553334455') OR email LIKE '%@test.com');
DELETE FROM auth.users WHERE phone IN ('+905551112233', '+905552223344', '+905553334455') OR email LIKE '%@test.com';

-- İsterseniz TÜM test veritabanını baştan aşağı komple sıfırlamak için bu alttaki yorum satırlarını açabilirsiniz:
/*
TRUNCATE TABLE public.order_items CASCADE;
TRUNCATE TABLE public.orders CASCADE;
TRUNCATE TABLE public.addresses CASCADE;
TRUNCATE TABLE public.products CASCADE;
TRUNCATE TABLE public.categories CASCADE;
TRUNCATE TABLE public.stores CASCADE;
TRUNCATE TABLE public.profiles CASCADE;
TRUNCATE TABLE auth.users CASCADE;
*/
