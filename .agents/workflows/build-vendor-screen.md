---
description: Vendor (Restoran) Panel Screen Workflow — Restoran paneli ekranlarını oluşturmak için adım adım kılavuz
---

# Vendor Panel Construction Workflow

Bu workflow, Pazar Yeri uygulamasının **Restoran Sahibi (Vendor)** tarafına ait ekranların oluşturulmasını yönlendirir.

---

## Step 1 — Context & Scope Confirmation

Ekran talebini netleştir:
- Hangi vendor ekranı? (`VendorDashboardScreen` veya `StoreSettingsScreen`)
- Bu ekranın hangi Supabase tablosuna yazdığını veya okuduğunu belirt: `orders` tablosu mu, `products` tablosu mu?

Rol sınırı: Bu ekranlar yalnızca `src/screens/vendor/` altına yazılır.  
Eksik bilgi varsa **DUR ve sor.**

---

## Step 2 — Activate Skills & Rules

Sırayla oku:
1. `.agents/rules/backend-rules.md` → Supabase güvenlik kuralları
2. `.agents/rules/frontend-rules.md` → Bileşen kuralları
3. `.agents/skills/marketplace-ui/resources/tokens.json` → Tasarım sistemi
4. `docs/ui-designs/vendor_dashboard/code.html` veya `docs/ui-designs/vendor_envanter_yonetimi/code.html` → Tasarım referansı

**KESİN KURAL (UI TASARIMI):** Tüm arayüz kodlamaları `docs/ui-designs/` klasöründeki html prototipleri referans alınarak yapılmalıdır. HTML tasarımdaki renkler, yerleşimler ve spacing oranları `theme.ts` yardımıyla React Native'e tam sadakatle çevrilmelidir. Tasarım klasörde yoksa DUR ve tasarımı iste. Hayalden UI oluşturmak yasaktır. Mevcut Vendor tasarımları: `vendor_dashboard`, `vendor_envanter_yonetimi`, `men_d_zenleyici`, `restoran_profili_ve_saatler`, `restoran_sipari_ge_mi_i_ve_kazan`.

---

## Step 3 — Vendor Screen Planning

Vendor ekranları için standart yapı:
- Başlık (Restoran ismi veya Sipariş sayacı)
- Sipariş Kartları feed'i (dikey liste, real-time subscription)
- Her kartta: Ürün listesi, Sipariş notu (sarı highlight), Aksiyonlar

**Kullanıcı onayını bekle.**

---

## Step 4 — Dashboard Screen Generation

`src/screens/vendor/VendorDashboardScreen.tsx` oluştur:

- Siparişler için Supabase real-time subscription kurulur (`src/hooks/useVendorOrders.ts` içinde).
- Sipariş kartı bileşeni `src/components/vendor/OrderCard.tsx` olarak ayrılır.
- Aksiyonlar: **"Kabul Et & Hazırla"** (yeşil) ve **"Reddet"** (kırmızı outline).
- Yemek hazır olduğunda: **"Kurye Havuzuna Gönder"** butonu aktif hale gelir.
- Yeni sipariş geldiğinde `expo-av` ile ses çalınır (Ping/Zil).

---

## Step 5 — Settings/Inventory Screen Generation

`src/screens/vendor/StoreSettingsScreen.tsx` oluştur:

- Büyük Kill Switch toggle (yeşil=Açık, kırmızı=Kapalı) en üstte yer alır.
- Ürün listesi: Her satırda ürün adı, küçük thumbnail ve "Tükendi" toggle'ı.
- Toggle'a basıldığında `products` tablosundaki `is_out_of_stock` alanı güncellenir.

---

## Step 6 — Güvenlik & RLS Kontrolü

`.agents/rules/backend-rules.md` kurallarını uygula:
- [ ] Vendor sadece kendi `store_id`'sine ait siparişleri çekiyor mu?
- [ ] Tüm Supabase çağrıları `try...catch` ile sarılı mı?
- [ ] RLS politikaları ekran bazlı filtreleme yapıyor mu?

---

## Step 7 — Error Prevention & Debugging Rules

Geliştirme sırasında hataları en aza indirmek için şu kurallara KESİNLİKLE uy:
1. **Asenkron İşlemler:** Tüm Supabase/API çağrıları eksiksiz bir `try...catch` bloğuna alınmalıdır. `catch` bloğunda `Alert.alert` veya Toast ile kullanıcıya mantıklı bir hata mesajı gösterilmelidir (Örn: "Bir hata oluştu, lütfen tekrar deneyin"). Sessiz fail (silent fail) yasaktır.
2. **Tip Güvenliği (TypeScript):** API'den dönen veriler asla `any` olarak bırakılamaz; Supabase DB tipleri veya özel arayüzler (interface) zorunludur.
3. **Empty State & Null Check:** Listeler boş döndüğünde mutlaka yedek UI (Empty Component) gösterilmelidir. Tanımsız (`undefined`) obje özelliklerine erişim durumunda çökmemesi için default değerler (`data = []`, `obj?.prop`) kullanılmalıdır.
4. **Loglama:** Geliştirme sürecinde `console.error` ile detaylı loglama yapılmalı, hatanın kaynağı terminalde net görünmelidir.

---

## Step 8 — Final Output & Summary

Şunları sun:
- Oluşturulan dosyaların listesi
- Navigasyona bağlama talimatı
- Opsiyonel geliştirmeler (açıkça etiketle)

**Step 8 sonrası dur.**
