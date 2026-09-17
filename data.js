// Mock data for the Thrift Window customer showroom POC.
// Mirrors the Garment / shop shape from the thrift-window API (see ../thrift-window).

const CATEGORIES = [
  { id: "jakker", label: "Jakker" },
  { id: "gensere", label: "Gensere & strikk" },
  { id: "bukser", label: "Bukser & jeans" },
  { id: "skjorter", label: "Skjorter & topper" },
  { id: "kjoler", label: "Kjoler" },
  { id: "sko", label: "Sko" },
  { id: "vesker", label: "Vesker" },
  { id: "accessories", label: "Accessories" },
];

const CONDITIONS = [
  { id: "as_new", label: "Som ny" },
  { id: "very_good", label: "Svært god" },
  { id: "good", label: "God" },
  { id: "fair", label: "Brukt, fin stand" },
];

const COLORS = [
  { id: "black", label: "Sort", hex: "#232020" },
  { id: "white", label: "Hvit", hex: "#f4f1ec" },
  { id: "beige", label: "Beige", hex: "#d8c3a0" },
  { id: "brown", label: "Brun", hex: "#6b4a30" },
  { id: "navy", label: "Marineblå", hex: "#233258" },
  { id: "blue", label: "Blå", hex: "#3c6ea5" },
  { id: "green", label: "Grønn", hex: "#4c6b4f" },
  { id: "olive", label: "Oliven", hex: "#6c6a3f" },
  { id: "red", label: "Rød", hex: "#9c3b34" },
  { id: "burgundy", label: "Bordeaux", hex: "#6d2b3a" },
  { id: "pink", label: "Rosa", hex: "#d9a3ab" },
  { id: "mustard", label: "Sennep", hex: "#c99a2e" },
  { id: "gray", label: "Grå", hex: "#8a857e" },
  { id: "multi", label: "Mønstret", hex: "conic-gradient(#c1602d,#7a9471,#c99a2e,#233258)" },
];

const GENDERS = [
  { id: "female", label: "Dame" },
  { id: "male", label: "Herre" },
  { id: "any", label: "Unisex" },
];

// Oslo-area shops in the Thrift Window network.
const SHOPS = [
  {
    id: "shop-gronland",
    name: "Loop Vintage Grønland",
    address: "Grønlandsleiret 25, 0190 Oslo",
    lat: 59.9105, lng: 10.7625,
    hours: "Man–fre 11–18, lør 11–16",
    phone: "22 17 40 12",
    description: "Kuratert vintage med fokus på 90-tallsjakker og denim. Kjent for gode utvalg av skinnvarer.",
    heroColor: "#C1602D",
  },
  {
    id: "shop-grunerlokka",
    name: "Bruktbua Grünerløkka",
    address: "Thorvald Meyers gate 44, 0555 Oslo",
    lat: 59.9226, lng: 10.7579,
    hours: "Man–søn 10–19",
    phone: "22 04 55 61",
    description: "Løkkas favoritt for secondhand streetwear og norske merker. Nytt inn hver mandag.",
    heroColor: "#7A9471",
  },
  {
    id: "shop-majorstuen",
    name: "Encore Majorstuen",
    address: "Bogstadveien 12, 0355 Oslo",
    lat: 59.9296, lng: 10.7134,
    hours: "Man–fre 10–18, lør 10–17",
    phone: "22 60 12 88",
    description: "Klassisk og tidløst — dressjakker, kåper og kontorklær i solid kvalitet.",
    heroColor: "#233258",
  },
  {
    id: "shop-torshov",
    name: "Sirkel Torshov",
    address: "Vogts gate 62, 0477 Oslo",
    lat: 59.9407, lng: 10.7669,
    hours: "Tir–søn 11–17",
    phone: "22 71 09 45",
    description: "Nabolagsbutikk drevet som andelslag. Alt overskudd går til lokale miljøprosjekter.",
    heroColor: "#C99A2E",
  },
  {
    id: "shop-frogner",
    name: "Relove Frogner",
    address: "Bygdøy allé 9, 0257 Oslo",
    lat: 59.9214, lng: 10.7089,
    hours: "Man–lør 11–18",
    phone: "22 55 80 20",
    description: "Designermerker til bruktpris — Frogners svar på et kuratert bruktvarehus.",
    heroColor: "#6D2B3A",
  },
  {
    id: "shop-gamlebyen",
    name: "Ombruk Gamlebyen",
    address: "Oslo gate 41, 0192 Oslo",
    lat: 59.9032, lng: 10.7622,
    hours: "Ons–søn 12–18",
    phone: "22 68 33 14",
    description: "Ung og eksperimentell butikk med fokus på ombrukt arbeidstøy og verktøyjakker.",
    heroColor: "#3C6EA5",
  },
];

const ICONS = {
  jakker: "🧥", gensere: "🧶", bukser: "👖", skjorter: "👕",
  kjoler: "👗", sko: "👟", vesker: "👜", accessories: "🧣",
};

// Deterministic-ish mock garment catalog.
const GARMENT_SEED = [
  ["Barbour", "jakker", "Waxjakke Beadnell", "female", "green", 1590],
  ["Levi's", "bukser", "501 Original straight jeans", "male", "blue", 590],
  ["Acne Studios", "gensere", "Ribbestrikket rullekrage", "female", "beige", 890],
  ["Carhartt WIP", "jakker", "Detroit jacket canvas", "any", "brown", 1290],
  ["Filippa K", "skjorter", "Silkeskjorte", "female", "white", 490],
  ["Ganni", "kjoler", "Printet midi-kjole", "female", "multi", 790],
  ["Nike", "sko", "Air Max 90", "any", "white", 690],
  ["Norse Projects", "gensere", "Merinogenser", "male", "navy", 750,],
  ["Levi's", "jakker", "Trucker jacket", "female", "blue", 690],
  ["Church's", "sko", "Loafers i skinn", "male", "brown", 1490],
  ["COS", "bukser", "Vide uldbukser", "female", "gray", 590,],
  ["Vagabond", "sko", "Chelsea boots", "female", "black", 890],
  ["Fjällräven", "vesker", "Kånken ryggsekk", "any", "olive", 490],
  ["Weekday", "skjorter", "Oversized bomullsskjorte", "any", "white", 350],
  ["Wood Wood", "gensere", "Bomullsgenser med logo", "male", "gray", 590],
  ["Zara", "kjoler", "Blomstrete sommerkjole", "female", "multi", 350],
  ["Stutterheim", "jakker", "Regnfrakk", "any", "black", 990],
  ["Holzweiler", "skjorter", "Ternet flanellskjorte", "male", "red", 490],
  ["Gucci", "vesker", "Marmont crossbody (vintage)", "female", "black", 4200],
  ["Diesel", "bukser", "Baggy denim", "male", "black", 690],
  ["Rains", "jakker", "Lang regnjakke", "any", "black", 750],
  ["Samsøe Samsøe", "gensere", "Oversized hettegenser", "female", "beige", 490],
  ["Common Projects", "sko", "Achilles low", "any", "white", 1290],
  ["Baum und Pferdgarten", "kjoler", "Satin slipkjole", "female", "pink", 690],
  ["Tiger of Sweden", "skjorter", "Slim fit skjorte", "male", "blue", 590],
  ["Arket", "bukser", "Rette chinos", "male", "beige", 450,],
  ["Ganni", "vesker", "Banana bag", "female", "mustard", 990],
  ["Won Hundred", "jakker", "Bomberjakke", "female", "burgundy", 890],
  ["New Balance", "sko", "990v5", "any", "gray", 990],
  ["& Other Stories", "accessories", "Silkeskjerf", "female", "multi", 250],
];

function seedRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const GARMENTS = GARMENT_SEED.map((row, i) => {
  const [brand, category, title, gender, color, priceKr] = row;
  const rand = seedRandom(i * 37 + 11);
  const shop = SHOPS[Math.floor(rand() * SHOPS.length)];
  const condition = CONDITIONS[Math.floor(rand() * CONDITIONS.length)].id;
  const sizePool = category === "sko"
    ? ["36", "37", "38", "39", "40", "41", "42", "43", "44"]
    : ["XS", "S", "M", "L", "XL"];
  const size = sizePool[Math.floor(rand() * sizePool.length)];
  const daysAgo = Math.floor(rand() * 21);
  const addedAt = Date.now() - daysAgo * 86400000;
  return {
    id: "g" + (i + 1),
    title,
    brand,
    category,
    gender,
    size,
    condition,
    colors: [color],
    priceKr,
    status: "available",
    shopId: shop.id,
    addedAt,
    isNew: daysAgo <= 2,
    icon: ICONS[category] || "🏷️",
    // Drop a photo at images/<id>.jpg (e.g. images/g1.jpg) to replace the
    // placeholder — it's picked up automatically, no code changes needed.
    image: "images/" + "g" + (i + 1) + ".jpg",
  };
});

function shopById(id) {
  return SHOPS.find((s) => s.id === id);
}

function garmentById(id) {
  return GARMENTS.find((g) => g.id === id);
}

function categoryLabel(id) {
  return (CATEGORIES.find((c) => c.id === id) || {}).label || id;
}

function conditionLabel(id) {
  return (CONDITIONS.find((c) => c.id === id) || {}).label || id;
}

function colorLabel(id) {
  return (COLORS.find((c) => c.id === id) || {}).label || id;
}

function colorSwatch(id) {
  return (COLORS.find((c) => c.id === id) || {}).hex || "#ccc";
}

function genderLabel(id) {
  return (GENDERS.find((g) => g.id === id) || {}).label || id;
}
