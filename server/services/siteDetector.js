// services/siteDetector.js

export default function detectSite(url) {
  if (url.includes("amazon")) return "amazon";
  if (url.includes("flipkart.com")) {
  url = url.replace("www.flipkart.com", "m.flipkart.com");
}

  if (url.includes("myntra")) return "myntra";
  return "unknown";
}

