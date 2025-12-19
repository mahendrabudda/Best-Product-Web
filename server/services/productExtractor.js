import axios from "axios";
import * as cheerio from "cheerio";

import { cleanText , extractBrand } from "../utills/textUtills.js";
async function extractProduct(url, site) {
  if (site !== "amazon") {
    return { error: "Only Amazon supported for now" };
  }

  const response = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  const $ = cheerio.load(response.data);

  const rawTitle = $("#productTitle").text().trim();
  const cleanedTitle = cleanText(rawTitle);
  const brand = extractBrand(cleanedTitle);

  return {
    site: "amazon",
    rawTitle,
    brand,
    cleanedTitle
  };
}

export default extractProduct