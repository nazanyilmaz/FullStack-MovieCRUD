const fs = require("fs");

module.exports = (req, res) => {
  //url in belli bir kismini alma
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/"));
  // console.log(baseUrl);
  //url'i parcalara ayir ve id parametresini al
  const id = req.url.split("/")[3];

  if (baseUrl === "/api/movies" && id) {
    //all movies
    let data = fs.readFileSync("./data/movies.json", "utf-8");
    data = JSON.parse(data);

    //Find Movie if you known ID
    const foundItem = data.movies.find((item) => item.id == id);
    if (!foundItem) {
      res.writeHead(404);
      return res.end("ID is invalid");
    }
    //remove movie with known ID
    const filtred = data.movies.filter((item) => item.id != id);
    data.movies = filtred;
    //Update JSON folder
    fs.writeFileSync("./data/movies.json", JSON.stringify(data));
    //Sent response to client
    res.writeHead(204, { "Content-Type": "application/json" });
    res.end();
  } else {
    res.writeHead(404);
    res.end("The path is not found.");
  }
};
