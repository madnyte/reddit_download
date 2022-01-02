const express = require("express");
const util = require("../helpers/util");
const fetch = require("node-fetch");

const linkRouter = express.Router();

linkRouter.post("/", async (req, res) => {
  data = req.body.url;

  if (util.isValidUrl(data)) {
    const newUrl = util.getJsonUrl(data);
    const resp = await fetch(newUrl);
    const json = await resp.json();

    res.send(
      `<img src="${json[0].data.children[0].data.thumbnail}" width="250" height="250"/>`
    );
  }
});

module.exports = linkRouter;
