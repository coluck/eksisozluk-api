/**
 * @api {get} /api/autocomplete/:query autoComplete.
 * @apiName autoComplete
 * @apiGroup search
 * @apiDescription Otomatik tamamlama sağlayan endpoint.
 * @apiVersion 1.0.0
 *
 * @apiParam {String} nick          kullanıcı nick'i
 *
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
{
  "Titles": [
    "pena",
    "pena (video kanalı)",
    "pena'daki aldatan sevgili entry canlandırması",
    "pena olmayınca kullanılanlar",
    "ekşi sözlük logosundaki pena",
    "pena ile bas gitar çalmak",
    "trista pena",
    "20 ağustos 2018 pena butonunun gelmesi"
  ],
  "Query": "pena",
  "Nicks": [
    "pena",
    "pena gibi kaybolsam",
    "pena minik plastik garip nesne"
  ]
}
*/
function autoComplete() {
  let va;
}


/**  Düzelt
 * @api {get} /api/ara/:query aram sonucunu GETir.
 * @apiName GetSearch
 * @apiGroup search
 * @apiDescription site içi arama yapan endpoint.
 * @apiVersion 1.0.0
 *
 * @apiParam {String} query         arama kelimesi
 *
 * @apiSuccess {String} thread_count        başlık sayısı
 * @apiSuccess {Array}  threads             başlık array'i.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
{
  "thread_count": "230 başlık",
  "threads": [
    {
      "id": 6254224,
      "title": "veda ederken 2020'ye bir not bırak",
      "slug": "https://eksisozluk.com/veda-ederken-2020ye-bir-not-birak--6254224?a=popular",
      "entry_count_total": "182"
    },
    {
      "id": 6303813,
      "title": "9 kere leyla",
      "slug": "https://eksisozluk.com/9-kere-leyla--6303813?a=popular",
      "entry_count_total": "535"
    },
    {
      "id": 6754548,
      "title": "5 aralık 2020 çin'in ay'a bayrak dikmesi",
      "slug": "https://eksisozluk.com/5-aralik-2020-cinin-aya-bayrak-dikmesi--6754548?a=popular",
      "entry_count_total": "28"
    },
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 * {"error":"Request failed with status code 404"}
 */
function getSearch() {
  let va;
}

/**
 * @api {get} /api/biri/:nick tekil kullanıcı GETir.
 * @apiName GetUser
 * @apiGroup user
 * @apiDescription nick ile kullanıcı bilgisi getiren endpoint.
 * @apiVersion 1.0.0
 *
 * @apiParam {String} nick          kullanıcı nick'i
 *
 * @apiSuccess {String} nick        kullanıcı nick'i
 * @apiSuccess {String} entry_count_total       kullanıcının toplam entry sayısı.
 * @apiSuccess {String} entry_count_lastmonth   son ay entry sayısı.
 * @apiSuccess {String} entry_count_lastweek     son hafta entry sayısı.
 * @apiSuccess {String} entry_count_today       bugünkü entry sayısı.
 * @apiSuccess {String} last_entry_time         son entry girme zamanı.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 {
  "nick": "ssg",
  "entry_count_total": "50048",
  "entry_count_lastmonth": "67",
  "entry_count_lastweek": "25",
  "entry_count_today": "0",
  "last_entry_time": "evvelsi gün"
}
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 * {"error":"Request failed with status code 404"}
 */
function getUser() {
  let va;
}

/**
 * @api {get} /api/entry/:id tekil entry GETir.
 * @apiName GetEntry
 * @apiGroup entry
 * @apiDescription entry no'su ile entry getiren endpoint.
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id            entry no'su.
 *
 * @apiSuccess {Number} id          entry id'si.
 * @apiSuccess {String} title       entry başlığı.
 * @apiSuccess {String} body        entry içeriği.
 * @apiSuccess {String} author      entry yazarı.
 * @apiSuccess {Number} fav_count   entry favori sayısı.
 * @apiSuccess {String} created_at  entry oluşturulma tarihi.
 * @apiSuccess {String} updated_at  entry editlenme tarihi (varsa).
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "id": 1,
 *  "title": "pena",
 *  "body": "gitar calmak icin kullanilan minik plastik garip nesne.",
 *  "author": "ssg",
 *  "fav_count": "12021",
 *  "created_at": "15.02.1999",
 *  "updated_at": null
 * }
 *
 * @apiError EntryNotFound Entry bulunamadı hatası.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Request failed with status code 404"
 *     }
 */
function getEntry() {
  let va;
}

/**
 * @api {get} /api/debe/  debe GETir.
 * @apiName DEBEGet
 * @apiGroup debe
 * @apiVersion 1.0.0
 * @apiDescription debeleri getiren endpoint. 
 * debe'deki tüm entry'leri tek tek çekerek getirdiği için getirmesi zaman alır ama
 * bir şekilde getirir. o debe buraya gelecek.
 * 
 * @apiSuccess {String} date      debe tarihi.
 * @apiSuccess {[Entry]}  array dünün en beğenilen entry objeleri.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * [
 *   "date": "2020-12-04",
 *  {
 *    "title": "pena",
 *    "body": "gitar calmak icin kullanilan minik plastik garip nesne.",
 *    "author": "ssg",
 *    "fav_count": "12021",
 *    "created_at": "15.02.1999",
 *    "updated_at": null
 *  },
 *  { ... },
 * ...
 * ]
 * 
 */
function debe() {
  let va;
}



/**
 * @api {get} /baslik/:slug tekil başlık GETir.
 * @apiName GetBaslik
 * @apiGroup başlık
 * @apiVersion 1.0.0
 * @apiDescription Spesifik başlığı entry'leri ile birlikte getiren endpoint. Gönül 
 * isterdi ki basliklari id'si sayesinde getirebilelim ama hayat işte, ey ssg duy sesimizi. endpoint
 * sonlarındaki querystringler aynı ekşideki gibi çalışır. örneğin şükela modu için endpointin sonuna 
 * şunu ekleyebilirsiniz: ?a=nice
 * 
 * not: slug yerine basliğin kendisini birebir yazarsaniz da calisir: örneğin:
 * 
 * http://localhost:3000/api/baslik/veda ederken 2020'ye bir not bırak
 * 
 * /baslik/pena--31782
 *
 * @apiParam {String} slug  baslik slug'ı. pena--31782 gibi
 * 
 * @apiSuccess {Number} id başlik id'si.
 * @apiSuccess {String} title başlığın kendisi.
 * @apiSuccess {String} slug başlığın slug'ı.
 * @apiSuccess {Number} total_page başlığın sahip olduğu sayfa sayısı.
 * @apiSuccess {String} current_page bulunulan sayfa numarası.
 * @apiSuccess {Array} tags başlığın kanalları.
 * @apiSuccess {Array} entries başlığın entry'leri.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
{
  "id": "31782",
  "title": "pena",
  "slug": "pena--31782",
  "total_page": 89,
  "current_page": 1,
  "tags": [
    "ekşi-sözlük",
    "müzik"
  ],
  "entries": [
    {
      "id": "1",
      "body": "gitar calmak icin kullanilan minik plastik garip nesne.",
      "author": "ssg",
      "created_at": "15.02.1999",
      "updated_at": null
    },
    {
      "id": "69759",
      "body": "en iyi pena ayak başparmaklarınızdan elde edeceğiniz tırnaklardan... hassas penadır.",
      "author": "otisabi",
      "created_at": "13.12.1999 02:23",
      "updated_at": null
    },
    ...
  ]
}
 */
function detail() {
  let va;
}

/**
 * @api {get} /basliklar/ başlıkları GETir.
 * @apiName GetEntry
 * @apiGroup başlık
 * @apiVersion 1.0.0
 * @apiExample {curl} Example curl:
 *     curl -i http://localhost:3000/api/basliklar
 * @apiExample {python} Example python:
 *     import requests as r
 *     req = r.get("http://localhost:3000/api/basliklar")
 * @apiExample {javascript} Example axios(js):
 *     req = axios.get("http://localhost:3000/api/basliklar").then(...)
 * 
 * @apiDescription gündemdeki başlıkları getiren endpoint. 
 * efendim tabii isterseniz kanallardaki başlıkları da çekebilirsiniz.
 * bunu yapmak fevkalade basit. Istek yapabilmek için gerekli endpointler:
 * 
 * /basliklar/
 * 
 * 
 * /basliklar/kanal/spor
 * 
 * 
 * başlıkları sayfa sayfa görüntülemek için endpoint'in sonuna şunu koyabilirsiniz: ?p=2
 *
 * @apiSuccess {Array} baslik başlık objelerinin arrayi.
 * @apiSuccess {Number} id başlik id'si.
 * @apiSuccess {String} title başlığın kendisi.
 * @apiSuccess {String} slug başlığın eksisozluk.com'daki url adresi.
 * @apiSuccess {Number} entry_count  başlıktaki entry sayısı.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *[
   {
    "id": 6303813,
    "title": "9 kere leyla",
    "slug": "/9-kere-leyla--6303813?a=popular",
    "entry_count": "498"
  },
  {
    "id": 6254224,
    "title": "veda ederken 2020'ye bir not bırak",
    "slug": "/veda-ederken-2020ye-bir-not-birak--6254224?a=popular",
    "entry_count": "109"
  },
 *  ...
 * ]
 * 
 *
 */
function list() {
  let va;
}