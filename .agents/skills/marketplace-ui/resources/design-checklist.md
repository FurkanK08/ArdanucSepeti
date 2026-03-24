# Design Validation Checklist

UI Agent kodlama yaparken komponenti dosyaya yazmadan önce içsel olarak aşağıdaki soruları kendine sormalıdır:

- [ ] Arkaplan renkleri `tokens.json` tablosundaki `background` veya `surface` ile eşleşiyor mu?
- [ ] Bütün ana aksiyonlar (Buy, Accept, Confirm) `primary` renginde (Turuncu) mi?
- [ ] Card, Button, Input gibi sarmalayıcı öğelerin köşeleri keskin mi yoksa 16px mi?
- [ ] Ekranın sağ ve sol kenarında içeriğin nefes alması için en az 16px padding kaldı mı?
- [ ] Bileşen çok mu karmaşık? Modüler parçalara ayrılamaz mı?
