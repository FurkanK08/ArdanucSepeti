---
description: Customer App Screen Construction Workflow — Müşteri uygulamasındaki bir ekranı sıfırdan oluşturmak için adım adım kılavuz
---

# Customer Screen Construction Workflow

Bu workflow, Pazar Yeri uygulamasının **Müşteri (Customer)** tarafındaki herhangi bir yeni ekranın oluşturulmasını yönlendirir. Ekranın tasarıma sadık, kurallarla uyumlu ve rol sınırlarına saygılı çıkmasını sağlar.

---

## Step 1 — Context & Scope Confirmation

Ekran talebini netleştir:
- Hangi ekran oluşturulacak? (`MarketplaceHomeScreen`, `CheckoutScreen` vb.)
- Tasarım referansı `docs/ui-designs/` altında var mı?

Eksik bilgi varsa, **DURUR** ve netleştirme sorusu sorar.  
Rolü doğrula: Bu ekran sadece `src/screens/customer/` altına yazılır.

---

## Step 2 — Activate Relevant Skills & Rules

Şu dosyaları sırayla oku ve içselleştir:
1. `.agents/rules/frontend-rules.md` → Bileşen ve stil kuralları
2. `.agents/rules/architecture-rules.md` → Klasörleme ve katman kuralları
3. `.agents/skills/marketplace-ui/SKILL.md` → UI yönergesi
4. `.agents/skills/marketplace-ui/resources/tokens.json` → Gerçek renk ve ölçüler
5. `docs/ui-designs/<ekran_adı>/code.html` → Gerçek tasarım referansı

---

## Step 3 — Screen Structure Planning

Ekranın içereceği bileşen listesini yaz:
- Sayfa container ve SafeArea yapısı
- Sticky/Fixed Header veya TopBar
- Ana içerik listesi veya görünümü
- Sabit Bottom Bar (CTA veya NavBar)
- Gerekli Modal/BottomSheet bileşeni

**Kullanıcı onayını bekle. Onay gelmeden kod yazma.**

---

## Step 4 — Screen Component Generation

`src/screens/customer/<EkranAdi>.tsx` dosyasını oluştur.

- **KESİN KURAL (UI TASARIMI):** Tüm arayüz kodlamaları `docs/ui-designs/` klasöründeki html prototipleri referans alınarak SIFIRDAN kodlanmalıdır. Tasarım referansı yoksa işlem durdurulmalı ve hayalden ekran YAZILMAMALIDIR. Renk/boyut gibi yapıları HTML dosyasından referans alarak `theme.ts` ile eşleyin.
- Supabase sorgusu bu dosyaya **yazılamaz**. Hook çağrısı yapılır.
- `StyleSheet.create` ve `tokens.json`'daki gerçek renkler kullanılır.
- Bileşen 150 satırı geçerse modüler alt parçalara (`src/components/`) bölünür.
- Tüm dokunulabilir alanlar `TouchableOpacity` veya `Pressable` ile sarılır.

---

## Step 5 — Data Hook Generation (Gerekiyorsa)

Eğer ekran veri çekiyorsa:
- `src/hooks/use<EkranAdi>.ts` dosyası oluşturulur.
- Supabase sorgusu buraya yazılır, `try...catch` ile sarılır.
- Hook sadece bu ekranın ihtiyacı olan veriyi döner.

---

## Step 6 — UI Checklist Doğrulaması

`.agents/skills/marketplace-ui/resources/design-checklist.md` kontrol listesini uygula:
- [ ] Renkler `tokens.json` ile eşleşiyor mu?
- [ ] Ana butonlar `primary (#a93100)` renginde mi?
- [ ] Tüm köşeler `borderRadius: 16` mi?
- [ ] Kenarlarda en az 16px `paddingHorizontal` var mı?

Sorun varsa düzelt ve neyi değiştirdiğini açıkla.

---

## Step 7 — Final Output & Summary

Şunları sun:
- Oluşturulan dosyaların listesi
- Ekranı navigasyona nasıl bağlayacağına dair kısa talimat
- Opsiyonel sonraki adımlar (açıkça "Opsiyonel" etiketiyle)

**Step 7 sonrası dur. Kapsam genişletme. Ekstra özellik ekleme.**
