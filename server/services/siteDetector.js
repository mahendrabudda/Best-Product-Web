// services/siteDetector.js 
export default function detectSite(url) {
   if (url.includes("amazon")) return "amazon";
   if (url.includes("flipkart")) return "flipkart";
   if (url.includes("myntra")) return "myntra";
   return "unknown";
   }