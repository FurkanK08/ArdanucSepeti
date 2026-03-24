---
description: Pazar Yeri (Marketplace) Yemek Uygulaması için proje kurulumu, dizin mimarisi ve blank ekranların oluşturulması.
---
Bu workflow, Yemeksepeti / Getir klonu olan Pazar Yeri projemiz için sıfırdan Expo projesi oluşturmayı, gerekli bağımlılıkları yüklemeyi ve (Müşteri, Restoran, Kurye) olarak ayrılmış sayfa yapısını kurmayı sağlar.

// turbo-all
1. React Native (Expo) projesini TypeScript şablonu ile oluşturun.
```powershell
npx create-expo-app@latest . -t expo-template-blank-typescript --yes
```

2. Yönlendirme (React Navigation), Harita ve Veritabanı (Supabase) bağımlılıklarını kurun.
```powershell
npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context react-native-maps @supabase/supabase-js @supabase/async-storage-react-native
```

3. Mimarideki temel klasör dizinlerini `src/` altında oluşturun.
```powershell
mkdir src, src/screens, src/screens/shared, src/screens/customer, src/screens/vendor, src/screens/courier, src/components, src/navigation, src/utils, src/context, src/api, src/constants, src/types
```

4. Ortak ekran taslak dosyalarını oluşturun.
```powershell
New-Item -ItemType File -Force src/screens/shared/UnifiedAuthScreen.tsx
```

5. Müşteri (Customer) rolünün ekran taslak dosyalarını oluşturun.
```powershell
New-Item -ItemType File -Force src/screens/customer/MapAddressScreen.tsx
New-Item -ItemType File -Force src/screens/customer/MarketplaceHomeScreen.tsx
New-Item -ItemType File -Force src/screens/customer/RestaurantMenuScreen.tsx
New-Item -ItemType File -Force src/screens/customer/CheckoutScreen.tsx
New-Item -ItemType File -Force src/screens/customer/OrderTrackingScreen.tsx
New-Item -ItemType File -Force src/screens/customer/ProfileScreen.tsx
```

6. Restoran (Vendor) rolünün ekran taslak dosyalarını oluşturun.
```powershell
New-Item -ItemType File -Force src/screens/vendor/VendorDashboardScreen.tsx
New-Item -ItemType File -Force src/screens/vendor/StoreSettingsScreen.tsx
```

7. Ortak Kurye (Courier) ekran taslak dosyalarını oluşturun.
```powershell
New-Item -ItemType File -Force src/screens/courier/CourierStandbyScreen.tsx
New-Item -ItemType File -Force src/screens/courier/ActiveDeliveryScreen.tsx
```

8. Gerekli ayar ve sabitler dosyalarını oluşturun.
```powershell
New-Item -ItemType File -Force src/types/index.ts
New-Item -ItemType File -Force src/constants/theme.ts
```
