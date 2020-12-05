# eksisozluk-api

### Unofficial eksisozluk.com API - Resmi olmayan ekşi sözlük API'si.

---

Ekşi sözlük için geliştirilmiş node.js tabanlı server API. Ekşisözlükten çekilen veriler json formatında kullanıcıya geri döndürülür. 5 controller içerisinde 7 tane endpoint barındıran bu API'yi kolaylıkla kendi bilgisayarınızda çalışır hale getirebilirsiniz.
[doc](https://eksisozluk-api.herokuapp.com/doc)

[client](https://eksisozluk-api.herokuapp.com/)

## İçindekiler

- [Kurulum](#kurulum)
- [Demo](#demo)
- [API Endpointleri](#api-endpointleri)
- [API Dokümanı](#api-dokümanı)
- [Örnek Uygulama](#örnek-uygulama)
- [Ayarlar](#ayarlar)
- [Notlar](#notlar)

---

## Kurulum

Terminalde sırasıyla şu komutları çalıştırın:

```bash
$ git clone https://github.com/coluck/eksisozluk-api.git
$ cd eksisozluk-api
$ npm i
$ npm run serve
```

---

## Demo

API'nin demo'suna buradan ulaşabilirsiniz:
eksisozluk-api: documantation [demo](https://eksisozluk-api.herokuapp.com/doc)
eksisozluk-api: client [demo](https://eksisozluk-api.herokuapp.com/)

Heroku'nun ücretsiz paketi ile deploy edilmiştir. Çok fazla yüklenmeyin :)

---

## Api Endpointleri

| method | endpoint                  | açıklama                        |
| ------ | ------------------------- | ------------------------------- |
| get    | `api/basliklar`           | gündemdeki başlıkları getirir   |
| get    | `api/baslik/:slug`        | spesifik bir başlığı getirir    |
| get    | `api/debe`                | debe'yi getirir (yavaş çalışır) |
| get    | `api/entry/:id`           | spesifik bir entry'i getirir    |
| get    | `api/biri/:nick`          | bir suser'ı getirir             |
| get    | `api/ara/:query`          | arama sonucunu getirir          |
| get    | `api/autocomplete/:query` | otomatik tamamlama özelliği     |

API tamamen GET metot'larından oluşmaktadır. eksisozluk.com'dan çektiği veri'leri uygun bir json formatında geri döner.

---

## Api Dokümanı

API'yi çalıştırdıktan sonra `/doc` adresinden API'nin dokümantasyonuna ulaşabilirsiniz. Buradaki doküman apidoc modülü ile oluşturuldu.
![Screenshot_2020-12-05 eksisozluk-api doc](https://user-images.githubusercontent.com/39749730/101259259-d3709880-3738-11eb-8477-670027156960.png)

Dokümantasyonu tekrar derlemek için şu komutu çalıştırın:
`npm install --save-dev` (apidoc modülünü indirmek için)
`npm run docg`

---

## Ayarlar

Ayarları config.js dosyası ile düzenleyebilirsiniz. useMongo ve cacheAPI değişkenleri sadece debe controller'ı için kullanılır.(bkz: [notlar](#notlar))

```javascript
require("dotenv").config();
const config = {
  apiEnpoint: "/api",
  serveDoc: true,
  serveClientEx: true,
  docEndpoint: "/doc",
  clientEndpoint: "/",
  useMongo: process.env.USE_MONGO || false,
  cacheAPI: process.env.CACHE_API || false,
  limitAPI: process.env.LIMIT_API || false,
};
```

".env.example" dosyasının '.example' uzantısını silerek saklanması gereken verileri bu dosyada tutabilirsiniz.

```env
USE_MONGO=true
CACHE_API=true
DB_URL=mongodb://127.0.0.1:27017/db_name
```

---

## Örnek Uygulama

Bu repo'nun içinde bu API'yi tüketen/kullanan bir frontend web uygulaması mevcut. Bu uygulama vue.js ile kodlandı. "/public/dist" dizininde derlenmiş hali var. Vue.js uygulamasının kaynak koduna buradan ulaşabilirsiniz: [eksisozluk-api-client](https://github.com/coluck/eksisozluk-api-client)

Uygulamanın Ekran Görüntüsü:
![eksisozluk-api-client](https://user-images.githubusercontent.com/39749730/101259066-a5d71f80-3737-11eb-87ad-a2ebae7cdbca.png)

---

## Notlar

Debe'yi getiren fonksiyon tüm entrileri tek tek çektiği için yavaş çalışmaktadır. Bu sorunu çözebilmek için 2 yöntem kullanıldı.

1. Debe'yi mongodb'ye kaydetmek ve çekmek. (env dosyasında mongodb'nin url adresi düzenlenmeli ve "useMongo=true" ataması yapılmalı. Böylelikle günlük debe, veritabanına kayıt edilir.)

2. Debe objesini cache'lemek. (node-cache modülü kullanıldı.)

Bu yöntemler ile debe.getDebe fonksiyonu ilk çağrıdan sonraki çağrılarda performans artışı sağlar.

## Destek

Aşağıdakiler memnuniyetle karşılanır.

- Hata bildirimi
- Pull request
- Sunucu sağlama
- İş teklifi 😅
