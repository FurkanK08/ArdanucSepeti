---
description: Pazar Yeri uygulaması geliştirilirken yapay zekanın (veya developer'ın) uyması gereken temel tasarım kuralları (Rules)
---

# Marketplace UI & Code Guidelines

Bu kural seti, uygulamadaki tüm ekranlar (Müşteri, Vendor, Kurye) tasarlanırken ve React Native ortamında kodlanırken mutlaka uygulanmalıdır.

1. **Light Mode Only (Sadece Aydınlık Mod)**: Uygulama kodlanırken karanlık mod renkleri kapatılmalı, zemin olarak her zaman temiz beyaz (`#FFFFFF`) ve hafif koyu beyaz (`#F8F9FA`) tercih edilmelidir.
2. **Primary Brand Action (Ana Marka Rengi)**: Yemek iştahı açması adına birincil tüm CTA butonlarında (Siparişi Tamamla, Görevi Üstlen vs.) ve aktif tab ikonlarında tatlı, parlak Turuncu (`#FF4F00`) kullanılmalıdır.
3. **Corner Radii (Yumuşatılmış Köşeler)**: Uygulamayı modern ve "Enterprise" kıvamında göstermek için neredeyse tüm UI elementlerinin (Card, TextInput, TouchableOpacity vb.) köşelerine her zaman `borderRadius: 16` verilmelidir. Keskin hatlardan (0px) kesinlikle kaçınılmalıdır.
4. **Spacing Component (Boşluklar)**: Cihaz kenarlarından ana View containerlarına daima minimum `paddingHorizontal: 16` verilerek içeriklerin çok sıkışık durması engellenmelidir. Ekranlarda beyaz alan (whitespace) kullanımı bol tutulmalıdır. Minimum okunabilir font büyüklüğü 14px olmalıdır.
5. **Role Context (Rol Bilinci)**: Kodlama yaparken her bir ekranın HANGİ TİP EKRAN (Customer, Vendor veya Courier) olduğu dosya ismi üzerinden anlaşıldığından, fonksiyonel naming convention'lar (`useVendorOrders`, `useCourierLocation`) rol bazlı temiz kullanılmalıdır.
