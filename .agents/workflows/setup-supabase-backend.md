---
description: Supabase Backend Configuration Workflow — Veritabanı tablolarını, RLS politikalarını ve edge functionları kurmak için adım adım kılavuz
---

# Supabase Backend Configuration Workflow

Bu workflow, Pazar Yeri uygulamasının **Supabase backend altyapısını** (tablolar, RLS politikaları, real-time ve storage) sıfırdan veya kısmen kurmak için kullanılır.

---

## Step 1 — Context & Scope Confirmation

Neyin kurulacağını netleştir:
- Tüm şema mı yoksa belirli bir tablo/özellik mi?
- Supabase projesi oluşturuldu mu? (URL ve Anon Key mevcut mu?)

Eksik bilgi varsa **DUR ve sor.**

---

## Step 2 — Core Tables & Extensions

Önce uzantıları etkinleştir:
```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

Sırasıyla tablolar:
1. `profiles` (id UUID, full_name, phone, role ENUM, push_token, is_active)
2. `stores` (id, name, is_open, service_area GEOGRAPHY(POLYGON), min_order)
3. `categories` (id, store_id, name, display_order)
4. `products` (id, category_id, name, price, image_url, is_out_of_stock)
5. `addresses` (id, user_id, title, address_text, location GEOGRAPHY(POINT))
6. `orders` (id, store_id, user_id, courier_id, status ENUM, total_price, order_note, payment_method)
7. `order_items` (id, order_id, product_id, quantity, unit_price)

---

## Step 3 — RLS Politikaları

Her tablo için RLS'yi etkinleştir ve politikaları ekle:

```sql
-- Müşteri sadece kendi siparişlerini görür
CREATE POLICY "customer_own_orders" ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Vendor sadece kendi store_id'sine ait siparişleri görür
CREATE POLICY "vendor_own_orders" ON orders FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'vendor'
  ) AND store_id = (SELECT store_id FROM profiles WHERE id = auth.uid()));

-- Kurye sadece kendine atanmış siparişleri günceller
CREATE POLICY "courier_own_delivery" ON orders FOR UPDATE
  USING (courier_id = auth.uid());
```

---

## Step 4 — Real-time Subscriptions (Gerekli Tablolar)

Aşağıdaki tablolarda Supabase Real-time'ı etkinleştir:
- `orders` → Yeni sipariş geldiğinde Vendor'a ve Kurye havuzuna push tetiklenir.
- `products` → Admin ürünü kapattığında Müşteri anasayfasında anlık güncellenir.

---

## Step 5 — Storage Bucket

```sql
-- Ürün görselleri için bucket oluştur
INSERT INTO storage.buckets (id, name) VALUES ('product-images', 'product-images');
```

Public read, authenticated write politikasını ekle.

---

## Step 6 — Güvenlik Doğrulaması

`.agents/rules/backend-rules.md` kontrol listesi:
- [ ] Tüm tablolarda RLS aktif mi?
- [ ] Hiçbir tablo filtresiz `SELECT *` çekiyor mu?
- [ ] Kurye, kendi dışındaki bir siparişi güncelleyebiliyor mu? (Olmamalı)

---

## Step 7 — Final Output & Summary

Şunları sun:
- Oluşturulan/güncellenen tabloların listesi
- `.env` dosyasına eklenecek değişkenler (`SUPABASE_URL`, `SUPABASE_ANON_KEY`)
- Opsiyonel: Test seed data oluşturma adımı

**Step 7 sonrası dur.**
