//istegin body kismini olusturuyoruz.bunun icin istegin body kismindaki veriye erisebilmek icin parca parca gelen byte'leri birlestirip fonsiyonun cagrildigi yere return eden bir fonksiyon hazirliyoruz. expresste red.body ile bu isi halledebiliriz ama bu projede bu sekilde yapmak durumundayiz.
module.exports = async (request) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      //alinan her parcayi body ekle
      request.on("data", (chunk) => {
        body += chunk;
      });
      //tum parcalarin bitmesini izle
      request.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (err) {
      reject(err);
    }
  });
};
