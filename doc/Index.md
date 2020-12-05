| controller          | method |         endpoint          | örnek url \(tıkla\)            | açıklama            |
| ------------------- | ------ | :-----------------------: | ------------------------------ | ------------------- |
| thread.list         | get    |      `api/basliklar`      | [\/api\/basliklar][1]          | başlıkları getirir  |
| thread.detail       | get    |    `api/baslik/:slug`     | [\/api\/baslik\/pena][2]       | bir başlığı getirir |
| debe.getDebe        | get    |        `api/debe`         | [\/api\/debe][3]               | debe'yi getirir     |
| entry.getEntry      | get    |      `api/entry/:id`      | [\/api\/entry\/1][4]           | bir entry'i getirir |
| user.getUser        | get    |     `api/biri/:nick`      | [\/api\/biri\/ssg][5]          | bir suser'ı getirir |
| search.getSearch    | get    |     `api/ara/:query`      | [\/api\/ara\/pena][6]          | arama sonucu        |
| search.autoComplete | get    | `api/autocomplete/:query` | [\/api\/autocomplete\/pena][7] | otomatik tamamlama  |

### [github repo][99]

## Dokümantasyon

ekşisözlük için geliştirilmiş resmi olmayan api. 5 controller içerisinde 7 tane endpoint barındıran bu api'yi
kolaylıkla kendi bilgisayarınızda çalışır hale getirebilirsiniz. Bunun için terminalde sırasıyla şu komutları çalıştırın.

```bash
git clone https://github.com/coluck/eksisozluk-api.git
cd eksisozluk-api
npm i
npm run serve
```

[1]: ../api/basliklar
[2]: ../api/baslik/pena
[3]: ../api/debe
[4]: ../api/entry/1
[5]: ../api/biri/ssg
[6]: ../api/ara/pena
[7]: ../api/autocomplete/pena
[99]: https://github.com/coluck/eksisozluk-api

api dokümantasyon'u için apidoc kullanıldı.
