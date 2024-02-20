require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ exteded: true }));
app.use(bodyParser.json());

const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + //validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + //validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip(v4)
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + //validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + //validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); //validate fragment locator
  return !!urlPattern.test(urlString);
};
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", function (req, res) {
  const originalUrl = req.body.url;
  if (isValidUrl(originalUrl)) {
    res.status(200).json({
      valid: true,
      link: originalUrl,
    });
  } else {
    res.status(400).json({
      error: "invalid url",
    });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
