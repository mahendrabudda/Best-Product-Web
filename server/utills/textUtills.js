// utils/textUtils.js 
export function cleanText(text) {
   return text 
   .toLowerCase() .replace(/[^a-z0-9 ]/g, " ") 
   .replace(/\s+/g, " ") .trim();
   }
   
   export function extractBrand(title) {
     return title.split(" ")[0]; // simple v1
      }