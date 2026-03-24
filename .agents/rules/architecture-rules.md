---
trigger: always_on
description: React Native Project Architecture & Best Practices Rules
---

# Activation: Always On

Uygulamanın genel mimarisi, yönlendirilmesi ve dosya yönetimine (Temiz Kod & Ölçeklenebilirlik) dair uyulması gereken temel yapısal kurallardır.

### 1. Katmanlı Mimari (Separation of Concerns)
* UI Katmanı (`src/screens`, `src/components`) SADECE görsel bileşenleri render eder. UI dosyasının 100-150 satırı aşması durumunda sistem tasarımsal olarak daha küçük parçalara (`Card`, `Header`, `Modal` komponentlerine) bölünmek zorundadır.
* İş mantığı (Business Logic, Hesaplamalar, Sipariş Akışı Algoritmaları), Custom Hook'lar (`src/hooks`) veya `src/utils` içinde yazılmak zorundadır. Screen dosyaları "aptal (dump)" bırakılmalı, sadece render görevini üstlenmelidir.
* State Management için harici (Zustand/Redux) kullanılmaz. Yalnızca React Context API (`src/context...`) kullanılır.

### 2. Navigasyon ve Klasörleme (Routing)
* Uygulamanın dev bir "Pazar Yeri Yığını (Spaghetti Routing)" olmasına izin verilmez.
* Müşteri (`CustomerNavigator`), Restoran (`VendorNavigator`) ve Kurye (`CourierNavigator`) navigsyon akışları birbirinden tamamen bağımsız dosyalarda ayrıştırılmalıdır.
* Bunlar `RootNavigator` klasöründe role-based yetkiyle yönetilir.

### 3. Konfigürasyon Sabitleri (Constants & Env)
Agent (Yapay Zeka):
* API anahtarları, Supabase URL ve Anon Key'leri gibi hiçbir güvenli veriyi ve konfigürasyonu kodların, dosyaların arasına (hardcoded) yerleştiremez.
* Proje boyunca kullanılacak Global sabitler (URL'ler, timeout süreleri) `src/constants/index.ts` veya projeye bağlı bir `.env` kök dosyasından okunmalıdır.

**Bu dosyadaki mimari hiyerarşinin bozulması projenin iptaline sebep olacak büyük bir ihlaldir.**
