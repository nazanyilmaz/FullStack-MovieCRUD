const fs = require("fs");
const crypto = require("crypto");
const bodyParse = require("../utils/body-parse");

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      // body
      let body = await bodyParse(req);

      // Validation
      if (
        !body.title ||
        !body.year ||
        !body.genre ||
        !body.rating ||
        !body.description
      ) {
        res.writeHead(404);
        res.end("Please fill in all fields of the movie.");
        return;
      }

      // add a ID to new movie
      body.id = crypto.randomUUID();

      // all movies
      let data = fs.readFileSync("./data/movies.json", "utf-8");
      data = JSON.parse(data);

      // add a new film to movielist
      data.movies.push(body);

      // update JSON files

      fs.writeFileSync("./data/movies.json", JSON.stringify(data));

      // sent a res to Client
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
    } catch (err) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "The path is not found." }));
    }
  }
};
