define({
  "name": "eksisozluk-api",
  "version": "1.0.0",
  "description": "Unofficial eksisozluk.com API",
  "title": "eksisozluk-api | doc",
  "header": {
    "title": "genel",
    "content": "<table>\n<thead>\n<tr>\n<th>controller</th>\n<th>method</th>\n<th style=\"text-align:center\">endpoint</th>\n<th>örnek url (tıkla)</th>\n<th>açıklama</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>thread.list</td>\n<td>get</td>\n<td style=\"text-align:center\"><code>api/basliklar</code></td>\n<td><a href=\"../api/basliklar\">/api/basliklar</a></td>\n<td>başlıkları getirir</td>\n</tr>\n<tr>\n<td>thread.detail</td>\n<td>get</td>\n<td style=\"text-align:center\"><code>api/baslik/:slug</code></td>\n<td><a href=\"../api/baslik/pena\">/api/baslik/pena</a></td>\n<td>bir başlığı getirir</td>\n</tr>\n<tr>\n<td>debe.getDebe</td>\n<td>get</td>\n<td style=\"text-align:center\"><code>api/debe</code></td>\n<td><a href=\"../api/debe\">/api/debe</a></td>\n<td>debe'yi getirir</td>\n</tr>\n<tr>\n<td>entry.getEntry</td>\n<td>get</td>\n<td style=\"text-align:center\"><code>api/entry/:id</code></td>\n<td><a href=\"../api/entry/1\">/api/entry/1</a></td>\n<td>bir entry'i getirir</td>\n</tr>\n<tr>\n<td>user.getUser</td>\n<td>get</td>\n<td style=\"text-align:center\"><code>api/biri/:nick</code></td>\n<td><a href=\"../api/biri/ssg\">/api/biri/ssg</a></td>\n<td>bir suser'ı getirir</td>\n</tr>\n<tr>\n<td>search.getSearch</td>\n<td>get</td>\n<td style=\"text-align:center\"><code>api/ara/:query</code></td>\n<td><a href=\"../api/ara/pena\">/api/ara/pena</a></td>\n<td>arama sonucu</td>\n</tr>\n<tr>\n<td>search.autoComplete</td>\n<td>get</td>\n<td style=\"text-align:center\"><code>api/autocomplete/:query</code></td>\n<td><a href=\"../api/autocomplete/pena\">/api/autocomplete/pena</a></td>\n<td>otomatik tamamlama</td>\n</tr>\n</tbody>\n</table>\n<h3><a href=\"https://github.com/coluck/eksisozluk-api\">github repo</a></h3>\n<h2>Dokümantasyon</h2>\n<p>ekşisözlük için geliştirilmiş resmi olmayan api. 5 controller içerisinde 7 tane endpoint barındıran bu api'yi\nkolaylıkla kendi bilgisayarınızda çalışır hale getirebilirsiniz. Bunun için terminalde sırasıyla şu komutları çalıştırın.</p>\n<pre class=\"prettyprint lang-bash\">git clone https://github.com/coluck/eksisozluk-api.git\ncd eksisozluk-api\nnpm i\nnpm run serve\n</pre>\n<p>api dokümantasyon'u için apidoc kullanıldı.</p>\n"
  },
  "sampleUrl": false,
  "defaultVersion": "0.0.0",
  "apidoc": "0.3.0",
  "generator": {
    "name": "apidoc",
    "time": "2020-12-04T23:01:19.441Z",
    "url": "https://apidocjs.com",
    "version": "0.25.0"
  }
});
