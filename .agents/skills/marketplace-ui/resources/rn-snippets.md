# React Native Stil Snippets (Gerçek Tasarımdan)

Bu dosyadaki tüm değerler `docs/ui-designs/` altındaki gerçek Google Stitch çıktılarından alınmıştır.

---

**1. Tam Sayfa Güvenli Konteyner**
```typescript
container: {
  flex: 1,
  backgroundColor: '#f8f9fb',  // background (surface)
  paddingHorizontal: 16,
}
```

**2. Glassmorphism Header / Sticky Bar**
```typescript
stickyBar: {
  position: 'absolute',
  top: 0, left: 0, right: 0,
  backgroundColor: 'rgba(255,255,255,0.85)',
  // React Native'de tam blur için @react-native-community/blur kullanılır
  paddingHorizontal: 24,
  paddingVertical: 16,
  zIndex: 50,
}
```

**3. Restoran Kartı Container**
```typescript
card: {
  backgroundColor: '#ffffff',
  borderRadius: 16,        // rounded-2xl
  overflow: 'hidden',
  marginBottom: 24,
  shadowColor: '#a93100',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 2,
}
```

**4. Kategori Pill (Aktif / Pasif)**
```typescript
pill: {
  paddingHorizontal: 24,
  paddingVertical: 12,
  borderRadius: 12,          // rounded-xl
  backgroundColor: '#ffffff',
  marginRight: 8,
},
pillActive: {
  backgroundColor: '#d34000',  // primaryContainer
},
pillText: { fontSize: 14, fontWeight: '600', color: '#191c1e' },
pillTextActive: { color: '#ffffff', fontWeight: '700' },
```

**5. Ana CTA Butonu (Gradient)**
```typescript
// Not: React Native'de gradient için expo-linear-gradient gerekir
// import { LinearGradient } from 'expo-linear-gradient';
buttonGradientColors: ['#a93100', '#d34000'],
buttonStyle: {
  paddingVertical: 18,
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#a93100',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.25,
  shadowRadius: 24,
  elevation: 6,
}
```

**6. Sabit Alt Bar (Checkout CTA)**
```typescript
bottomBar: {
  position: 'absolute',
  bottom: 0, left: 0, right: 0,
  backgroundColor: 'rgba(255,255,255,0.95)',
  paddingHorizontal: 24,
  paddingBottom: 32,
  paddingTop: 16,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -12 },
  shadowOpacity: 0.04,
  shadowRadius: 32,
  elevation: 8,
}
```

**7. Yıldız & Puan Badge**
```typescript
starBadge: {
  backgroundColor: '#fff7ed',   // orange-50
  borderRadius: 8,
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 10,
  paddingVertical: 4,
  gap: 4,
},
starText: {
  fontSize: 14,
  fontWeight: '900',
  color: '#a93100',
}
```
