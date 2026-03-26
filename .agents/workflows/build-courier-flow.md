---
description: Courier (Kurye) Flow Workflow — Kurye uygulaması ekranlarını oluşturmak için adım adım kılavuz
---

# Courier Flow Construction Workflow

Bu workflow, Pazar Yeri platformundaki **Ortak Kurye (Courier)** tarafının ekranlarını oluşturur.

---

## Step 1 — Context & Scope Confirmation

Ekran talebini netleştir:
- Hangi kurye ekranı? (`CourierStandbyScreen` veya `ActiveDeliveryScreen`)
- Kurye havuzundaki otomatik atama mekanizması için hangi Supabase tetikleyicisi (trigger) veya edge function kullanılacak?

Rol sınırı: Bu ekranlar yalnızca `src/screens/courier/` altına yazılır.  
Eksik bilgi varsa **DUR ve sor.**

---

## Step 2 — Activate Skills & Rules

Sırayla oku:
1. `.agents/skills/SKILL_role-routing.md` → Kurye rol yönlendirmesi
2. `.agents/rules/backend-rules.md` → Supabase güvenlik kuralları
3. `.agents/skills/marketplace-ui/resources/tokens.json` → Tasarım sistemi
4. `docs/ui-designs/kurye_bekleme_evrimd/code.html` → Standby ekranı referansı
5. `docs/ui-designs/courier_navigation/code.html` → Aktif teslimat referansı
6. `docs/ui-designs/kurye_g_rev_atamas/code.html` → Kurye görev atama referansı

**KESİN KURAL (UI TASARIMI):** Her bir ekran mutlak suretle `docs/ui-designs/` içerisindeki HTML/Tailwind tasarımlarına sadık kalarak kodlanmalıdır. Klasörde ilgili tasarım dosyası bulunmuyorsa, işlem yapılmamalı ve kullanıcıdan HTML prototipi talep edilmelidir. Hayalden veya varsayılan bileşenlerle uydurma ekran yapılamaz. Mevcut Courier tasarımları: `kurye_bekleme_evrimd`, `courier_navigation`, `kurye_g_rev_atamas`, `kurye_acil_durum_bildirimi`, `kurye_kazan_c_zdan`, `kurye_profil_ayarlar`, `vardiya_ve_b_lge_se_imi`.

---

## Step 3 — Courier Screen Planning

Kurye ekranları için standart yapı:

**Standby Ekranı:**
- Merkezi büyük Aktif/Pasif toggle
- "Görev Bekleniyor..." animasyonlu metin
- Sistem atama yaptığında tam ekran modal popup

**Active Delivery Ekranı:**
- En üstte devasa Müşteri Telefon Numarası (Tıkla-Ara butonu)
- Müşteri adı, detaylı adres metni
- "TAHSIL EDECEKSIN: X TL" büyük uyarı banner'ı
- Alt butonlar: "Restorandan Aldım" → "Teslim Ettim"

**Kullanıcı onayını bekle.**

---

## Step 4 — Standby Screen Generation

`src/screens/courier/CourierStandbyScreen.tsx` oluştur:

- Ekran açıldığında Supabase `couriers` tablosundaki `is_active` alanı güncellenir.
- Supabase real-time subscription ile yeni sipariş ataması dinlenir.
- Sipariş atandığında `expo-notifications` ile Push bildirim çalınır.
- Atama gelince tam ekran modal (AnimatedModal) açılır: "YENİ GÖREV!" + "KABUL ET" butonu.

---

## Step 5 — Active Delivery Screen Generation

`src/screens/courier/ActiveDeliveryScreen.tsx` oluştur:

- Ekranın en tepesine müşteri telefon numarası `fontSize: 32, fontWeight: '900'` ile yazılır.
- `Linking.openURL('tel:+90...')` ile Tıkla-Ara entegre edilir.
- Müşteri adres metni ve ödeme türü (Nakit/POS) büyük fontlarla gösterilir.
- "Restorandan Aldım" → statü `on_the_way` yapılır, müşteriye push bildirim gider.
- "Teslim Ettim" → nakit para teyiti modal'ı açılır, onaylanınca `delivered` statüsüne geçer.

---

## Step 6 — Güvenlik & RLS Kontrolü

- [ ] Kurye sadece kendine atanmış siparişi görebiliyor mu?
- [ ] `is_active` toggle'ı sadece kurye kendi profilini güncelleyebilecek şekilde kısıtlı mı?
- [ ] Teslim teyidi çift onay (nakit modal) ile gerçekleşiyor mu?

---

## Step 7 — Error Prevention & Debugging Rules

Geliştirme sırasında hataları en aza indirmek için şu kurallara KESİNLİKLE uy:
1. **Asenkron İşlemler:** Tüm Supabase/API çağrıları eksiksiz bir `try...catch` bloğuna alınmalıdır. `catch` bloğunda `Alert.alert` veya Toast ile kullanıcıya mantıklı bir hata mesajı gösterilmelidir (Örn: "Ağ hatası oluştu, lütfen tekrar deneyin"). Sessiz hata yutmak (silent fail) yasaktır.
2. **Tip Güvenliği (TypeScript):** API'den dönen veriler asla `any` olarak bırakılamaz; Supabase DB tipleri veya özel arayüzler (interface) zorunludur.
3. **Empty State & Null Check:** Listeler boş döndüğünde mutlaka yedek UI (Empty Component) gösterilmelidir. Tanımsız objelere erişimde çökmemesi için opsiyonel zincirleme (`obj?.prop`) kullanılmalıdır.
4. **Loglama:** Beklenmeyen hatalar için `console.error` ile detaylı loglama yapılmalı, kuryenin sahada kalıp donmasına engel olunmalıdır.

---

## Step 8 — Final Output & Summary

Şunları sun:
- Oluşturulan dosyaların listesi
- Navigasyona bağlama talimatı
- Opsiyonel: Google Maps entegrasyonu için sonraki adımlar

**Step 8 sonrası dur.**
