// Shared property data — used by the button filters, the AI finder, AND the
// interactive map. x/y are percentage coordinates (0-100) on the stylized
// city map in MapExplorer; keeping them here means map pins and cards agree.
export const properties = [
  { id: 1, title: "Modern Downtown Loft", city: "Downtown", type: "Apartment", price: 385000, beds: 2, baths: 2, area: 1250, x: 52, y: 46, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Suburban Family Home", city: "Westfield", type: "House", price: 620000, beds: 4, baths: 3, area: 2400, x: 22, y: 30, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Cozy Garden Cottage", city: "Riverside", type: "House", price: 295000, beds: 2, baths: 1, area: 980, x: 74, y: 68, img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Luxury Penthouse Suite", city: "Downtown", type: "Apartment", price: 1250000, beds: 3, baths: 3, area: 2100, x: 58, y: 54, img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: "Lakeside Villa", city: "Lakeview", type: "Villa", price: 890000, beds: 5, baths: 4, area: 3600, x: 34, y: 74, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" },
  { id: 6, title: "Compact City Studio", city: "Downtown", type: "Studio", price: 189000, beds: 1, baths: 1, area: 520, x: 48, y: 40, img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80" },
  { id: 7, title: "Craftsman Bungalow", city: "Westfield", type: "House", price: 445000, beds: 3, baths: 2, area: 1700, x: 18, y: 42, img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80" },
  { id: 8, title: "Hillside Modern Villa", city: "Lakeview", type: "Villa", price: 1480000, beds: 4, baths: 5, area: 4200, x: 30, y: 84, img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80" },
  { id: 9, title: "Riverside Townhouse", city: "Riverside", type: "House", price: 530000, beds: 3, baths: 3, area: 1950, x: 82, y: 56, img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80" },
];

// Helper to format money as $XXX,XXX
export const money = (n) => "$" + n.toLocaleString();

// Compact money for map pins: $385k / $1.25M
export const moneyShort = (n) =>
  n >= 1_000_000 ? "$" + (n / 1_000_000).toFixed(2).replace(/\.?0+$/, "") + "M"
                 : "$" + Math.round(n / 1000) + "k";
