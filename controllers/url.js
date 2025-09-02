// controllers/url.js
import { Url } from "../model/Url.js";
import shortid from "shortid";

// Handle creating a short URL
export const shorturl = async (req, res) => {
  try {
    const longUrl = req.body.longUrl;

    if (!longUrl) {
      return res.render("index.ejs", { shortUrl: null, error: "Please enter a valid URL" });
    }

    // Check if URL already exists in DB
    let existingUrl = await Url.findOne({ longUrl });
    if (existingUrl) {
      return res.render("index.ejs", {
        shortUrl: `${req.protocol}://${req.headers.host}/${existingUrl.shortCode}`,
        error: null,
      });
    }

    // Create a new short code
    const shortCode = shortid.generate();

    const newUrl = new Url({
      longUrl,
      shortCode,
    });

    await newUrl.save();
    
    console.log("✅ Saved:", newUrl);
 
    // Render back the shortened URL
    
   res.render("index.ejs",{shortUrl});
  } catch (err) {
    console.error("❌ Error in shorturl:", err);
    res.status(500).send("Server Error");
  }
};

// Handle redirect to original URL
export const getOriginalUrl = async (req, res) => {
  try {
    const shortCode = req.params.shortCode;

    const url = await Url.findOne({ shortCode });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).send("❌ No URL Found for this code");
    }
  } catch (err) {
    console.error("❌ Error in getOriginalUrl:", err);
    res.status(500).send("Server Error");
  }
};
