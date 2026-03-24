---
name: Supabase Role-Based Routing
description: Uygulamaya tek bir ekrandan giren farklı rolleri doğru klasöre/navigator'a yönlendirme yeteneği.
---

# Multi-Tenant Role Routing Skill

Pazar yeri (Marketplace) mimarimizin kritik özelliği: **Müşteriler, Restoranlar ve Kuryeler** uygulamaya aynı kapıdan (UnifiedAuthScreen) girer. Başarılı OTP doğrulamasının ardından kullanıcının Supabase'deki rol tespiti yapılarak doğru React Navigation yığınına (Stack) atılması gerekir.

1. **Auth Session Beklenir**: Supabase'den geçerli authentication oturumu (`session.user.id`) alınır.
2. **Profile Rolü Getirilir**: 
   Kullanıcının veritabanındaki `profiles` tablosuna veya `app_metadata` tarafına kaydedilen role (`enum: 'customer', 'vendor', 'courier'`) sorgusu atılır:
   ```typescript
   const { data, error } = await supabase
       .from('profiles')
       .select('role')
       .eq('id', user.id)
       .single();
   ```
3. **Dispatch Navigation (Yönlendirme Kararı)**:
   Elde edilen role verisi baz alınarak ekranda yönlendirme kararı oluşturulur:
   - Eğer `role === 'vendor'`, yapay zeka `VendorNavigator` stack'ini (örn: `VendorDashboardScreen`) çağırmalıdır.
   - Eğer `role === 'courier'`, yapay zeka `CourierNavigator` stack'ini (örn: `CourierStandbyScreen`) çağırmalıdır.
   - Eğer `role === 'customer'` veya sonuç boş (undefined) dönüyorsa, kullanıcı her default senaryoda olduğu gibi `CustomerNavigator` stack'ine (örn: `MarketplaceHomeScreen` veya Adres yoksa `MapAddressScreen`) atılmalıdır.

**Not:** Bu router mekanizması için sistemde her zaman tek bir global `AuthContext` veya `RootNavigator.tsx` kontrolcü olarak hazırlanmalıdır.
