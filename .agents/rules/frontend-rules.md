---
trigger: always_on
description: Frontend Workspace Rules (Pazar Yeri React Native Projesi İçin)
---

# Activation: Always On

Bu dosya, bu workspace içindeki tüm frontend (React Native / Expo) çalışmalarında Agent’ın (Yapay Zekanın) uyması gereken proje özel kuralları tanımlar.

### 1. Kullanılacak Teknoloji Stack’i
* SADECE **React Native (Expo)** ve **TypeScript** kullanılacaktır.
* Yönlendirme için `@react-navigation/native` zorunludur.
* Harici UI library (NativeBase, UI Kitten vb.) KULLANILMAZ.
* Uygulamanın tasarımları için sadece proje dökümanlarında belirlenen **Yalın Stil (Light Mode, 16px Radius, FF4F00)** kullanılacaktır.

### 2. Bileşen (Component) Kuralları
* SADECE function component (React.FC) kullanılacaktır.
* Class component YASAKTIR.
* Her bileşen:
  * Tek sorumluluk ilkesine (SRP) uymalıdır.
  * Yeniden kullanılabilir olacak şekilde `src/components` altına yazılmalıdır.
  * Açık ve anlamlı isimlendirme (örn: `OrderCard`, `ActionStack`) içermelidir.

### 3. Dosya ve Klasör Disiplini
* Her bileşen ayrı dosyada tanımlanmalıdır.
* Büyük sayfa bileşenleri (`...Screen.tsx`) modüler alt parçalara bölünmelidir.
* Ana yönlendirici dosyalarında (`App.tsx` veya `Navigator.tsx`) karmaşık görsel logic bulunamaz.
* Dosya isimleri:
  * `PascalCase.tsx` (Component ve Ekranlar için)
  * `camelCase.ts` (Hook ve Utility'ler için)
  * `kebab-case.md` (Dokümantasyon için)

### 4. Stil Kullanım Standartları
* Aşırı karmaşık ve uzun StyleSheet objeleri YASAKTIR.
* Tekrarlanan stiller için:
  * `src/constants/theme.ts` üzerindeki yardımcı renkler ve ölçüler çağrılmalıdır.
  * Ortak UI bileşenleri tercih edilmelidir.
* Görsel Sınırlar:
  * Tasarımdaki Gölge (Shadow) ve Blur UI’da mobilde kasmayacak kadar çok ölçülü kullanılmalıdır.
  * Performansı düşürecek gereksiz View içi View sarmalamalarından kaçınılmalıdır.

### 5. Responsive & UX Kuralları
* Mobile-first yaklaşım zorunludur.
* Tüm bileşenler, telefon donanımlarının 'Safe Area' sınırlarına riayet ederek çalışmalıdır.
* Tıklanabilir tüm ögelerde (TouchableOpacity / Pressable) hover, active veya pressOpacity state’leri eksiksiz olmalıdır.

### 6. Scope Disiplini
Agent:
* Bu dosyada tanımlı olmayan ek teknoloji (Örn: Redux/Zustand) öneremez (Sadece Context API kullanılır).
* Kapsam dışı refactor yapamaz.
* “İstersen bunu da yapabilirim” önerisinde bulunamaz.
* SADECE istenen görevi yerine getirir.

### 7. Belirsizlik Durumu
Eğer:
* İstek eksikse (örn: Prop typeları bildirilmemişse)
* Çelişkili bir durum (Kuryeye ait bir şey Müşteride istenmişse) varsa
Agent:
* DURUR.
* NETLEŞTİRME SORAR.
* Cevap gelene kadar ilerlemez.

**Bu kuralların ihlali, proje standartlarının ihlali sayılır.**
