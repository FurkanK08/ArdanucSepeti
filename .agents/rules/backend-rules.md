---
trigger: always_on
description: Backend (Supabase) ve API etkileşimlerinde uyulması gereken kurallar (Rules)
---

# Activation: Always On

Bu dosya, bu workspace içindeki tüm backend, veri tabanı ve Supabase entegrasyon çalışmalarında Agent’ın (Yapay Zekanın) kesinlikle uyması gereken katı veri işleme kurallarını tanımlar.

### 1. Supabase ve Veritabanı Etkileşimi
* Tüm Supabase sorguları (queries, insert, fetch vb.) SADECE `src/api` klasöründe tutulan fonksiyonlar veya oluşturulacak özel hook'lar (`src/hooks`) aracılığıyla çalıştırılmalıdır.
* Ekran bileşenlerinin (UI Components) içine doğrudan Supabase fetch/insert/update yazmak KESİNLİKLE YASAKTIR. (Separation of Concerns).
* Veritabanı iletişimi için projede her zaman tekil, yapılandırılmış bir `supabase-client.ts` dosyası import edilmelidir.
* Supabase dönüşleri için Database Tipleri (TypeScript Types) kesinlikle kullanılmalıdır. Geri dönüş (Return type) `any` olarak bırakılamaz; verinin güvenliği garanti edilmelidir.

### 2. Güvenlik ve RLS (Row Level Security)
* Veri okuma/yazma işlemleri yapılırken Rol tabanlı (Customer, Vendor, Courier) RLS kurallarının varolduğu akıldan çıkarılmamalıdır.
* Hiçbir `query` direkt olarak tüm tabloyu filtresiz çekecek şekilde yazılamaz. (Örn: Restoran sadece kendi ürünlerini çekebilir `eq('store_id', myStoreId)`).
* Gizli hiçbir tabloya bypass edilerek erişilmeye çalışılmamalıdır.

### 3. Hata Yönetimi (Error Handling) DİSİPLİNİ
Eğer:
* Supabase'den veya API'den veri dönerken hata (error) oluşursa:
Agent:
* Bu hatayı ASLA sessiz (silent) geçiştiremez. Gerekli tüm asenkron işlemlerde `try...catch` bloğu kullanmak zorundadır.
* Hatalar geliştirme aşaması için `console.error` ile basılmalı, UX bütünlüğü için Müşteriye/Kuryeye ekranda mantıklı ve temiz bir uyarı pop-up'ı / toast mesajı (`Alert.alert` veya `Toast`) ile bildirilmelidir.

**Bu kuralların ihlali, uygulamanın arkasına güvensiz devasa açıklar (backdoor) bırakmak anlamına gelir.**
