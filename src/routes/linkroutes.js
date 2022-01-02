const express = require("express");
const util = require("../helpers/util");
const fetch = require("node-fetch");

const linkRouter = express.Router();

linkRouter.post("/", async (req, res) => {
  data = req.body.url;
  let json;

  if (util.isValidUrl(data)) {
    const newUrl = util.getJsonUrl(data);
    const resp = await fetch(newUrl);
    json = await resp.json();
  } else {
    res.status(400);
  }

  res.send({
    ...util.getVideoInfo(json),
    ...util.getDifferentVideoQualities(json),
    sound: util.getVideoSound(json),
  });
});

module.exports = linkRouter;
