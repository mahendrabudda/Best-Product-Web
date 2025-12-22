import axios from "axios";
import * as cheerio from "cheerio";
import { cleanText, extractBrand } from "../utills/textUtills.js";

async function extractProduct(url, site) {
  if (site !== "flipkart") {
    return { error: "Only Flipkart supported for now" };
  }

  const response = await axios.get(url, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Accept-Language": "en-IN,en;q=0.9",
    "Accept":
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Referer": "https://www.google.com/",
    "Connection": "keep-alive",
  },
  timeout: 15000,
});


  const $ = cheerio.load(response.data);
let rawTitle =
  $("span.B_NuCI").first().text().trim() ||
  $("h1 span").first().text().trim() ||
  $("._35KyD6").first().text().trim();

if (!rawTitle) {
  return {
    error: "Unable to extract product title (blocked or selector mismatch)"
  };
}


  const cleanedTitle = cleanText(rawTitle);
  const brand = extractBrand(cleanedTitle);

  return {
    site: "flipkart",
    rawTitle,
    cleanedTitle,
    brand
  };
}

export default extractProduct;
