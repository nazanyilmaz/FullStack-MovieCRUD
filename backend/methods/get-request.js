const fs = require("fs");

//  /api/movies istek atildiysa all movie, base url /api/movie ise ve id bulunuysa id si girilen film gelir

module.exports = (req, res) => {
  // url'in temel adresini değişkene aktar (sondaki param dışarısnında kalan)
  //url in belli bir kismini alma
  const baseUrl = req.url.slice(0, 11);
  // console.log(baseUrl);
  //url'i parcalara ayir ve id parametresini al
  const id = req.url.split("/")[3];
  //url'in sonundaki parametreyi alma
  const param = req.url.split("=").pop().toLowerCase().trim();
  console.log(param);

  if (baseUrl === "/api/movies" && id) {
    // id si belli filmi gonderir
    //all movies
    let data = fs.readFileSync("./data/movies.json", "utf-8");
    //json formatindaki veriyi js formatina cevir
    data = JSON.parse(data);
    //id belli movie
    const movie = data.movies.find((item) => item.id == id);

    if (movie) {
      //film bulunduysa filmi gonder
      //cevap ayarlarini belirle
      res.writeHead(200, { "Content-Type": "application/json" });
      //cevabi al
      return res.end(JSON.stringify(movie));
    }
    // film bulunmadiysa
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Check ID of movie" }));
  }
  if (baseUrl === "/api/movies") {
    //1)durum kodunu belirle
    res.status = 200;
    //2)headerlari belirle
    res.setHeader("Content-Type", "application/json");
    //3)json dosyasindan film verileni al
    const movies = fs.readFileSync("./data/movies.json", "utf-8");
    //console.log(movies);
    //4 client'a cevao gonder

    res.end(movies);
  }

  //url dogru degilde hata gonder. 6-8 satirlari tek satirdi yazdik.
  // res.writeHead(404, { "Content-Type": "allpication/json" });
  // res.end(
  //   JSON.stringify({
  //     title: "Not Found",
  //     message: "Page Not Found",
  //   })
  // );
};
