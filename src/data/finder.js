import { properties } from "./properties";

// finder.js — turns a plain-English request into filters, then matches homes.
// Example inputs it understands:
//   "2 bedroom under 400k downtown"
//   "a villa in lakeview with 4 beds"
//   "cheap studio"  /  "luxury house"
// It's rule-based (free, no API) but genuinely parses the request.

// Pull a max price out of the text: "under 400k", "below $500,000", "max 1m"
function parsePrice(text) {
  // match things like 400k, 1.2m, 500000, $450,000
  const m = text.match(/(\d[\d,.]*)\s*(k|m|million|thousand)?/gi);
  if (!m) return null;
  // find the token near "under/below/max/less"
  const priceContext = /(under|below|less than|max|up to|cheaper than)\s*\$?(\d[\d,.]*)\s*(k|m|million|thousand)?/i.exec(text);
  const target = priceContext ? priceContext[2] : null;
  const unit = priceContext ? (priceContext[3] || "").toLowerCase() : "";
  if (!target) return null;
  let val = parseFloat(target.replace(/,/g, ""));
  if (unit.startsWith("k") || unit === "thousand") val *= 1000;
  if (unit.startsWith("m") || unit === "million") val *= 1000000;
  return val;
}

// Pull bedroom count: "2 bed", "3 bedroom", "4 beds"
function parseBeds(text) {
  const m = /(\d+)\s*(bed|bedroom|br)\b/i.exec(text);
  return m ? parseInt(m[1], 10) : null;
}

// Match a city or property type by keyword.
function parseCity(text) {
  const cities = ["downtown", "westfield", "riverside", "lakeview"];
  return cities.find((c) => text.toLowerCase().includes(c)) || null;
}
function parseType(text) {
  const types = ["apartment", "house", "villa", "studio"];
  return types.find((t) => text.toLowerCase().includes(t)) || null;
}

// Main: returns { matches, summary } for a user's message.
export function findHomes(text) {
  const lower = text.toLowerCase();
  const maxPrice = parsePrice(lower);
  const beds = parseBeds(lower);
  const city = parseCity(lower);
  const type = parseType(lower);
  const wantsLuxury = /(luxury|premium|high end|expensive)/.test(lower);
  const wantsCheap = /(cheap|affordable|budget|low cost)/.test(lower);

  let matches = properties.filter((p) => {
    if (maxPrice && p.price > maxPrice) return false;
    if (beds && p.beds < beds) return false;
    if (city && p.city.toLowerCase() !== city) return false;
    if (type && p.type.toLowerCase() !== type) return false;
    return true;
  });

  // Soft preferences: sort by price direction if asked.
  if (wantsCheap) matches = [...matches].sort((a, b) => a.price - b.price);
  if (wantsLuxury) matches = [...matches].sort((a, b) => b.price - a.price);

  // Build a human summary of what we understood.
  const parts = [];
  if (beds) parts.push(`${beds}+ bedrooms`);
  if (type) parts.push(type);
  if (city) parts.push(`in ${city[0].toUpperCase() + city.slice(1)}`);
  if (maxPrice) parts.push(`under $${maxPrice.toLocaleString()}`);
  const understood = parts.length ? parts.join(", ") : "your criteria";

  let summary;
  if (matches.length === 0) {
    summary = `I couldn't find a match for ${understood}. Try widening your budget or area — or ask me something like "3 bed house under 600k".`;
  } else {
    summary = `Found ${matches.length} ${matches.length === 1 ? "home" : "homes"} matching ${understood}:`;
  }

  return { matches, summary };
}
