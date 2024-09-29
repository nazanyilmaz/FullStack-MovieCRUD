const http = require("http");
const getRequest = require("./methods/get-request");
const postRequest = require("./methods/post-request");
const deleteRequest = require("./methods/delete-request");

//1)create http server
const server = http.createServer((req, res) => {
  //console.log(req.method);
  // for all request header
  // Allow requests from any origin. tum cevaplar icin ortak header
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Allow the specified methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );

  // Allow specific headers (modify as needed)
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Allow credentials (if applicable)
  res.setHeader("Access-Control-Allow-Credentials", "true");
  //kod kalabaligi olmasin diye isteklere gonderilecek cevap fonksiyonlarini ayri dosyalarda tanimladik
  switch (req.method) {
    case "OPTIONS":
      res.setHeader("Content-Type", "application/json");
      res.end();
      break;
    case "GET":
      getRequest(req, res);
      break;
    case "POST":
      if (req.headers["content-type"] !== "application/json") {
        res.statusCode = 415; // Unsupported Media Type
        res.end(JSON.stringify({ message: "Unsupported Media Type" }));
        return;
      }
      postRequest(req, res);
      break;
    case "DELETE":
      deleteRequest(req, res);
      break;

    default:
      //updated res.status.code
      res.statusCode = 404;
      //cevaba gonderilecek icerigin tipiniheader olarak ekledik. postman gonderdigimiz cevabin tipini anlamasi icin.
      //add a new header to res
      res.setHeader("Content-Type", "application/json");

      // descriptin to of res
      res.write(
        JSON.stringify({
          message: "Not Found Page",
        })
      );

      // send a res to client
      res.end();
      break;
  }
});

//2)listenning to port
const port = 5001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
