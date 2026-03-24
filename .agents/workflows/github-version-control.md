---
description: GitHub Version Control Workflow — Git Branch ve Commit stratejisi kurgusu
---

# GitHub Version Control Workflow

Bu workflow, `https://github.com/FurkanK08/ArdanucSepeti` reposunda profesyonel proje yönetimi standartlarını (Branching, Commit, PR) garanti altına alır. Agent, kod üzerinde belirli bir özelliği (Faz veya Screen) bitirdiğinde bu workflow'u takip ederek kodları yedekler.

## 1. Branch Naming Conventions (Dal İsimlendirme Kuralları)
- Ana geliştirme dalı her zaman `main` veya `master` olmalıdır.
- Yeni özellikler (UI Ekranları, Akışlar vb.) için: `feature/<özellik-adi>` (Örn: `feature/vendor-dashboard`)
- Hata çözümleri için: `bugfix/<hata-adi>` veya `hotfix/<hata-adi>`
- Küçük UI/UX revizyonları için: `style/<iş-adi>`
- Kod iyileştirmesi (refactor) için: `refactor/<bilesen>`

## 2. Commit Message Standards (Commit Mesajı Kuralları)
Commit mesajları her zaman **Conventional Commits** standartlarına uymak ZORUNDADIR. Agent asla "düzenlendi", "eklendi" gibi düz mesajlar gönderemez.

- `feat: [kapsam] - eklendi/yapıldı` (Örn: `feat: VendorDashboardScreen arayüzü kodlandı`)
- `fix: [kapsam] - sorun düzeltildi` (Örn: `fix: checkout ekranı çift header hatası çözüldü`)
- `style: [kapsam] - tasarım/boşluk vb. ayarlandı`
- `refactor: [kapsam] - kod mimarisi iyileştirildi`
- `docs: [kapsam] - döküman güncellendi`

## 3. Push and Versioning Flow
Agent bir görevi (Screen veya Faz) başarıyla derleyip (tsc) test ettikten sonra:
1. `git status` ile nelerin değiştiğini kontrol eder.
2. `git add .` ile sadece ilgili değişiklikleri stateler.
3. Kurala uygun `git commit -m "..."` işlemini yapar.
4. İlgili branch üzerinde `git push origin <branch-name>` komutunu çalıştırır.

## 4. GitHub Repo Reference
**Repository URL:** https://github.com/FurkanK08/ArdanucSepeti

**Hatırlatma Agent'a:** İşleri parçalara böl (Atomicity). Büyük bir modül bitmeden commit atmak yerine anlamlı bir bütün olunca (örneğin UI bileşeni tamamlanınca) commit at.
