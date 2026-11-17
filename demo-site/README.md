# Wolp Demo Site

Mevcut ana uygulamadan bağımsız çalışan, mobil öncelikli React ve TypeScript örnek sitesidir. Tüm kaynaklar `demo-site/` altında tutulur.

## Gereksinimler

- Node.js 22.22.2 veya daha yeni uyumlu sürüm
- npm

## Kurulum

```bash
cd demo-site
npm install
```

İlk kurulum `demo-site/package-lock.json` dosyasını üretir. Kilit dosyası oluşturulduktan sonra tekrarlanabilir kurulumlar için `npm ci` kullanılabilir.

## Geliştirme

```bash
npm run dev
```

## Test

```bash
npm test
```

Testler; semantik sayfa bölgelerini, navigasyonu, mobil menü durumunu, Escape tuşu davranışını, içerik bölümlerini ve çağrı bağlantılarını doğrular.

## Üretim derlemesi

```bash
npm run build
```

Bu komut önce TypeScript denetimini, ardından Vite üretim derlemesini çalıştırır. Yerel derlemeyi incelemek için:

```bash
npm run preview
```

## Git çalışma akışı

Değişiklikleri ana daldan ayırmak için görev dalı üzerinde çalıştırın:

```bash
git switch -c feat/mobile-demo-site
git add demo-site
git commit -m "feat: add responsive demo site"
```

## Yayınlama durumu

Bu proje için dağıtım, hosting veya CI/CD yapılandırması eklenmemiştir. Site henüz yayına alınmamalıdır; yalnızca yerel geliştirme, test, build ve preview doğrulaması amaçlanmıştır.
