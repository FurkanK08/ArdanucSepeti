# Restoran (Vendor) ve Kurye (Courier) İçin Eksik & Gerekli Ekranlar
Bu belge, Yemeksepeti, Getir, Trendyol Yemek gibi pazar yeri uygulamalarının standartlarında, mevcut Vendor ve Kurye panellerinizde eksik olan **kritik** arayüzleri analiz eder ve tasarımlarının üretilmesi için Google Stitch prompt'larını listeler.

---

## 🏬 1. RESTORAN (Vendor) İçin Eksik Kritik Ekranlar

Şu anki durumda restoranın siparişlerini yönettiği (Dashboard) ve ürün bitirme/aktif etme ayarlarını (StoreSettings) içeren sayfaları bulunuyor. Ancak operasyonel bir restoran panelinde şunlar da kesinlikle olmalıdır:

### 1.1. Geçmiş Siparişler ve Finansal Analiz (Order History & Payouts)
Restoranların günlük/haftalık ciro hedeflerini, güncel hak edişlerini (platform kesintisi sonrası net kazanç) ve geçmiş teslim edilen/iptal edilen siparişleri görebilecekleri sayfa.
* **Neden Gerekli:** Muhasebe mutabakatı ve günlük performans analizi.
* **Google Stitch Prompt:** 
> "Design a clean, dashboard-style mobile screen for a restaurant owner to view their 'Order History and Revenue'. Include a top summary card showing 'Today's Revenue', 'Total Orders', and 'Canceled Orders' with minimal charts or sparklines. Below, show a scrollable list of past orders with order ID, date, status (Delivered, Canceled), and total amount. Use light background with a primary orange color (#FF4F00), 16px border radius, and clear, structured typography."

### 1.2. Detaylı Menü Düzenleyici (Menu Editor)
Mevcut ayarlar kısmında sadece "Tükendi" butonu var. Ancak yeni ürün ekleme, fiyat güncelleme, açıklama değiştirme ve ürün fotoğrafı yükleme ekranı olmazsa olmazdır.
* **Neden Gerekli:** Restoranın menüsünü güncel tutabilmesi, opsiyon ve ekstra malzemeleri ekleyebilmesi.
* **Google Stitch Prompt:** 
> "Create a 'Menu Editor' mobile screen for a restaurant app. The screen should have a form to add a new menu item. Include a square image upload placeholder at the top, followed by floating label text inputs for 'Product Name', 'Description', 'Price (TL)', and a dropdown for 'Category' (e.g., Main Course, Beverage). Add a large, sticky primary CTA button at the bottom labeled 'Save Product' colored in #FF4F00. Design should be extremely clean, modern, with lots of whitespace."

### 1.3. Restoran Çalışma Saatleri ve Profil (Store Profile & Hours)
Restoranın açılış-kapanış saatlerini (Pzt-Paz), adres bilgilerini, minimum paket tutarını ve tahmini teslimat süresini yöneteceği sayfa.
* **Neden Gerekli:** Müşterilerin kapalı veya uzak restoranlardan sipariş vermesini engellemek için.
* **Google Stitch Prompt:** 
> "Design a 'Store Profile and Working Hours' settings screen for a restaurant app. Include sections for editing the restaurant's name, phone number, and minimum order amount. Below that, create a beautifully structured list for days of the week (Monday to Sunday) with time-picker rows (e.g., 10:00 - 22:00) and an active/inactive toggle switch for each day. Use a premium, minimal aesthetic following a light theme."

---

## 🛵 2. KURYE (Courier) İçin Eksik Kritik Ekranlar

Kuryenin şu an bekleme (Standby) ve görev teslim (Active Delivery) ekranı bulunuyor. Ancak gerçek saha koşullarında aşağıdaki özelliklere ihtiyaç vardır:

### 2.1. Kazanç Cüzdanı ve Geçmiş Teslimatlar (Earnings Wallet & Trip History)
Kuryenin o güne ait yaptığı teslimatlardan ne kadar para kazandığını (paket başı ücret, kilometre bazlı bonuslar) takip ettiği, hafta sonu hak edişini görüntülediği cüzdan sayfası.
* **Neden Gerekli:** Freelance/esnaf kurye modelinde kuryenin gelir motivasyonunu sağlamak.
* **Google Stitch Prompt:** 
> "Design a 'Courier Earnings Wallet' mobile screen. At the top, a large prominent card showing the 'Current Balance (TL)' with a 'Withdraw' button. Below, show a weekly bar chart of earnings. Below the chart, include a list of 'Recent Trips' displaying the date, pickup/drop-off locations (brief text), distance in km, and the payment earned for that specific trip. Make the UI energetic but professional, using dark grey text and orange (#FF4F00) accents."

### 2.2. Kurye Profil ve Araç Bilgileri (Courier Profile & Vehicle)
Kuryenin kendi fotoğrafı, kullandığı araç türü (Motor, Bisiklet, Araç), plakası ve telefon numarasını güncellediği profil ayarları.
* **Neden Gerekli:** Güvenlik ve müşterinin kuryeyi plakasından tanıyabilmesi.
* **Google Stitch Prompt:** 
> "Create a 'Courier Profile Settings' mobile screen. Include a circular avatar placeholder with an edit icon at the top. Below, place input fields for 'Full Name', 'Phone Number', and 'Vehicle Plate Number'. Add a segmented control or set of cards to select the 'Vehicle Type' (Motorcycle, Bicycle, Car) with simple icons. Include a 'Log Out' button at the bottom. Use a clean card-based layout with 16px corner radii."

### 2.3. Vardiya & Bölge Seçimi (Shift & Zone Scheduling)
Kuryelerin çalışmak istedikleri saat aralıklarını (örn: 12:00 - 18:00) ve atama bekledikleri bölgeleri (örn: Kadıköy, Beşiktaş) seçtikleri ekran.
* **Neden Gerekli:** Operasyonel yük dağılımı. Platformun kuryeleri yönlendirebilmesi.
* **Google Stitch Prompt:** 
> "Design a 'Shift and Zone Scheduling' mobile screen for a courier app. Show a horizontal calendar view at the top to select a date. Below, list available time slots (e.g., 12:00-14:00, High Demand) with a quick 'Book Slot' button for each. Additionally, include a dropdown or map-based selector for 'Preferred Working Zone'. Highlight high-demand slots with subtle red or orange badges to encourage booking. Keep it highly usable for on-the-go interaction."

### 2.4. Aktif Teslimat İçi Acil Durum & İptal (Emergency & Cancellation flow)
Sipariş sırasında kuryenin kaza yapması, müşteriyi bulamaması veya adresin yanlış olması durumunda süreci merkeze/müşteri hizmetlerine aktaracağı "Bildir/İptal Et" alt akışı.
* **Neden Gerekli:** Kuryelerin ve ürünün güvenliği, siparişin sonsuza dek havada asılı kalmasını önlemek.
* **Google Stitch Prompt:** 
> "Design an 'Emergency Report / Issue' bottom sheet modal for a courier app during an active delivery. Include large, easily tappable list items for common issues: 'Customer Unreachable', 'Vehicle Breakdown', 'Accident / Emergency', 'Address is Incorrect'. Add a prominent 'Call Live Support' button. Ensure the layout communicates urgency but remains accessible and legible for out-door usage."

---

Bu dokümandaki promtları kopyalayarak Google Stitch üzerinde yeni tasarımları oluşturabilirsiniz. Ardından yine `docs/ui-designs/` altına kaydederseniz, Agent olarak bu ekranları projenize entegre edebilirim.
