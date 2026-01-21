import { siteConfig } from './site.config'

export interface Product {
  asin: string
  title: string
  brand: string
  features: string[]
  amazonUrl: string
  imageUrl: string
  rating?: number
  category: string
  shortTitle?: string
  summary?: string
  slug?: string // Added slug for review article URLs
}

// Fallback data - kept in sync by the Directus -> GitHub workflow
export const productsDataFallback: Product[] = [
  {
    asin: "B0D7QHY574",
    title: "Coleman Sundome Camping Tent with Rainfly, 2/3/4/6 Person",
    shortTitle: "Coleman Sundome Tent",
    brand: "Coleman",
    features: [
      "Included rainfly offers extra weather protection",
      "Strong frame withstands 35+ mph winds",
      "Easy setup in 10 minutes",
      "Large windows and a ground vent for superior ventilation",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0D7QHY574?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/41Bn7ikFVsL._SL500_.jpg",
    rating: 4.5,
    category: "Camp Essentials",
    summary: "Quick-setup weatherproof tent perfect for camping trips",
    slug: "coleman-sundome-tent",
  },
  {
    asin: "B0CS4N63HZ",
    title: "MSR Universal Tent Footprint, 2 Person",
    shortTitle: "MSR Tent Footprint",
    brand: "MSR",
    features: [
      "Universal tent footprint for 2-person MSR tents",
      "Provides increased protection from water and wear",
      "Lightweight, durable construction",
      "Fits multiple MSR tent models",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0CS4N63HZ?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/41dy5pcz1pL._SL500_.jpg",
    rating: 4.6,
    category: "Camp Essentials",
    summary: "Protective footprint for extended tent lifespan",
    slug: "msr-tent-footprint",
  },
  {
    asin: "B09KNZLDK8",
    title: "ENO DoubleNest Hammock - Lightweight, Portable, 1 to 2 Person",
    shortTitle: "ENO DoubleNest Hammock",
    brand: "ENO",
    features: [
      "Lightweight hammock weighs 19 Oz",
      "9.5' length with 400 lb capacity",
      "Simple setup compatible with all ENO straps",
      "Durable with triple-stitched seam",
    ],
    amazonUrl: "https://www.amazon.com/dp/B09KNZLDK8?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/41eHQ3nYFqL._SL500_.jpg",
    rating: 4.6,
    category: "Camp Essentials",
    summary: "Portable double hammock for camping adventures",
    slug: "eno-doublenest-hammock",
  },
  {
    asin: "B0D643DKJW",
    title: "Coleman Brazos 20/30°F Adult Cool-Weather Sleeping Bag",
    shortTitle: "Coleman Brazos Sleeping Bag",
    brand: "Coleman",
    features: [
      "Stay warm in temperatures as low as 20°F",
      "Thermolock draft tube keeps body heat from escaping",
      "Machine washable for easy cleaning",
      "Fiberlock construction prevents insulation shifting",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0D643DKJW?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/31ZzAYEc8rL._SL500_.jpg",
    rating: 4.3,
    category: "Camp Essentials",
    summary: "Durable sleeping bag rated for cold weather camping",
    slug: "coleman-brazos-sleeping-bag",
  },
  {
    asin: "B0CQRVLKHB",
    title: "Therm-a-Rest MondoKing 3D Self-Inflating Camping Sleeping Pad, Large",
    shortTitle: "Therm-a-Rest MondoKing Pad",
    brand: "Therm-a-Rest",
    features: [
      "Ultra-comfy 4.25-inch thick sleeping pad",
      "7.0 R-value insulates in extreme conditions",
      "3D construction creates vertical sidewalls",
      "TwinLock valve system for easy setup",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0CQRVLKHB?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/41LyIoKUBgL._SL500_.jpg",
    rating: 4.7,
    category: "Camp Essentials",
    summary: "Premium self-inflating pad with exceptional comfort",
    slug: "therm-a-rest-mondoking-pad",
  },
  {
    asin: "B07P8MT9JV",
    title: "Helinox Lite Cot Ultra-Light, Portable Camping Cot",
    shortTitle: "Helinox Lite Cot",
    brand: "Helinox",
    features: [
      "Ultralight at only 2.80 pounds",
      "Holds up to 265 pounds",
      "Easy setup with internal bungee cord",
      "Packs down to 5 x 21 inches",
    ],
    amazonUrl: "https://www.amazon.com/dp/B07P8MT9JV?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/21V+H26VY+L._SL500_.jpg",
    rating: 4.6,
    category: "Camp Essentials",
    summary: "Ultralight camping cot for backpackers",
    slug: "helinox-lite-cot",
  },
  {
    asin: "B083BLGRD9",
    title: "NEMO Fillo Elite Ultralight Pillow - Inflatable Backpacking Pillow",
    shortTitle: "NEMO Fillo Elite Pillow",
    brand: "NEMO",
    features: [
      "Ultralight inflatable camping pillow",
      "Comfortable fabric top layer",
      "Compact and packable design",
      "Perfect for backpacking and travel",
    ],
    amazonUrl: "https://www.amazon.com/dp/B083BLGRD9?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/41P2QqcqycL._SL500_.jpg",
    rating: 4.5,
    category: "Camp Essentials",
    summary: "Ultralight inflatable pillow for camping comfort",
    slug: "nemo-fillo-elite-pillow",
  },
  {
    asin: "B0D8JRXNPN",
    title: "Rumpl Original Puffy Blanket - Warm, Water-Resistant Camping Blanket",
    shortTitle: "Rumpl Puffy Blanket",
    brand: "Rumpl",
    features: [
      "100% recycled synthetic insulation",
      "Water-resistant ripstop shell",
      "Cape Clip for hands-free warmth",
      "Measures 52 x 75 inches, weighs 2.2 lbs",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0D8JRXNPN?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/41FGfVCx7nL._SL500_.jpg",
    rating: 4.6,
    category: "Camp Essentials",
    summary: "Technical outdoor blanket with recycled materials",
    slug: "rumpl-puffy-blanket",
  },
  {
    asin: "B0DXQB1JB5",
    title: "Jetboil Flash 1.0L Portable Fast Boil Stove for Camping",
    shortTitle: "Jetboil Flash Stove",
    brand: "Jetboil",
    features: [
      "One-Step Auto Ignition",
      "Boils 16 ounces of water in 2 minutes",
      "Compact & lightweight design",
      "Insulated cozy keeps water hot longer",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0DXQB1JB5?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/41cPXsR97oL._SL500_.jpg",
    rating: 4.7,
    category: "Cooking & Dining",
    summary: "Lightning-fast personal camping stove system",
    slug: "jetboil-flash-stove",
  },
  {
    asin: "B0006VORDY",
    title: "Camp Chef Explorer Two Burner Stove, Two 30,000 BTU's",
    shortTitle: "Camp Chef Explorer Stove",
    brand: "Camp Chef",
    features: [
      "Two 30,000 BTU cast-aluminum burners",
      "448 square inches of cooking space",
      "Fits 14 inch system accessories",
      "3-sided windscreen included",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0006VORDY?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/51zXRtB3cAL._SL500_.jpg",
    rating: 4.6,
    category: "Cooking & Dining",
    summary: "Professional-grade dual burner camp stove",
    slug: "camp-chef-explorer-stove",
  },
  {
    asin: "B00339912S",
    title: "Coleman Pack-Away Portable Camp Kitchen with Food Prep Area",
    shortTitle: "Coleman Camp Kitchen",
    brand: "Coleman",
    features: [
      "31.5 x 21.3-inch food prep area",
      "27.8 x 20.5-inch side table",
      "Handy utensil hooks and mesh shelf",
      "Folding design for easy carrying",
    ],
    amazonUrl: "https://www.amazon.com/dp/B00339912S?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/41p7OJlgBNL._SL500_.jpg",
    rating: 4.4,
    category: "Cooking & Dining",
    summary: "Portable camp kitchen with prep and storage space",
    slug: "coleman-camp-kitchen",
  },
  {
    asin: "B0CZ4N6JYS",
    title: "Stanley Wildfare Go 4-Piece Stainless Steel Cook Set",
    shortTitle: "Stanley Cook Set",
    brand: "Stanley",
    features: [
      "32 oz pot with lid and fold & lock handle",
      "2 stacking insulated cups",
      "18/8 stainless steel construction",
      "Compact nesting design",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0CZ4N6JYS?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/31xmZqEZJjL._SL500_.jpg",
    rating: 4.5,
    category: "Cooking & Dining",
    summary: "Durable camping cookware set with insulated cups",
    slug: "stanley-cook-set",
  },
  {
    asin: "B0DNNQRD8G",
    title: "Ignik Refillable Gas Growler Deluxe 3.8-Pound Propane Tank",
    shortTitle: "Ignik Gas Growler",
    brand: "Ignik",
    features: [
      "3.8-pound refillable propane tank",
      "More economical than single-use bottles",
      "Includes 4-foot adapter hose",
      "DOT-approved with 12-year certification",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0DNNQRD8G?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/41Y7vqdDKmL._SL500_.jpg",
    rating: 4.5,
    category: "Cooking & Dining",
    summary: "Eco-friendly refillable propane solution",
    slug: "ignik-gas-growler",
  },
  {
    asin: "B0842BPV35",
    title: "YETI Hopper Flip 12 Portable Cooler, Navy",
    shortTitle: "YETI Hopper Flip 12",
    brand: "YETI",
    features: [
      "ColdCell Insulation for superior cold-holding",
      "Capacity of up to 12 cans plus ice",
      "100% leakproof HydroLok Zipper",
      "Waterproof DryHide Shell",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0842BPV35?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/41euJ+SPdyL._SL500_.jpg",
    rating: 4.8,
    category: "Cooking & Dining",
    summary: "Premium leakproof soft cooler for adventures",
    slug: "yeti-hopper-flip-12",
  },
  {
    asin: "B001COUOYK",
    title: "YETI Tundra 45 Cooler Desert Tan",
    shortTitle: "YETI Tundra 45",
    brand: "YETI",
    features: [
      "Capacity of up to 26 cans",
      "Up to 3 inches of PermaFrost Insulation",
      "Rotomolded construction virtually indestructible",
      "Certified Bear-Resistant",
    ],
    amazonUrl: "https://www.amazon.com/dp/B001COUOYK?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/31P+figWGAL._SL500_.jpg",
    rating: 4.8,
    category: "Cooking & Dining",
    summary: "Bear-resistant hard cooler for extended trips",
    slug: "yeti-tundra-45",
  },
  {
    asin: "B075X5R67T",
    title: "Katadyn BeFree 1.0L Water Filter, Fast Flow",
    shortTitle: "Katadyn BeFree Filter",
    brand: "Katadyn",
    features: [
      "0.1 micron hollow fiber microfilter",
      "Ultralight at just 2.3 oz",
      "Fast output at 2 liters per minute",
      "Easy to clean - no backflushing required",
    ],
    amazonUrl: "https://www.amazon.com/dp/B075X5R67T?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/41g8kDAqJPL._SL500_.jpg",
    rating: 4.5,
    category: "Cooking & Dining",
    summary: "Fast-flow ultralight water filtration system",
    slug: "katadyn-befree-filter",
  },
  {
    asin: "B082TMBYR6",
    title: "Jackery Portable Power Station Explorer 300, 293Wh Battery",
    shortTitle: "Jackery Explorer 300",
    brand: "Jackery",
    features: [
      "293Wh lithium-ion battery pack",
      "2 Pure Sine Wave AC outlets deliver 300W",
      "Recharges in 2 hours",
      "Compatible with solar panels",
    ],
    amazonUrl: "https://www.amazon.com/dp/B082TMBYR6?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/51qW4SWDSqL._SL500_.jpg",
    rating: 4.5,
    category: "Gear & Electronics",
    summary: "Reliable portable power for camping and emergencies",
    slug: "jackery-explorer-300",
  },
  {
    asin: "B0BBM2G4P9",
    title: "BioLite SolarPanel 100, 100 Watt Folding Solar Panel",
    shortTitle: "BioLite SolarPanel 100",
    brand: "BioLite",
    features: [
      "100 Watt solar panel for outdoor use",
      "USB-A & USB-C PD Ports",
      "Patented Optimal Sun System",
      "High-efficiency cells with ETFE lamination",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0BBM2G4P9?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/31KyZvQ+sNL._SL500_.jpg",
    rating: 4.4,
    category: "Gear & Electronics",
    summary: "Powerful foldable solar panel for off-grid adventures",
    slug: "biolite-solarpanel-100",
  },
  {
    asin: "B0DXR1QKCK",
    title: "BioLite Dash 450 Rechargeable 450-Lumen Headlamp",
    shortTitle: "BioLite Dash 450",
    brand: "BioLite",
    features: [
      "High-performance 450-lumen headlamp",
      "90-meter range with optimized lens",
      "Ultra-lightweight at 78 g",
      "60 hours runtime, USB-C rechargeable",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0DXR1QKCK?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/31WHAtsnHmL._SL500_.jpg",
    rating: 4.6,
    category: "Gear & Electronics",
    summary: "Bright, lightweight headlamp for night adventures",
    slug: "biolite-dash-450",
  },
  {
    asin: "B0CVYMMHJ4",
    title: "LuminAID Max Quick Inflate Solar Camping Lantern and Phone Charger",
    shortTitle: "LuminAID Solar Lantern",
    brand: "LuminAID",
    features: [
      "200 lumens LED with multiple brightness settings",
      "Solar powered phone charger and lantern",
      "Weighs just 10 oz",
      "100% waterproof (IP67 rated)",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0CVYMMHJ4?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/31NibOTsqfL._SL500_.jpg",
    rating: 4.5,
    category: "Gear & Electronics",
    summary: "Inflatable solar lantern with phone charging",
    slug: "luminaid-solar-lantern",
  },
  {
    asin: "B0B7BG9YPW",
    title: "Solo Stove Ranger 2.0 - 15 Inch Smokeless Portable Fire Pit",
    shortTitle: "Solo Stove Ranger",
    brand: "Solo Stove",
    features: [
      "Smokeless fire pit with 360° Airflow technology",
      "Weighs just over 15 pounds",
      "Premium 304 stainless steel",
      "Removable ash pan and carry case included",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0B7BG9YPW?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/41EvJVqfQjL._SL500_.jpg",
    rating: 4.7,
    category: "Gear & Electronics",
    summary: "Portable smokeless fire pit for camping",
    slug: "solo-stove-ranger",
  },
  {
    asin: "B0DSCM2NDG",
    title: "Osprey Talon 22L Men's Lightweight Hiking Backpack",
    shortTitle: "Osprey Talon 22",
    brand: "Osprey",
    features: [
      "Lightweight 22-liter capacity",
      "AirScape breathable backpanel",
      "Multiple storage pockets",
      "Hydration reservoir compatible",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0DSCM2NDG?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/41JRcfWbGML._SL500_.jpg",
    rating: 4.7,
    category: "Gear & Electronics",
    summary: "Versatile daypack for hiking and biking",
    slug: "osprey-talon-22",
  },
  {
    asin: "B0CWG543T3",
    title: "Naturehike YL08 Ultralight Camping Chair, 2.38 LBS",
    shortTitle: "Naturehike Camping Chair",
    brand: "Naturehike",
    features: [
      "Weighs just 2.38 lbs",
      "15-second lightning setup",
      "Aircraft-grade 7075 aluminum frame",
      "Supports up to 265 lbs",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0CWG543T3?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/41y+OZnqGrL._SL500_.jpg",
    rating: 4.5,
    category: "Gear & Electronics",
    summary: "Ultra-portable camping chair with quick setup",
    slug: "naturehike-camping-chair",
  },
  {
    asin: "B003TXVZE0",
    title: "Trasharoo Spare Tire Trash Bag BLACK",
    shortTitle: "Trasharoo Trash Bag",
    brand: "Trasharoo",
    features: [
      "Carries up to 50 lbs of weight",
      "900 denier canvas construction",
      "Water-resistant interior coating",
      "Fits standard 30 gallon trash bag",
    ],
    amazonUrl: "https://www.amazon.com/dp/B003TXVZE0?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/51tk5JFbHLL._SL500_.jpg",
    rating: 4.6,
    category: "Gear & Electronics",
    summary: "Leave no trace with this durable trash bag",
    slug: "trasharoo-trash-bag",
  },
  {
    asin: "B09GJVTRNZ",
    title: "JBL Flip 6 - Portable Bluetooth Speaker, IPX7 Waterproof",
    shortTitle: "JBL Flip 6 Speaker",
    brand: "JBL",
    features: [
      "Louder, more powerful sound",
      "IP67 waterproof and dustproof",
      "12 hours of playtime",
      "PartyBoost for multiple speaker pairing",
    ],
    amazonUrl: "https://www.amazon.com/dp/B09GJVTRNZ?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/61LFUxCpL8L._SL500_.jpg",
    rating: 4.7,
    category: "Gear & Electronics",
    summary: "Rugged waterproof Bluetooth speaker",
    slug: "jbl-flip-6-speaker",
  },
  {
    asin: "B0CHW11C8H",
    title: "NEBULA Capsule 3 GTV Portable Mini Projector, Netflix Licensed",
    shortTitle: "NEBULA Capsule 3",
    brand: "NEBULA",
    features: [
      "1080p display with 200 Lumens brightness",
      "Max screen size of 120 inches",
      "2.5-hour battery life",
      "Auto keystone correction and autofocus",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0CHW11C8H?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/31zseHxGUTL._SL500_.jpg",
    rating: 4.5,
    category: "Gear & Electronics",
    summary: "Portable outdoor movie projector for camping",
    slug: "nebula-capsule-3",
  },
  {
    asin: "B00A7EXF4C",
    title: "Intex 2-Person Inflatable Kayak Set - Explorer K2",
    shortTitle: "Intex Explorer K2 Kayak",
    brand: "Intex",
    features: [
      "2-person capacity with 400 lb max weight",
      "Includes 2 paddles and inflatable seats",
      "Lightweight and easy to transport",
      "Rugged vinyl construction",
    ],
    amazonUrl: "https://www.amazon.com/dp/B00A7EXF4C?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/51sB-LqgVyL._SL500_.jpg",
    rating: 4.2,
    category: "Gear & Electronics",
    summary: "Affordable inflatable kayak for lake adventures",
    slug: "intex-explorer-k2-kayak",
  },
  {
    asin: "B09PSKG7C3",
    title: "Garmin inReach Mini 2 Satellite Communicator, Orange",
    shortTitle: "Garmin inReach Mini 2",
    brand: "Garmin",
    features: [
      "Compact satellite communicator",
      "Two-way messaging and interactive SOS",
      "Battery life up to 14 days",
      "Digital compass and TracBack routing",
    ],
    amazonUrl: "https://www.amazon.com/dp/B09PSKG7C3?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/31DZAOvEyNL._SL500_.jpg",
    rating: 4.6,
    category: "Safety & Navigation",
    summary: "Essential safety device for remote adventures",
    slug: "garmin-inreach-mini-2",
  },
  {
    asin: "B0711J9FJP",
    title: "Adventure Medical Kits Mountain Series Medical Kit - Explorer",
    shortTitle: "Adventure First Aid Kit",
    brand: "Adventure Medical Kits",
    features: [
      "Expedition-Grade Kit for 4 people, 7 days",
      "Easy Care organization system",
      "Advanced wound care with trauma pad",
      "Wilderness first aid book included",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0711J9FJP?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/5146zBUdaKL._SL500_.jpg",
    rating: 4.7,
    category: "Safety & Navigation",
    summary: "Comprehensive first aid kit for extended trips",
    slug: "adventure-first-aid-kit",
  },
  {
    asin: "B004P1IMFA",
    title: "Celestron Outland X 10x42 Binoculars – Ideal for Birding",
    shortTitle: "Celestron Outland Binoculars",
    brand: "Celestron",
    features: [
      "10X magnification with 42mm objective lens",
      "Multi-coated lenses and BaK-4 prisms",
      "Waterproof and nitrogen-purged",
      "Rubber-armored durable housing",
    ],
    amazonUrl: "https://www.amazon.com/dp/B004P1IMFA?tag=smartymode-20&linkCode=ogi&th=1&psc=1",
    imageUrl: "https://m.media-amazon.com/images/I/41Cd9wP6qXL._SL500_.jpg",
    rating: 4.4,
    category: "Safety & Navigation",
    summary: "High-quality binoculars for wildlife viewing",
    slug: "celestron-outland-binoculars",
  },
]

/**
 * Fetch products from local data (synced from Directus)
 */
export async function getProductsData(): Promise<Product[]> {
  return productsDataFallback
}

// Backward compatible synchronous version (returns fallback)
export const productsData: Product[] = productsDataFallback

// 从配置文件动态生成分类映射
export const categoryMap: Record<string, string> = Object.fromEntries(
  siteConfig.homepage.categories.items.map(cat => [cat.slug, cat.name])
)

// 从配置文件动态生成分类信息
export const categoryInfo: Record<string, { name: string; description: string; icon: string }> =
  Object.fromEntries(
    siteConfig.homepage.categories.items.map(cat => [
      cat.slug,
      {
        name: cat.name,
        description: cat.description,
        icon: cat.icon.toLowerCase(),
      }
    ])
  )

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await getProductsData()
  const categoryName = categoryMap[categorySlug]
  if (!categoryName) return []
  return products.filter((product) => product.category === categoryName)
}

export async function getProductByAsin(asin: string): Promise<Product | undefined> {
  const products = await getProductsData()
  return products.find((p) => p.asin === asin)
}

export async function getFeaturedProducts(count = 6): Promise<Product[]> {
  const products = await getProductsData()
  return products.slice(0, count)
}

export function getAllCategories() {
  return Object.keys(categoryMap).map((slug) => ({
    slug,
    ...categoryInfo[slug],
  }))
}

export async function getAllProducts(): Promise<Product[]> {
  return getProductsData()
}
