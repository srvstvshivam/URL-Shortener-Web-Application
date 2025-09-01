import { Url } from "../model/Url.js";
import shortid from "shortid";

export const shorturl = async (req, res) => {
  const longUrl = req.body.longUrl;

  // check if already exists
  let existingUrl = await Url.findOne({ longUrl });
  if (existingUrl) {
    return res.render("index.ejs", {
      shortUrl: `${req.headers.host}/${existingUrl.shortCode}`,
    });
  }

  // create new one
  const shortCode = shortid.generate();
  const newUrl = new Url({ longUrl, shortCode });
  await newUrl.save();

  console.log("✅ Saved:", newUrl);
  res.render("index.ejs", { shortUrl: `${req.headers.host}/${shortCode}` });
};

export const getOriginalUrl = async (req, res) => {
  const shortCode = req.params.shortCode;

  const url = await Url.findOne({ shortCode });
  if (url) {
    return res.redirect(url.longUrl);
  } else {
    return res.status(404).json("No URL Found");
  }
};
