# Activation: Always On

Bu dosya, bu workspace içindeki tüm kodlama eylemlerinde Agent'ın uyması gereken katı Git (Versiyon Kontrol) kurallarını tanımlar.

### 1. Version Control Adherence
* Proje `https://github.com/FurkanK08/ArdanucSepeti` isimli repoya bağlıdır.
* Anlamlı büyük her görev tamamlandığında (Örn: Bir Screen'in kodlanması, bir Bugfix, Faz geçişi), Agent kodu otomatik olarak Git'e eklemeyi teklif etmeli veya doğrudan commit etmelidir.

### 2. Conventional Commits Discipline
Tüm commitler İngilizce/Türkçe prefix kullanılarak uluslararası standartta yazılacaktır.
* `feat:` Yeni bir özellik (Screen, Component, Hook)
* `fix:` Bir sorunun, TypeScript hatasının veya tasarım uyuşmazlığının çözümü
* `style:` Sadece UI tasarımı ve CSS/StyleSheet ile ilgili güncellemeler
* `refactor:` Mevcut bir kodun optimize edilmesi (kapsam değiştirmeden)
* `docs:` Readme, Workflow veya Task dökümanlarındaki güncellemeler

### 3. Branching Discipline
* Agent hiçbir zaman kullanıcının izni olmadan `main` dalına doğrudan kod itmeye çalışmamalıdır. (Kullanıcı "main'e pushla" emri verirse hariç).
* Agent her zaman o anki görevine uygun bir branch (örn: `feature/vendor-panel`) açılmasını önermelidir.

**Not:** Bu kurallar `.agents/workflows/github-version-control.md` workflow'unun uygulanması için temel güvenlik altyapısıdır.
