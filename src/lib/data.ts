export interface CredentialItem {
  id: string;
  title: string;
  category: "Drug License" | "Tax & Registration" | "Quality Standard" | "Trade Association";
  statusText: string;
  regNumberPlaceholder: string;
  issuingAuthority: string;
  validity: string;
  description: string;
  highlights: string[];
}

export interface BrandItem {
  name: string;
  tier: string;
  category: string;
  initials: string;
}

export interface ProductItem {
  id: string;
  name: string;
  genericName: string;
  category: "Generic" | "Surgical" | "Ayurvedic" | "OTC";
  company: string;
  packSize: string;
  mrp: number;
  wholesalePrice: number;
  scheme?: string;
  batchNo: string;
  expDate: string;
  hsnCode: string;
  inStock: boolean;
  image: string;
  description: string;
}

export interface OfferSlide {
  id: string;
  occasion?: string;
  title: string;
  subtitle: string;
  highlight: string;
  code: string;
  badge: string;
  imageUrl: string;
  bgGradient?: string;
}

export interface ValuePropItem {
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  metric: string;
  metricLabel: string;
}

export interface TimelineMilestone {
  year: string;
  phase: "Established" | "Growth" | "Expansion" | "Today";
  title: string;
  description: string;
  achievements: string[];
}

export const COMPANY_DETAILS = {
  name: "Saurav Medical Agency",
  registeredNameHindi: "सौरव मेडिकल एजेंसी",
  tagline: "Wholesale Medicines & Healthcare Supplies for Retail Pharmacies",
  ownerName: "Santosh Kumar",
  role: "Proprietor & Managing Director",
  ownerPhotoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  mobile: "7070605245",
  phoneDisplay: "+91 7070605245",
  whatsappUrl: "https://wa.me/917070605245?text=Hello%20Saurav%20Medical%20Agency,%20I%20am%20a%20medical%20store%20owner%20and%20want%20to%20place%20an%20order.",
  upiId: "eazypay.589015203@icici",
  qrImageUrl: "/payment-qr.png",
  address: "Kotwali Chowk, Beside ICICI Bank (1st Floor), Bhagalpur - 812002 (Bihar)",
  city: "Bhagalpur",
  state: "Bihar",
  pincode: "812002",
  email: "wholesale@sauravmedical.com",
  hours: "Mon – Sat: 9:00 AM – 8:30 PM (Sunday Emergency Dispatch on Call)",
  dlPlaceholder: "DL Nos. 20B/BGP/XXXX & 21B/BGP/XXXX (Form 20B & 21B)",
  gstinPlaceholder: "GSTIN: 10AXXXX0000X1ZX (Wholesale Taxpayer)",
};

// 21 Partner Companies from Visiting Card Back
export const CARD_COMPANIES: BrandItem[] = [
  { name: "Alkem", tier: "Direct Depot", category: "Antibiotics & Generics", initials: "AK" },
  { name: "Aristo", tier: "Authorized Wholesale", category: "Gastro & Anti-Infectives", initials: "AR" },
  { name: "Cipla", tier: "Direct Wholesale", category: "Respiratory & Critical Care", initials: "CP" },
  { name: "Medley", tier: "Authorized Wholesale", category: "Analgesics & Hematinics", initials: "MD" },
  { name: "Lupin", tier: "Direct Wholesale", category: "Cardiology & Anti-TB", initials: "LP" },
  { name: "Abbott", tier: "Super-Stockist", category: "Metabolic & Nutrition", initials: "AB" },
  { name: "Intas", tier: "Authorized Wholesale", category: "CNS & Critical Care", initials: "IN" },
  { name: "Smart Lab", tier: "Generic Line", category: "Daily Acute Generics", initials: "SL" },
  { name: "Silver Cross", tier: "Generic Line", category: "Essential Formulations", initials: "SC" },
  { name: "Biochem", tier: "Authorized Wholesale", category: "Injectables & Antibiotics", initials: "BC" },
  { name: "Torque", tier: "Wholesale Partner", category: "Syrups, Ointments & Derma", initials: "TQ" },
  { name: "Jacsonpal", tier: "Authorized Depot", category: "Gynecology & Pain Care", initials: "JP" },
  { name: "Windlass", tier: "Generic Line", category: "Quality Formulations", initials: "WL" },
  { name: "Mankind", tier: "Super-Stockist", category: "OTC, Antibiotics & Derma", initials: "MK" },
  { name: "Laborate", tier: "Generic Line", category: "Affordable Generic Tablets", initials: "LB" },
  { name: "Lee Ford", tier: "Wholesale Partner", category: "Nutraceuticals & Pain Care", initials: "LF" },
  { name: "Ramsans", tier: "Authorized Wholesale", category: "Essential Healthcare", initials: "RS" },
  { name: "Safeone", tier: "Surgical & Health", category: "Sterile Surgical Disposables", initials: "SO" },
  { name: "Touchone", tier: "Generic Line", category: "General Formulations", initials: "TO" },
  { name: "Dr Reddy", tier: "Super-Stockist", category: "Gastro & Chronic Therapies", initials: "DR" },
  { name: "Alembic", tier: "Direct Wholesale", category: "Anti-Infectives & Cardiology", initials: "AL" },
];

export const OFFER_SLIDES: OfferSlide[] = [
  {
    id: "offer-1",
    occasion: "Festival Special Scheme",
    title: "Diwali & Festive Medicine Offers",
    subtitle: "Special wholesale rates on high-demand antibiotics and general medicines for local pharmacies",
    highlight: "10 + 1 Free on Antibiotics + 5% Extra Cash Discount on Bulk Lots",
    code: "SCHEME-FESTIVE",
    badge: "Festival Special",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
    bgGradient: "from-[#0b1e36] via-[#102a4c] to-[#0f766e]",
  },
  {
    id: "offer-2",
    occasion: "Seasonal Monsoon Scheme",
    title: "Monsoon Healthcare Ready Stock",
    subtitle: "Fast-moving Paracetamol, Cefixime, Azithromycin and cough syrups in ready stock",
    highlight: "10 + 1 Free Scheme + Extra 3% Slab Discount on Full Box Orders",
    code: "SCHEME-10+1",
    badge: "Seasonal Offer",
    imageUrl: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=1200&q=80",
    bgGradient: "from-[#0f766e] via-[#115e59] to-[#0b1e36]",
  },
  {
    id: "offer-3",
    occasion: "Hospital & Clinic Bulk Supply",
    title: "Surgical Disposables & Consumables",
    subtitle: "Bulk cartons of Safeone syringes, IV sets, examination gloves, and surgical cotton",
    highlight: "Flat 18% Wholesale Margin on Carton Packing | Ready for Delivery",
    code: "SURGICAL-CARTON",
    badge: "Bulk Carton Deal",
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=80",
    bgGradient: "from-[#1e293b] via-[#0b1e36] to-[#0369a1]",
  },
];

export const DUMMY_PRODUCTS: ProductItem[] = [
  {
    id: "prod-1",
    name: "Cefixime 200mg Tablets",
    genericName: "Cefixime Dispersible 200mg",
    category: "Generic",
    company: "Alkem",
    packSize: "10 x 10 Strips / Box",
    mrp: 1450,
    wholesalePrice: 480,
    scheme: "10 + 1 Free",
    batchNo: "AK-CF241",
    expDate: "11/2027",
    hsnCode: "3004",
    inStock: true,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    description: "Third-generation cephalosporin broad-spectrum antibiotic formulation for respiratory and UTI treatment.",
  },
  {
    id: "prod-2",
    name: "Pantoprazole & Domperidone SR",
    genericName: "Pantoprazole 40mg + Domperidone 30mg SR",
    category: "Generic",
    company: "Aristo",
    packSize: "10 x 10 ALU-ALU Strips",
    mrp: 1280,
    wholesalePrice: 395,
    scheme: "Regular Wholesale",
    batchNo: "AR-PD902",
    expDate: "08/2027",
    hsnCode: "3004",
    inStock: true,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80",
    description: "Sustained-release antacid and anti-emetic gastro capsules for GERD and acidity management.",
  },
  {
    id: "prod-3",
    name: "Paracetamol 650mg Fast Action",
    genericName: "Paracetamol IP 650mg",
    category: "Generic",
    company: "Cipla",
    packSize: "20 x 15 Tablets Blister",
    mrp: 420,
    wholesalePrice: 190,
    scheme: "20 + 2 Free",
    batchNo: "CP-PC441",
    expDate: "03/2028",
    hsnCode: "3004",
    inStock: true,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80",
    description: "High-efficacy analgesic and antipyretic formulation for fever and chronic body pain relief.",
  },
  {
    id: "prod-4",
    name: "Amoxycillin & Pot. Clavulanate 625",
    genericName: "Amoxicillin 500mg + Clavulanic Acid 125mg",
    category: "Generic",
    company: "Mankind",
    packSize: "10 x 1 x 6 Strips Pack",
    mrp: 1650,
    wholesalePrice: 620,
    scheme: "Special Slab Rate",
    batchNo: "MK-CV810",
    expDate: "01/2027",
    hsnCode: "3004",
    inStock: true,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    description: "Beta-lactamase inhibitor combination antibiotic for dental, skin, and lower respiratory infections.",
  },
  {
    id: "prod-5",
    name: "Omeprazole 20mg Hard Capsules",
    genericName: "Omeprazole IP 20mg",
    category: "Generic",
    company: "Dr Reddy",
    packSize: "10 x 20 Strip Pack",
    mrp: 890,
    wholesalePrice: 280,
    scheme: "10 + 1 Free",
    batchNo: "DR-OM312",
    expDate: "09/2027",
    hsnCode: "3004",
    inStock: true,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80",
    description: "Enteric-coated proton pump inhibitor for gastric ulcers, hyperacidity, and heartburn.",
  },
  {
    id: "prod-6",
    name: "Azithromycin 500mg Tablets",
    genericName: "Azithromycin IP 500mg",
    category: "Generic",
    company: "Lupin",
    packSize: "10 x 3 Blister Pack",
    mrp: 1190,
    wholesalePrice: 410,
    scheme: "Bulk Rate",
    batchNo: "LP-AZ550",
    expDate: "06/2027",
    hsnCode: "3004",
    inStock: true,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80",
    description: "Broad-spectrum macrolide antibiotic for acute ENT and respiratory tract infections.",
  },
  {
    id: "prod-7",
    name: "Disposable Sterile Syringes 5ml with Needle",
    genericName: "Single-use 5ml Luer Lock Syringe 23G",
    category: "Surgical",
    company: "Safeone",
    packSize: "Box of 100 Pcs",
    mrp: 650,
    wholesalePrice: 290,
    scheme: "Carton Rate Available",
    batchNo: "SO-SY501",
    expDate: "12/2029",
    hsnCode: "9018",
    inStock: true,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80",
    description: "EO sterilized medical-grade single-use syringe with ultra-fine siliconized stainless steel needle.",
  },
  {
    id: "prod-8",
    name: "IV Infusion Set with Air Vent & Filter",
    genericName: "Sterile Gravity IV Infusion Tubing Set",
    category: "Surgical",
    company: "Safeone",
    packSize: "Pack of 50 Sets",
    mrp: 850,
    wholesalePrice: 360,
    scheme: "Hospital Bulk Tier",
    batchNo: "SO-IV112",
    expDate: "10/2028",
    hsnCode: "9018",
    inStock: true,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80",
    description: "Kink-resistant medical PVC IV line equipped with 15-micron fluid filter and hydrophobic air venting.",
  },
  {
    id: "prod-9",
    name: "Latex Examination Gloves (Powder-Free)",
    genericName: "Non-sterile Powder-Free Examination Gloves - Medium",
    category: "Surgical",
    company: "Safeone",
    packSize: "Box of 100 Pcs (50 Pairs)",
    mrp: 550,
    wholesalePrice: 240,
    scheme: "10 Boxes Lot Offer",
    batchNo: "SO-GL780",
    expDate: "05/2029",
    hsnCode: "4015",
    inStock: true,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80",
    description: "Micro-textured natural rubber latex gloves offering high tactile sensitivity and tear resistance.",
  },
  {
    id: "prod-10",
    name: "Hospital Grade Absorbent Cotton 500g",
    genericName: "IP Pure Bleached Surgical Cotton Roll",
    category: "Surgical",
    company: "Safeone",
    packSize: "Bundle of 5 Rolls (500g each)",
    mrp: 750,
    wholesalePrice: 380,
    scheme: "Regular Wholesale",
    batchNo: "SO-CT309",
    expDate: "N/A",
    hsnCode: "3005",
    inStock: true,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80",
    description: "100% pure bleached surgical absorbent cotton for clinical wound dressings and antiseptic swabbing.",
  },
  {
    id: "prod-11",
    name: "Herbal Bronchial Cough Relief Syrup",
    genericName: "Tulsi, Vasaka, Mulethi & Kantkari Ayurvedic Blend",
    category: "Ayurvedic",
    company: "Torque",
    packSize: "Pack of 12 Bottles (100ml each)",
    mrp: 1320,
    wholesalePrice: 580,
    scheme: "12 + 2 Free",
    batchNo: "TQ-HC101",
    expDate: "04/2027",
    hsnCode: "3003",
    inStock: true,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    description: "Non-drowsy herbal expectorant syrup for soothing throat irritation and bronchial chest congestion.",
  },
  {
    id: "prod-12",
    name: "Ayurvedic Joint Pain Liniment Oil",
    genericName: "Mahanarayan, Gandhapura & Nilgiri Medicated Oil",
    category: "Ayurvedic",
    company: "Lee Ford",
    packSize: "Pack of 10 Bottles (60ml each)",
    mrp: 1450,
    wholesalePrice: 590,
    scheme: "10 + 1 Free",
    batchNo: "LF-JO220",
    expDate: "09/2027",
    hsnCode: "3003",
    inStock: true,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80",
    description: "Fast-absorbing traditional herbal formulation for muscular stiffness, joint inflammation, and sprains.",
  },
  {
    id: "prod-13",
    name: "Multi-Vitamin & Zinc Energy Tonic",
    genericName: "B-Complex + L-Lysine + Zinc Multi-Nutrient Syrup",
    category: "OTC",
    company: "Mankind",
    packSize: "Shipper of 24 Bottles (200ml each)",
    mrp: 3600,
    wholesalePrice: 1450,
    scheme: "Shipper Bulk Pack",
    batchNo: "MK-VT890",
    expDate: "07/2027",
    hsnCode: "2106",
    inStock: true,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80",
    description: "High-turnover daily OTC nutritional tonic supporting immune defense, energy, and convalescence.",
  },
  {
    id: "prod-14",
    name: "Digestive Enzyme & Carminative Drops",
    genericName: "Fungal Diastase + Pepsin Liquid Enzyme",
    category: "OTC",
    company: "Aristo",
    packSize: "Pack of 20 Bottles (30ml drops)",
    mrp: 1200,
    wholesalePrice: 480,
    scheme: "20 + 2 Free",
    batchNo: "AR-EN404",
    expDate: "11/2027",
    hsnCode: "3004",
    inStock: true,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    description: "Enzymatic drops for indigestion, bloating, gastrointestinal distress, and appetite stimulation.",
  },
  {
    id: "prod-15",
    name: "Diclofenac & Linseed Analgesic Gel",
    genericName: "Diclofenac Diethylamine + Virgin Linseed Oil + Methyl Salicylate",
    category: "OTC",
    company: "Laborate",
    packSize: "Pack of 20 Tubes (30g each)",
    mrp: 1500,
    wholesalePrice: 490,
    scheme: "Counter Display Box",
    batchNo: "LB-DG662",
    expDate: "05/2027",
    hsnCode: "3004",
    inStock: true,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80",
    description: "Fast-acting topical anti-inflammatory gel for lumbar pain, neck stiffness, and sprains.",
  },
  {
    id: "prod-16",
    name: "Cetirizine 10mg Anti-Allergic Tablets",
    genericName: "Cetirizine Dihydrochloride IP 10mg",
    category: "Generic",
    company: "Smart Lab",
    packSize: "20 x 10 Tablets Strip Box",
    mrp: 480,
    wholesalePrice: 160,
    scheme: "20 + 4 Free",
    batchNo: "SL-CT109",
    expDate: "12/2027",
    hsnCode: "3004",
    inStock: true,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80",
    description: "High-volume generic second-generation anti-histamine for allergic rhinitis, watery eyes, and hives.",
  },
];

export const CREDENTIALS_DATA: CredentialItem[] = [
  {
    id: "dl-20b-21b",
    title: "Wholesale Drug License (Form 20-B & 21-B)",
    category: "Drug License",
    statusText: "Active & Verified",
    regNumberPlaceholder: "DL No. 20B/BGP/XXXX & 21B/BGP/XXXX",
    issuingAuthority: "Drugs Control Directorate, Bihar",
    validity: "Active Wholesale License",
    description: "Official wholesale license under the Drugs & Cosmetics Act to store and distribute allopathic medicines and healthcare products to medical stores.",
    highlights: [
      "Authorized wholesale counter at Kotwali Chowk, Bhagalpur",
      "Full compliance with government medicine distribution rules",
      "Qualified pharmacist on premise during business hours",
    ],
  },
  {
    id: "gstin-reg",
    title: "Goods & Services Tax Registration (GSTIN)",
    category: "Tax & Registration",
    statusText: "Regular GST Taxpayer",
    regNumberPlaceholder: "GSTIN: 10XXXXX0000X1ZX",
    issuingAuthority: "Commercial Taxes Department, Bihar",
    validity: "Active & Verified",
    description: "100% genuine computerized tax bills with HSN codes so your medical store can easily claim input tax credit (ITC).",
    highlights: [
      "Itemized B2B bills with proper HSN 3004 & 9018 codes",
      "Prompt monthly GST filing for fast tax credit claims",
      "Complete batch number and expiry date on every bill",
    ],
  },
  {
    id: "bhagalpur-chemists",
    title: "Bhagalpur Chemists & Druggists Association",
    category: "Trade Association",
    statusText: "Life Member",
    regNumberPlaceholder: "BDCDA / MBR / BGP-XXXX",
    issuingAuthority: "Bihar Chemists & Druggists Association (BCDA)",
    validity: "Permanent Life Member",
    description: "Active member of local and state chemist associations, maintaining ethical wholesale prices, fair margins, and reliable medicine supply.",
    highlights: [
      "Follows fair trade guidelines for medical stores",
      "Close relationship with community pharmacies across Bhagalpur",
      "Full manufacturer support on returns and damages",
    ],
  },
  {
    id: "gdp-storage",
    title: "Safe Medicine Storage & Quality Check",
    category: "Quality Standard",
    statusText: "Audited Warehouse",
    regNumberPlaceholder: "GDP-QA / BGP-2026",
    issuingAuthority: "Standard Pharma Storage Protocol",
    validity: "Regularly Verified",
    description: "Clean, temperature-controlled warehouse in Kotwali Chowk with dedicated refrigerators and systematic stock rotation (FEFO).",
    highlights: [
      "Dedicated 2°C – 8°C refrigerators for insulin and vaccines",
      "Zero counterfeit tolerance — 100% direct company supply",
      "Safe box packing for glass ampoules, syrups, and vials",
    ],
  },
];

export const VALUE_PROPOSITIONS: ValuePropItem[] = [
  {
    title: "100% Genuine Medicines",
    tagline: "Direct Company Supply",
    description: "We source all medicines directly from authorized company depots with batch test reports. Zero tolerance for fake or low-quality stock.",
    iconName: "ShieldCheck",
    metric: "100%",
    metricLabel: "Original",
  },
  {
    title: "Safe Cold Storage (2°C – 8°C)",
    tagline: "Protects Sensitive Medicines",
    description: "Dedicated medical refrigerators for insulin, vaccines, and injections ensure every medicine stays potent and safe till delivery.",
    iconName: "ThermometerSnowflake",
    metric: "24/7",
    metricLabel: "Cool Storage",
  },
  {
    title: "Best Wholesale Rates",
    tagline: "Better Margins for Your Store",
    description: "Get direct wholesale prices and ongoing bonus schemes like 10+1 free, helping your medical store earn healthy retail profits.",
    iconName: "TrendingDown",
    metric: "Best",
    metricLabel: "Wholesale Rates",
  },
  {
    title: "Fast Local Delivery",
    tagline: "Same-Day Supply Across Bhagalpur",
    description: "Regular daily delivery runs across Bhagalpur, Naugachia, Banka, and Kahalgaon so your shop never runs out of essential medicines.",
    iconName: "Truck",
    metric: "Same-Day",
    metricLabel: "Local Delivery",
  },
  {
    title: "Computerized GST Bills",
    tagline: "Easy Accounts & Tax Credit",
    description: "Every order comes with a printed and digital tax invoice showing batch numbers, expiry dates, and HSN codes for hassle-free bookkeeping.",
    iconName: "FileCheck2",
    metric: "100%",
    metricLabel: "GST Invoices",
  },
  {
    title: "20+ Years of Trusted Service",
    tagline: "Personal Help from Santosh Kumar",
    description: "Friendly service, flexible credit terms for verified retailers, and direct WhatsApp support whenever you need urgent medicines.",
    iconName: "Handshake",
    metric: "20+ Yrs",
    metricLabel: "In Business",
  },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: "2004",
    phase: "Established",
    title: "Founded in Bhagalpur",
    description: "Started by Santosh Kumar with Form 20B & 21B drug licenses at Kotwali Chowk, supplying genuine medicines to 30 local chemist shops.",
    achievements: [
      "Obtained Form 20B & 21B wholesale drug licenses",
      "Partnered with leading pharmaceutical companies",
      "Built reputation on genuine medicines and honest pricing",
    ],
  },
  {
    year: "2011",
    phase: "Growth",
    title: "Warehouse & Cold Storage Expansion",
    description: "Expanded our central facility at Kotwali Chowk, added medical refrigerators for vaccines, and started stocking surgical disposables in bulk.",
    achievements: [
      "Expanded stock to over 2,500 everyday formulations",
      "Network grew to over 150 retail medical stores",
      "Started systematic batch-wise stock management (FEFO)",
    ],
  },
  {
    year: "2018",
    phase: "Expansion",
    title: "Direct Stockist for 21+ Top Pharma Brands",
    description: "Secured direct wholesale supply from India's best companies including Alkem, Cipla, Mankind, Dr Reddy, and Abbott.",
    achievements: [
      "Daily delivery routes across Bhagalpur, Naugachia, and Kahalgaon",
      "Added full range of surgical items, Ayurvedic care, and OTC products",
      "Full computerized GST billing and ledger management",
    ],
  },
  {
    year: "Today",
    phase: "Today",
    title: "Serving 200+ Medical Stores & Clinics",
    description: "Providing local pharmacists with easy catalog browsing, fast phone/WhatsApp ordering, transparent wholesale prices, and same-day delivery.",
    achievements: [
      "Over 10,000 active medicines and healthcare supplies",
      "Fast WhatsApp & online order booking with instant bills",
      "Dedicated phone support for local medical shop owners",
    ],
  },
];
