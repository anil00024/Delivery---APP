import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Home, Package, ShoppingBag, Tag, Bell, ChevronLeft, Search,
  Heart, Star, Plus, Minus, Trash2, Check, User, Edit3,
  MapPin, CreditCard, Truck, ChevronRight, LogOut, Wallet,
  Smartphone, Banknote, PartyPopper, Footprints, Mountain, Zap,
  SlidersHorizontal, X, Gift, IndianRupee, Sparkles, ShieldCheck,
  Dumbbell, Phone, Mail, HelpCircle, ChevronDown, MessageCircle,
  Moon, Sun, RotateCcw, MapPinned, Clock, PhoneCall, Sunrise,
} from "lucide-react";

/* ----------------------------- Data layer ------------------------------ */

const BRANDS = ["Campus", "Sparx", "Bata", "Liberty", "Red Tape", "ASIAN", "Puma", "Adidas", "Nike", "Woodland", "Skechers", "Bacca Bucci"];

const PRODUCTS = [
  {
    id: "p1", name: "Campus Oxy 2.0", brand: "Campus", price: 1499, oldPrice: 1999,
    rating: 4.3, reviews: 2140, sole: "teal", body: "white", tag: "Bestseller",
    category: "Casual", variant: "court", sizes: [6, 7, 8, 9, 10, 11],
    description: "A everyday walking sneaker with a soft PU insole and breathable mesh upper. Built for long college days and longer commutes.",
    features: ["Lightweight EVA sole", "Breathable mesh upper", "Anti-skid tread", "Padded ankle collar"],
    colorways: [
      { sole: "teal", body: "white", label: "Sea Teal" },
      { sole: "rose", body: "white", label: "Blush" },
      { sole: "indigo", body: "stone", label: "Indigo Grey" },
    ],
  },
  {
    id: "p2", name: "Sparx SM-717 Runner", brand: "Sparx", price: 999, oldPrice: null,
    rating: 4.1, reviews: 860, sole: "orange", body: "slate", tag: "New Drop",
    category: "Running", variant: "runner", sizes: [6, 7, 8, 9, 10],
    description: "Sparx's most popular runner returns with an updated foam midsole tuned for tarmac and treadmill sessions alike.",
    features: ["Memory foam footbed", "Mesh + synthetic upper", "Shock-absorbing midsole", "Reflective heel tab"],
    colorways: [
      { sole: "orange", body: "slate", label: "Ember" },
      { sole: "sky", body: "white", label: "Ice Blue" },
      { sole: "emerald", body: "stone", label: "Pine" },
    ],
  },
  {
    id: "p3", name: "Bata Power Trekker", brand: "Bata", price: 1899, oldPrice: 2199,
    rating: 4.4, reviews: 512, sole: "amber", body: "stone", tag: null,
    category: "Trail", variant: "trail", sizes: [7, 8, 9, 10, 11],
    description: "A rugged trekking shoe with a deep-lug rubber outsole for grip on loose gravel, monsoon trails and hill stations.",
    features: ["Deep-lug rubber outsole", "Water-resistant upper", "Reinforced toe cap", "Cushioned midsole"],
    colorways: [
      { sole: "amber", body: "stone", label: "Rock Brown" },
      { sole: "emerald", body: "stone", label: "Moss" },
    ],
  },
  {
    id: "p4", name: "Liberty Force 10", brand: "Liberty", price: 1299, oldPrice: 1599,
    rating: 4.0, reviews: 340, sole: "rose", body: "white", tag: "Sale",
    category: "Casual", variant: "court", sizes: [6, 7, 8, 9, 10, 11],
    description: "A clean, classic white sneaker from a name Indian households have trusted for decades. Pairs with everything.",
    features: ["Genuine leather panels", "Cushioned collar", "Non-marking sole", "Stitched welt detail"],
    colorways: [
      { sole: "rose", body: "white", label: "Rosewood" },
      { sole: "indigo", body: "white", label: "Navy Trim" },
    ],
  },
  {
    id: "p5", name: "Red Tape Ranger Boot", brand: "Red Tape", price: 2499, oldPrice: null,
    rating: 4.5, reviews: 289, sole: "emerald", body: "stone", tag: null,
    category: "Trail", variant: "trail", sizes: [7, 8, 9, 10, 11],
    description: "A high-ankle outdoor boot built for weekend treks, built with a leather-blend upper and a shock-resistant sole unit.",
    features: ["High-ankle support", "Leather-blend upper", "Shock-resistant sole", "Lace-lock eyelets"],
    colorways: [
      { sole: "emerald", body: "stone", label: "Forest" },
      { sole: "amber", body: "stone", label: "Desert Tan" },
    ],
  },
  {
    id: "p6", name: "ASIAN Rebel-11", brand: "ASIAN", price: 1199, oldPrice: null,
    rating: 4.2, reviews: 675, sole: "sky", body: "white", tag: "New Drop",
    category: "Sports", variant: "runner", sizes: [6, 7, 8, 9, 10, 11],
    description: "A budget-friendly sports sneaker with a knit upper that flexes with every step — built for the gym and the ground.",
    features: ["Knit stretch upper", "Dual-density sole", "Sweat-wicking lining", "Extra grip forefoot"],
    colorways: [
      { sole: "sky", body: "white", label: "Sky" },
      { sole: "orange", body: "stone", label: "Rebel Orange" },
      { sole: "violet", body: "white", label: "Grape" },
    ],
  },
  {
    id: "p7", name: "Puma Smash Vulc v2", brand: "Puma", price: 2999, oldPrice: 3499,
    rating: 4.6, reviews: 1980, sole: "violet", body: "cream", tag: "Bestseller",
    category: "Casual", variant: "court", sizes: [6, 7, 8, 9, 10, 11],
    description: "A vulcanised court-style sneaker with a low-profile silhouette. A wardrobe staple built to be worn in, not just worn.",
    features: ["Vulcanised rubber sole", "Leather upper", "Padded tongue", "Signature side stripe"],
    colorways: [
      { sole: "violet", body: "cream", label: "Plum" },
      { sole: "teal", body: "white", label: "Lagoon" },
    ],
  },
  {
    id: "p8", name: "Adidas Duramo SL", brand: "Adidas", price: 3499, oldPrice: null,
    rating: 4.6, reviews: 2210, sole: "sky", body: "lime", tag: "Bestseller",
    category: "Running", variant: "runner", sizes: [6, 7, 8, 9, 10, 11],
    description: "A featherweight training shoe with responsive cushioning, tuned for tempo runs and everyday mileage.",
    features: ["Lightweight Cloudfoam midsole", "Breathable mesh upper", "Durable rubber outsole", "Reflective accents"],
    colorways: [
      { sole: "sky", body: "lime", label: "Volt Blue" },
      { sole: "rose", body: "white", label: "Coral" },
    ],
  },
  {
    id: "p9", name: "Nike Revolution 6", brand: "Nike", price: 3999, oldPrice: 4499,
    rating: 4.7, reviews: 3120, sole: "rose", body: "stone", tag: "Sale",
    category: "Running", variant: "runner", sizes: [6, 7, 8, 9, 10, 11],
    description: "A soft, foam-cushioned everyday trainer with a breathable engineered mesh upper for all-day comfort.",
    features: ["Foam midsole cushioning", "Engineered mesh upper", "Wide, stable base", "Rubber waffle outsole"],
    colorways: [
      { sole: "rose", body: "stone", label: "Sunset" },
      { sole: "indigo", body: "white", label: "Midnight" },
      { sole: "emerald", body: "stone", label: "Pine Green" },
    ],
  },
  {
    id: "p10", name: "Woodland Trail Max GTX", brand: "Woodland", price: 4299, oldPrice: null,
    rating: 4.5, reviews: 410, sole: "amber", body: "stone", tag: null,
    category: "Trail", variant: "trail", sizes: [7, 8, 9, 10, 11],
    description: "Woodland's toughest trail shoe, built with a waterproof membrane and an aggressive lug pattern for wet Ghats trails.",
    features: ["Waterproof membrane", "Aggressive lug outsole", "Reinforced heel counter", "Quick-lace system"],
    colorways: [{ sole: "amber", body: "stone", label: "Timber" }],
  },
  {
    id: "p11", name: "Skechers Go Walk Vantage", brand: "Skechers", price: 3799, oldPrice: null,
    rating: 4.4, reviews: 890, sole: "teal", body: "white", tag: null,
    category: "Sports", variant: "runner", sizes: [6, 7, 8, 9, 10, 11],
    description: "A slip-on walking shoe with air-cooled memory foam — designed for people who clock 10,000+ steps a day.",
    features: ["Air-cooled memory foam", "Slip-on comfort", "5GEN cushioning", "Machine washable"],
    colorways: [
      { sole: "teal", body: "white", label: "Aqua" },
      { sole: "slate", body: "white", label: "Graphite" },
    ],
  },
  {
    id: "p12", name: "Bacca Bucci Street Force", brand: "Bacca Bucci", price: 1999, oldPrice: 2499,
    rating: 4.1, reviews: 233, sole: "orange", body: "stone", tag: "Sale",
    category: "Sports", variant: "court", sizes: [6, 7, 8, 9, 10, 11],
    description: "A chunky street-style sneaker with a raised sole unit — built for the sneakerhead who wants to be noticed.",
    features: ["Raised platform sole", "Synthetic leather upper", "Padded collar", "Bold contrast stitching"],
    colorways: [
      { sole: "orange", body: "stone", label: "Street Orange" },
      { sole: "violet", body: "white", label: "Ultraviolet" },
    ],
  },
];

// Studio product photography lives in /public/product-images/<id>-N.jpg — drop real
// photos in with matching filenames to replace the generated placeholders instantly.
for (const p of PRODUCTS) {
  p.images = [1, 2, 3].map((n) => `${import.meta.env.BASE_URL}product-images/${p.id}-${n}.jpg`);((n) => `/product-images/${p.id}-${n}.jpg`);
  p.image = p.images[0];
}

// Extended sizes carry a small surcharge, like most footwear retailers charge for
// sizes outside the core run (this also makes the price actually react to size choice).
function sizeSurcharge(size) {
  if (size <= 6) return 100;
  if (size === 7) return 50;
  if (size >= 11) return 150;
  if (size === 10) return 50;
  return 0;
}
function priceForSize(product, size) {
  return product.price + sizeSurcharge(size);
}

const CATEGORIES = [
  { key: "All", icon: Zap },
  { key: "Running", icon: Footprints },
  { key: "Casual", icon: ShoppingBag },
  { key: "Sports", icon: Dumbbell },
  { key: "Trail", icon: Mountain },
];

const DISCOUNTS = [
  { code: "DROP15", desc: "15% off everything, today only", color: "emerald" },
  { code: "FIRST50", desc: "50% off your first pair", color: "orange" },
  { code: "FREESHIP", desc: "Free shipping over ₹1,999", color: "sky" },
  { code: "FEST200", desc: "Flat ₹200 off on orders above ₹2,500", color: "rose" },
];

const TRENDING_SEARCHES = ["Running shoes under ₹2000", "Campus", "Trail boots", "White sneakers", "Puma"];

const STEPS = ["Placed", "Packed", "Shipped", "Out for delivery", "Delivered"];
const STATUS_STEP = { Processing: 1, Shipped: 2, Delivered: 4 };

const INITIAL_ORDERS = [
  { id: "#STR8354", date: "Ordered yesterday", status: "Shipped", items: [{ name: "Sparx SM-717 Runner", note: "UK 9", price: 999 }], total: 999, payment: "UPI", address: "Home · Uppal Kalan, Telangana · 500039" },
  { id: "#STR1957", date: "Ordered on 12 Jun", status: "Delivered", items: [{ name: "Bacca Bucci Street Force", note: "UK 8", price: 1999 }], total: 1999, payment: "Card", address: "Home · Uppal Kalan, Telangana · 500039" },
  { id: "#STR1941", date: "Ordered on 2 Jun", status: "Processing", items: [{ name: "Liberty Force 10", note: "UK 7", price: 1299 }], total: 1299, payment: "COD", address: "Work · HITEC City, Hyderabad · 500081" },
];

const INITIAL_NOTIFS = [
  { id: 1, title: "Your order is on its way", body: "Order #STR8354 left the Hyderabad hub", time: "2h ago", kind: "order", read: false },
  { id: 2, title: "Price drop on your wishlist", body: "Campus Oxy 2.0 is now ₹1,499", time: "5h ago", kind: "promo", read: false },
  { id: 3, title: "Order delivered", body: "Order #STR1957 was delivered", time: "1d ago", kind: "order", read: true },
  { id: 4, title: "Monsoon sale is live", body: "Up to 50% off trail & trekking shoes", time: "2d ago", kind: "promo", read: true },
];

const INITIAL_REVIEWS = {
  p1: [
    { id: "r1", name: "Anita R.", rating: 5, comment: "Super comfortable for daily wear, true to size.", date: "3 weeks ago" },
    { id: "r2", name: "Kiran M.", rating: 4, comment: "Good grip, a bit narrow near the toe box.", date: "1 month ago" },
  ],
  p8: [{ id: "r3", name: "Deepak S.", rating: 5, comment: "Best runner I've used under 4k. Very light.", date: "2 weeks ago" }],
};

const FAQS = [
  { q: "How long does delivery take?", a: "Most pincodes across India receive orders in 3-6 business days. Metro cities are usually faster, in 2-4 days." },
  { q: "Can I return or exchange a pair?", a: "Yes — unworn pairs in original packaging can be returned or exchanged within 7 days of delivery, free of cost." },
  { q: "Is Cash on Delivery available?", a: "COD is available on orders under ₹5,000 for most serviceable pincodes." },
  { q: "How do I track my order?", a: "Open Orders from the bottom bar and tap any order to see live status and courier details." },
  { q: "Are the sizes true to standard?", a: "We list UK/India sizing. If you're between sizes, we recommend sizing up for a relaxed fit." },
];

const CHAT_QUICK_REPLIES = ["Track my order", "Returns & exchanges", "Payment options", "Sizing help", "Talk to a human"];

function botReply(text, context) {
  const t = text.toLowerCase();
  if (t.includes("track") || (t.includes("order") && !t.includes("payment"))) {
    return context.lastOrderId
      ? `Your most recent order is ${context.lastOrderId}. Open the Orders tab and tap it to see live status and courier updates.`
      : "You don't have any orders yet — once you place one, you can track it any time from the Orders tab.";
  }
  if (t.includes("return") || t.includes("exchange") || t.includes("refund")) {
    return "Unworn pairs in original packaging can be returned or exchanged free within 7 days of delivery. Start it from Orders → select the order → 'Need help with this order?'.";
  }
  if (t.includes("payment") || t.includes("upi") || t.includes("card") || t.includes("cod")) {
    return "We accept UPI, Card, Cash on Delivery (for orders under ₹5,000), and STRYDE Wallet points at checkout.";
  }
  if (t.includes("size") || t.includes("fit")) {
    return "If you're between sizes, we recommend sizing up. Extended sizes (UK 6, 7, 10, 11) carry a small surcharge shown right on the size selector on the product page.";
  }
  if (t.includes("deliver") || t.includes("pincode") || t.includes("ship") || t.includes("when will")) {
    return "Enter your pincode on any product page under 'Check delivery to your pincode' for an estimated delivery window — usually 3-6 business days pan-India.";
  }
  if (t.includes("cancel")) {
    return "You can cancel an order before it ships from Orders → select the order → Need help. Once shipped, use a return instead.";
  }
  if (t.includes("human") || t.includes("agent") || t.includes("person")) {
    return "Connecting you to a support agent — for this demo, try Help & Support → Call us or Email, or reach us at help@stryde.in.";
  }
  if (t.includes("hi") || t.includes("hello") || t.includes("hey")) {
    return "Hey there! Ask me about orders, sizing, returns, or payments any time.";
  }
  if (t.includes("thank")) {
    return "Anytime! Happy to help if anything else comes up.";
  }
  return "I don't have a canned answer for that yet, but our support team can help — try 'Talk to a human', or email help@stryde.in.";
}

const ONBOARD_SLIDES = [
  { title: "Fresh drops, every week", desc: "Running, trail, court and casual sneakers from Indian and global brands, curated for you.", sole: "orange", body: "white", variant: "runner" },
  { title: "Pan-India delivery", desc: "From Kashmir to Kanyakumari — track your order from our hub straight to your doorstep.", sole: "sky", body: "white", variant: "court" },
  { title: "Built for the outdoors", desc: "Trail-ready grip and weatherproof builds for treks, hikes and monsoon commutes.", sole: "amber", body: "stone", variant: "trail" },
  { title: "7-day easy returns", desc: "Didn't fit right? Free returns and exchanges, no questions asked.", sole: "emerald", body: "lime", variant: "court" },
];

const INITIAL_ADDRESSES = [
  { id: "a1", label: "Home", name: "Salung Prompo", phone: "+91 98765 43210", line1: "Flat 302, Sri Sai Residency, Uppal Kalan", city: "Hyderabad", state: "Telangana", pincode: "500039", isDefault: true },
  { id: "a2", label: "Work", name: "Salung Prompo", phone: "+91 98765 43210", line1: "4th Floor, Cyber Towers, HITEC City", city: "Hyderabad", state: "Telangana", pincode: "500081", isDefault: false },
];

const EMPTY_PROFILE = { name: "", email: "", phone: "", city: "" };
const DEMO_PROFILE = { name: "Salung Prompo", email: "salung.prompo@email.com", phone: "+91 98765 43210", city: "Uppal Kalan, Telangana" };

function welcomeNotif() {
  return [{ id: Date.now(), title: "Welcome to STRYDE!", body: "You've earned 50 welcome wallet points. Explore new drops to get started.", time: "Just now", kind: "promo", read: false }];
}

const SOLE = {
  orange: "text-marigold-500", emerald: "text-emerald-600", sky: "text-sky-500", amber: "text-amber-500",
  rose: "text-rose-500", teal: "text-teal-500", violet: "text-violet-500", indigo: "text-indigo-500", slate: "text-slate-500",
};
const BODY = {
  stone: "text-stone-300", lime: "text-lime-300", white: "text-stone-200", slate: "text-slate-300", cream: "text-amber-50",
};

function formatINR(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}
function firstNameOf(name) {
  return (name || "there").split(" ")[0];
}
function initialsOf(name) {
  const clean = (name || "ST").trim();
  return clean.split(" ").filter(Boolean).map((n) => n[0]).slice(0, 2).join("").toUpperCase() || "ST";
}
function referralCodeFor(profile) {
  const base = (profile.name || "STRYDE") + (profile.email || "");
  let hash = 0;
  for (let i = 0; i < base.length; i++) hash = (hash * 31 + base.charCodeAt(i)) >>> 0;
  return `STRYDE-${initialsOf(profile.name)}${(hash % 9000 + 1000)}`;
}

/* --------------------------- Shared UI atoms ---------------------------- */

function ShoeIcon({ sole = "emerald", body = "stone", variant = "court", className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 120 80" className={className}>
      <path d="M8 52 C8 40 18 34 30 33 L46 31 C54 24 66 20 78 22 L96 26 C106 28 112 36 112 46 L112 58 C112 63 108 66 103 66 L14 66 C10 66 8 63 8 58 Z"
        className={BODY[body]} fill="currentColor" />
      <path d="M8 58 L112 58 L112 66 C112 68 110 70 108 70 L12 70 C10 70 8 68 8 66 Z"
        className={SOLE[sole]} fill="currentColor" />
      <path d="M46 31 C54 24 66 20 78 22 L96 26 C102 27.5 106 31 109 36 L60 40 Z" fill="currentColor" className="text-stone-900 opacity-10" />
      {variant === "trail" && (
        <g className={SOLE[sole]} fill="currentColor" opacity="0.55">
          <rect x="14" y="60" width="4" height="6" rx="1" />
          <rect x="24" y="61.5" width="4" height="6" rx="1" />
          <rect x="34" y="62.5" width="4" height="6" rx="1" />
          <rect x="44" y="63" width="4" height="6" rx="1" />
          <rect x="54" y="63" width="4" height="6" rx="1" />
        </g>
      )}
      {variant === "runner" && (
        <path d="M50 30 L88 24 L92 29 L54 36 Z" fill="currentColor" className="text-white opacity-60" />
      )}
    </svg>
  );
}

function StampTag({ children, tone = "marigold" }) {
  const map = {
    marigold: "bg-marigold-500 text-ink-900",
    ink: "bg-ink-900 text-paper",
    rose: "bg-rose-500 text-white",
    emerald: "bg-emerald-600 text-white",
  };
  return (
    <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md -rotate-2 shadow-stamp ${map[tone]}`}>
      {children}
    </span>
  );
}

function StatusBadge({ status }) {
  const map = {
    Shipped: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    Delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    Processing: "bg-marigold-100 text-marigold-700 dark:bg-marigold-500/20 dark:text-marigold-300",
    Cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  };
  return <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${map[status]}`}>{status}</span>;
}

function TopBar({ title, onBack, right, eyebrow }) {
  return (
    <div className="flex items-center justify-between px-5 pt-4 pb-3">
      <div className="flex items-center gap-3 min-w-0">
        {onBack && (
          <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 dark:bg-ink-700 active:scale-95 shrink-0">
            <ChevronLeft size={18} className="text-stone-700 dark:text-paper" />
          </button>
        )}
        <div className="min-w-0">
          {eyebrow && <p className="text-[10px] font-bold uppercase tracking-wider text-marigold-600 dark:text-marigold-400">{eyebrow}</p>}
          <h1 className="text-lg font-display tracking-wide text-stone-900 dark:text-paper truncate">{title}</h1>
        </div>
      </div>
      {right}
    </div>
  );
}

function PillButton({ children, onClick, variant = "primary", className = "", disabled, type = "button" }) {
  const base = "px-4 py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition";
  const styles = {
    primary: "bg-marigold-500 text-ink-900",
    dark: "bg-ink-900 text-paper",
    outline: "bg-white dark:bg-ink-700 text-ink-900 dark:text-paper border border-ink-900 dark:border-stone-500",
    ghost: "bg-stone-100 dark:bg-ink-700 text-stone-700 dark:text-paper",
    danger: "bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300",
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${styles[variant]} ${disabled ? "opacity-40" : ""} ${className}`}>
      {children}
    </button>
  );
}

function TextField({ label, value, onChange, type = "text", error, placeholder }) {
  return (
    <label className="block mb-3">
      <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-1">{label}</p>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-stone-100 dark:bg-ink-700 rounded-2xl px-4 py-3 text-sm outline-none text-stone-800 dark:text-paper placeholder:text-stone-400 border ${error ? "border-rose-400" : "border-transparent"}`}
      />
      {error && <p className="text-[11px] text-rose-500 mt-1">{error}</p>}
    </label>
  );
}

function StarRating({ value, size = 13 }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= Math.round(value) ? "fill-marigold-500 text-marigold-500" : "text-stone-200 dark:text-stone-600"} />
      ))}
    </span>
  );
}

function SectionHeading({ eyebrow, title, action, onAction }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div>
        {eyebrow && <p className="text-[10px] font-bold uppercase tracking-wider text-marigold-600 dark:text-marigold-400 mb-0.5">{eyebrow}</p>}
        <h2 className="text-sm font-semibold text-stone-900 dark:text-paper">{title}</h2>
      </div>
      {action && (
        <button onClick={onAction} className="text-xs font-medium text-marigold-600 dark:text-marigold-400">{action}</button>
      )}
    </div>
  );
}

function ProductPhoto({ product, className = "w-full h-full object-cover" }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-24 h-16"><ShoeIcon sole={product.sole} body={product.body} variant={product.variant} /></div>
      </div>
    );
  }
  return (
    <img
      src={product.image}
      alt={product.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function ProductCard({ product, onOpen, isWishlisted, onToggleWishlist, onQuickAdd }) {
  const hasSizeRange = sizeSurcharge(product.sizes[0]) !== 0 || sizeSurcharge(product.sizes[product.sizes.length - 1]) !== 0;
  return (
    <div className="bg-white dark:bg-ink-700 rounded-2xl border border-stone-100 dark:border-ink-800 p-3 flex flex-col">
      <div className="relative bg-stone-50 dark:bg-ink-900/40 rounded-xl aspect-square mb-2 overflow-hidden">
        {product.tag && (
          <span className="absolute top-2 left-2 z-10">
            <StampTag tone={product.tag === "Sale" ? "rose" : product.tag === "Bestseller" ? "ink" : "marigold"}>{product.tag}</StampTag>
          </span>
        )}
        <button onClick={() => onToggleWishlist(product.id)} aria-label="Toggle wishlist" className="absolute top-2 right-2 z-10 w-7 h-7 bg-white dark:bg-ink-800 rounded-full shadow-sm flex items-center justify-center">
          <Heart size={14} className={isWishlisted ? "fill-rose-500 text-rose-500" : "text-stone-400"} />
        </button>
        <button onClick={() => onOpen(product)} className="w-full h-full block">
          <ProductPhoto product={product} />
        </button>
        {onQuickAdd && (
          <button onClick={() => onQuickAdd(product)} aria-label="Quick add to cart"
            className="absolute bottom-2 right-2 z-10 w-8 h-8 bg-ink-900 text-white rounded-full shadow-sm flex items-center justify-center active:scale-90">
            <Plus size={15} />
          </button>
        )}
      </div>
      <p className="text-xs text-stone-400">{product.brand}</p>
      <button onClick={() => onOpen(product)} className="text-left">
        <p className="text-sm font-medium text-stone-900 dark:text-paper leading-snug line-clamp-2 mb-1">{product.name}</p>
      </button>
      <div className="flex items-center gap-1 mb-1">
        <StarRating value={product.rating} size={11} />
        <span className="text-[10px] text-stone-400">({product.reviews})</span>
      </div>
      <div className="flex items-center gap-2 mt-auto">
        <span className="font-mono text-sm font-semibold text-stone-900 dark:text-paper">
          {hasSizeRange && <span className="text-[10px] font-sans font-normal text-stone-400 mr-0.5">from</span>}
          {formatINR(product.price)}
        </span>
        {product.oldPrice && <span className="font-mono text-xs text-stone-400 line-through">{formatINR(product.oldPrice)}</span>}
      </div>
    </div>
  );
}

/* ------------------------------- Main App -------------------------------- */

export default function App() {
  const [stage, setStage] = useState("splash");
  const [onboardIdx, setOnboardIdx] = useState(0);
  const [authMode, setAuthMode] = useState("login");
  const [authChannel, setAuthChannel] = useState("email");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "", phone: "", otp: "" });
  const [authErrors, setAuthErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);

  const [dark, setDark] = useState(false);
  const [tab, setTab] = useState("home");
  const [view, setView] = useState({ type: "main" });
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState({});
  const [savedForLater, setSavedForLater] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({ sort: "popular", brands: new Set(), maxPrice: 5000 });
  const [appliedCode, setAppliedCode] = useState(null);
  const [codeInput, setCodeInput] = useState("");
  const [giftWrap, setGiftWrap] = useState(false);
  const [useWallet, setUseWallet] = useState(false);
  const [toast, setToast] = useState(null);
  const [orders, setOrders] = useState([]);
  const [notifs, setNotifs] = useState([]);
  const [notifPrefs, setNotifPrefs] = useState({ orders: true, promos: true });
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [checkoutPayment, setCheckoutPayment] = useState("UPI");
  const [checkoutNotes, setCheckoutNotes] = useState("");
  const [lastOrder, setLastOrder] = useState(null);
  const [walletPoints, setWalletPoints] = useState(0);
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [editProfile, setEditProfile] = useState(EMPTY_PROFILE);
  const [heroIdx, setHeroIdx] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "Hey! I'm the STRYDE assistant. Ask me about orders, sizing, returns or payments — or tap a quick reply below." },
  ]);

  // A brand-new account always starts empty — no orders, no cart, no history.
  const startFreshAccount = (profileOverride) => {
    setCart({}); setSavedForLater([]); setWishlist(new Set()); setOrders([]);
    setAddresses([]); setSelectedAddressId(null); setWalletPoints(50);
    setNotifs(welcomeNotif()); setRecentlyViewed([]); setAppliedCode(null);
    setProfile(profileOverride); setEditProfile(profileOverride);
  };

  // The explicit "demo account" / guest-preview path loads populated sample data so
  // people can see every screen fully stocked without placing real orders first.
  const startDemoAccount = () => {
    setCart({ p2: { qty: 1, size: 9, unitPrice: priceForSize(PRODUCTS.find((p) => p.id === "p2"), 9) }, p8: { qty: 1, size: 9, unitPrice: priceForSize(PRODUCTS.find((p) => p.id === "p8"), 9) } });
    setSavedForLater([]); setWishlist(new Set(["p1", "p9"])); setOrders(INITIAL_ORDERS);
    setAddresses(INITIAL_ADDRESSES); setSelectedAddressId("a1"); setWalletPoints(240);
    setNotifs(INITIAL_NOTIFS); setRecentlyViewed([]); setAppliedCode(null);
    setProfile(DEMO_PROFILE); setEditProfile(DEMO_PROFILE);
  };

  useEffect(() => {
    if (stage !== "splash") return;
    const t = setTimeout(() => setStage("onboarding"), 1700);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % 3), 4200);
    return () => clearInterval(t);
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 1800); };

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const addToCart = (id, size = 9, qty = 1, silent = false) => {
    const product = PRODUCTS.find((p) => p.id === id);
    const unitPrice = product ? priceForSize(product, size) : 0;
    setCart((prev) => ({ ...prev, [id]: { qty: (prev[id]?.qty || 0) + qty, size, unitPrice } }));
    setSavedForLater((prev) => prev.filter((pid) => pid !== id));
    if (!silent) showToast(`Added to cart · UK ${size} · ${formatINR(unitPrice)}`);
  };
  const setQty = (id, qty) => {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = { ...next[id], qty };
      return next;
    });
  };
  const removeFromCart = (id) => setQty(id, 0);
  const saveForLater = (id) => {
    setSavedForLater((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setCart((prev) => { const n = { ...prev }; delete n[id]; return n; });
  };
  const moveToCart = (id) => {
    setSavedForLater((prev) => prev.filter((pid) => pid !== id));
    addToCart(id, 9, 1);
  };

  const cartItems = useMemo(
    () => Object.entries(cart).map(([id, meta]) => {
      const product = PRODUCTS.find((p) => p.id === id);
      const unitPrice = meta.unitPrice ?? priceForSize(product, meta.size);
      return { ...product, qty: meta.qty, size: meta.size, price: unitPrice };
    }),
    [cart]
  );
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const discountPct = appliedCode === "DROP15" ? 0.15 : appliedCode === "FIRST50" ? 0.5 : 0;
  const discountFlat = (appliedCode === "FEST200" && subtotal >= 2500 ? 200 : 0) + (appliedCode === "WALLET100" ? 100 : 0);
  const discountAmt = Math.round(subtotal * discountPct) + discountFlat;
  const walletRedeemable = Math.min(walletPoints, Math.round(subtotal * 0.1));
  const walletDiscount = useWallet ? walletRedeemable : 0;
  const shipping = appliedCode === "FREESHIP" || subtotal === 0 || subtotal > 1999 ? 0 : 79;
  const giftWrapFee = giftWrap ? 29 : 0;
  const total = Math.max(0, subtotal - discountAmt - walletDiscount) + shipping + giftWrapFee;
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(search.toLowerCase()) && (category === "All" || p.category === category)
    );
    if (filters.brands.size > 0) list = list.filter((p) => filters.brands.has(p.brand));
    list = list.filter((p) => p.price <= filters.maxPrice);
    if (filters.sort === "priceLow") list = [...list].sort((a, b) => a.price - b.price);
    if (filters.sort === "priceHigh") list = [...list].sort((a, b) => b.price - a.price);
    if (filters.sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (filters.sort === "popular") list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [search, category, filters]);

  const trendingProducts = useMemo(() => [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 4), []);
  const newDrops = useMemo(() => PRODUCTS.filter((p) => p.tag === "New Drop"), []);
  const recentlyViewedProducts = useMemo(
    () => recentlyViewed.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean),
    [recentlyViewed]
  );

  const quickAdd = (product) => {
    const defaultSize = product.sizes[Math.floor(product.sizes.length / 2)];
    addToCart(product.id, defaultSize, 1);
  };

  const openProduct = (p) => {
    setRecentlyViewed((prev) => [p.id, ...prev.filter((id) => id !== p.id)].slice(0, 8));
    setView({ type: "detail", product: p });
  };

  const applyCode = () => {
    const found = DISCOUNTS.find((d) => d.code === codeInput.trim().toUpperCase());
    if (found) { setAppliedCode(found.code); showToast(`${found.code} applied`); }
    else showToast("Invalid code");
  };

  const runSearch = (term) => {
    setSearch(term);
    setShowSearchOverlay(false);
    if (term.trim()) setRecentSearches((prev) => [term, ...prev.filter((s) => s !== term)].slice(0, 6));
  };

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const placeOrder = () => {
    if (cartItems.length === 0) return;
    const id = "#STR" + Math.floor(1000 + Math.random() * 8999);
    const order = {
      id, date: "Ordered just now", status: "Processing",
      items: cartItems.map((i) => ({ productId: i.id, name: i.name, note: `UK ${i.size}`, size: i.size, price: i.price })),
      total, payment: checkoutPayment, deliveryNotes: checkoutNotes,
      address: selectedAddress ? `${selectedAddress.label} · ${selectedAddress.city}, ${selectedAddress.state} · ${selectedAddress.pincode}` : "No address on file",
    };
    setOrders((prev) => [order, ...prev]);
    setLastOrder(order);
    if (useWallet) setWalletPoints((p) => Math.max(0, p - walletDiscount));
    setWalletPoints((p) => p + Math.round(subtotal * 0.02));
    setCart({});
    setAppliedCode(null);
    setGiftWrap(false);
    setUseWallet(false);
    setCheckoutNotes("");
    setView({ type: "orderConfirm" });
  };

  const addReview = (productId, review) => {
    setReviews((prev) => ({ ...prev, [productId]: [{ ...review, id: "r" + Date.now(), date: "Just now" }, ...(prev[productId] || [])] }));
    showToast("Thanks for your review!");
  };

  const addAddress = (addr) => {
    const id = "a" + Date.now();
    setAddresses((prev) => [...prev, { ...addr, id, isDefault: prev.length === 0 }]);
    setSelectedAddressId(id);
    showToast("Address saved");
  };
  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedAddressId === id) setSelectedAddressId((addresses[0]?.id) || null);
  };
  const setDefaultAddress = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    showToast("Default address updated");
  };

  const sendChatMessage = (text) => {
    if (!text.trim()) return;
    setChatMessages((prev) => [...prev, { from: "user", text }]);
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { from: "bot", text: botReply(text, { lastOrderId: orders[0]?.id }) }]);
    }, 500);
  };

  const reorderOrder = (order) => {
    let added = 0;
    order.items.forEach((it) => {
      const product = it.productId ? PRODUCTS.find((p) => p.id === it.productId) : PRODUCTS.find((p) => p.name === it.name);
      if (product) {
        const size = it.size || product.sizes[Math.floor(product.sizes.length / 2)];
        addToCart(product.id, size, 1, true);
        added++;
      }
    });
    if (added > 0) { setTab("cart"); setView({ type: "main" }); showToast(`${added} item${added > 1 ? "s" : ""} from ${order.id} added to cart`); }
    else showToast("Those items are no longer available");
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" } : o)));
    showToast(`Order ${orderId} cancelled`);
    setView({ type: "main" });
  };

  const moveAllWishlistToCart = () => {
    const items = PRODUCTS.filter((p) => wishlist.has(p.id));
    items.forEach((p) => addToCart(p.id, p.sizes[Math.floor(p.sizes.length / 2)], 1, true));
    setWishlist(new Set());
    showToast(`${items.length} item${items.length > 1 ? "s" : ""} moved to cart`);
  };

  const redeemWalletForCoupon = () => {
    if (walletPoints < 100) { showToast("You need at least 100 points"); return; }
    setWalletPoints((p) => p - 100);
    setAppliedCode("WALLET100");
    showToast("₹100 coupon applied to your cart");
    setTab("cart");
    setView({ type: "main" });
  };

  const markNotifRead = (id) => setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const unreadCount = notifs.filter((n) => !n.read).length;

  const validateAuth = () => {
    const errs = {};
    if (authMode === "signup" && !authForm.name.trim()) errs.name = "Enter your name";
    if (authChannel === "email") {
      if (!/^\S+@\S+\.\S+$/.test(authForm.email)) errs.email = "Enter a valid email";
      if (authForm.password.length < 4) errs.password = "At least 4 characters";
    } else {
      if (!/^\d{10}$/.test(authForm.phone.replace(/\D/g, ""))) errs.phone = "Enter a valid 10-digit number";
      if (authForm.otp.length < 4) errs.otp = "Enter the 4-digit OTP (try 1234)";
    }
    setAuthErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const completeAuth = () => {
    if (!validateAuth()) return;
    const name = authMode === "signup" ? authForm.name : (authForm.email.split("@")[0] || "STRYDE Member");
    const email = authForm.email || (authForm.phone ? `${authForm.phone}@stryde.in` : "");
    const phone = authForm.phone ? `+91 ${authForm.phone}` : "";
    startFreshAccount({ name: name || "STRYDE Member", email, phone, city: "" });
    setStage("main");
    showToast(authMode === "signup" ? "Account created — welcome to STRYDE!" : "Welcome back");
  };

  const sendOtp = () => {
    if (!/^\d{10}$/.test(authForm.phone.replace(/\D/g, ""))) {
      setAuthErrors((e) => ({ ...e, phone: "Enter a valid 10-digit number" }));
      return;
    }
    setOtpSent(true);
    showToast("OTP sent to your phone");
  };

  const demoLogin = () => {
    startDemoAccount();
    setAuthErrors({});
    setStage("main");
    showToast("Loaded the demo account — full order history included");
  };

  const logout = () => {
    setStage("auth");
    setAuthMode("login");
    setAuthForm({ name: "", email: "", password: "", phone: "", otp: "" });
    setAuthErrors({});
    setOtpSent(false);
    setTab("home");
    setView({ type: "main" });
  };

  const navItems = [
    { key: "home", icon: Home, label: "Home" },
    { key: "orders", icon: Package, label: "Orders" },
    { key: "cart", icon: ShoppingBag, label: "Cart" },
    { key: "discount", icon: Tag, label: "Offers" },
    { key: "notifications", icon: Bell, label: "Alerts" },
  ];

  const showNav = stage === "main" && ["main"].includes(view.type);

  return (
    <div className={dark ? "dark" : ""}>
    <div className="w-full flex items-center justify-center sm:py-6 bg-stone-100 dark:bg-ink-900 min-h-[100dvh] font-sans">
      <div className="w-full h-[100dvh] sm:w-[380px] sm:h-[780px] sm:max-h-[92vh] bg-paper dark:bg-ink sm:rounded-[2.5rem] sm:border-8 border-ink-900 sm:shadow-xl overflow-hidden flex flex-col relative">

        <div className="hidden sm:flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-medium text-stone-900 dark:text-paper shrink-0 relative">
          <span>9:41</span>
          <div className="w-20 h-4 bg-ink-900 rounded-full absolute left-1/2 -translate-x-1/2 top-2" />
          <span>100%</span>
        </div>
        <div className="sm:hidden pt-[env(safe-area-inset-top)] shrink-0" />

        {toast && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-ink-900 text-paper text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <Check size={14} /> {toast}
          </div>
        )}

        {showSearchOverlay && (
          <SearchOverlay
            recent={recentSearches}
            onClear={() => setRecentSearches([])}
            onSearch={runSearch}
            onClose={() => setShowSearchOverlay(false)}
          />
        )}

        {showFilter && (
          <FilterSheet
            filters={filters} setFilters={setFilters}
            onClose={() => setShowFilter(false)}
          />
        )}

        {showChat && (
          <ChatBot messages={chatMessages} onSend={sendChatMessage} onClose={() => setShowChat(false)} />
        )}

        <div className="flex-1 overflow-y-auto pb-4 no-scrollbar">
          {stage === "splash" && <SplashScreen onSkip={() => setStage("onboarding")} />}

          {stage === "onboarding" && (
            <OnboardingScreen idx={onboardIdx} setIdx={setOnboardIdx} onDone={() => setStage("auth")} />
          )}

          {stage === "auth" && (
            <AuthScreen
              mode={authMode} setMode={setAuthMode}
              channel={authChannel} setChannel={setAuthChannel}
              form={authForm} setForm={setAuthForm}
              errors={authErrors} setErrors={setAuthErrors}
              onSubmit={completeAuth}
              onGuest={() => { startFreshAccount({ name: "Guest", email: "", phone: "", city: "" }); setStage("main"); showToast("Continuing as guest"); }}
              onDemo={demoLogin}
              showToast={showToast}
              otpSent={otpSent}
              onSendOtp={sendOtp}
            />
          )}

          {stage === "main" && view.type === "detail" && (
            <ProductDetail
              product={view.product}
              reviews={reviews[view.product.id] || []}
              allProducts={PRODUCTS}
              onBack={() => setView({ type: "main" })}
              onAdd={addToCart}
              onBuyNow={(id, size, qty) => { addToCart(id, size, qty); setTab("cart"); setView({ type: "checkout" }); }}
              isWishlisted={wishlist.has(view.product.id)}
              onToggleWishlist={toggleWishlist}
              onAddReview={addReview}
              onOpenProduct={openProduct}
              profileName={profile.name}
              showToast={showToast}
            />
          )}

          {stage === "main" && view.type === "profile" && (
            <ProfileScreen
              editProfile={editProfile}
              setEditProfile={setEditProfile}
              onSave={() => { setProfile(editProfile); showToast("Profile saved"); setView({ type: "main" }); }}
              onBack={() => { setEditProfile(profile); setView({ type: "main" }); }}
              ordersCount={orders.length}
              wishlistCount={wishlist.size}
              walletPoints={walletPoints}
              dark={dark} setDark={setDark}
              onOpenOrders={() => { setTab("orders"); setView({ type: "main" }); }}
              onOpenWishlist={() => setView({ type: "wishlist" })}
              onOpenAddresses={() => setView({ type: "addressBook" })}
              onOpenWallet={() => setView({ type: "wallet" })}
              onOpenHelp={() => setView({ type: "help" })}
              onLogout={logout}
              showToast={showToast}
            />
          )}

          {stage === "main" && view.type === "wishlist" && (
            <WishlistScreen
              products={PRODUCTS.filter((p) => wishlist.has(p.id))}
              onBack={() => setView({ type: "main" })}
              onRemove={toggleWishlist}
              onAdd={addToCart}
              onOpen={openProduct}
              onMoveAll={moveAllWishlistToCart}
            />
          )}

          {stage === "main" && view.type === "addressBook" && (
            <AddressBookScreen
              addresses={addresses}
              selectedId={selectedAddressId}
              onSelect={setSelectedAddressId}
              onAdd={addAddress}
              onDelete={deleteAddress}
              onSetDefault={setDefaultAddress}
              onBack={() => setView({ type: "profile" })}
            />
          )}

          {stage === "main" && view.type === "wallet" && (
            <WalletScreen points={walletPoints} onBack={() => setView({ type: "profile" })} profile={profile} showToast={showToast} onRedeemCoupon={redeemWalletForCoupon} />
          )}

          {stage === "main" && view.type === "help" && (
            <HelpScreen onBack={() => setView({ type: "profile" })} showToast={showToast} onOpenChat={() => setShowChat(true)} />
          )}

          {stage === "main" && view.type === "checkout" && (
            <CheckoutScreen
              items={cartItems} subtotal={subtotal} discountAmt={discountAmt} shipping={shipping} total={total}
              giftWrap={giftWrap} giftWrapFee={giftWrapFee} walletDiscount={walletDiscount} walletBalance={walletPoints}
              addresses={addresses} selectedAddress={selectedAddress} onSelectAddress={setSelectedAddressId}
              payment={checkoutPayment} setPayment={setCheckoutPayment}
              notes={checkoutNotes} setNotes={setCheckoutNotes}
              onBack={() => setView({ type: "main" })}
              onManageAddresses={() => setView({ type: "addressBook" })}
              onPlaceOrder={placeOrder}
            />
          )}

          {stage === "main" && view.type === "orderConfirm" && (
            <OrderConfirmScreen
              order={lastOrder}
              onViewOrder={() => { setTab("orders"); setView({ type: "main" }); }}
              onContinue={() => { setTab("home"); setView({ type: "main" }); }}
            />
          )}

          {stage === "main" && view.type === "orderDetail" && (
            <OrderDetailScreen order={view.order} onBack={() => setView({ type: "main" })} showToast={showToast} onOpenChat={() => setShowChat(true)} onReorder={reorderOrder} onCancel={cancelOrder} />
          )}

          {stage === "main" && view.type === "main" && tab === "home" && (
            <HomeScreen
              profile={profile}
              heroIdx={heroIdx} setHeroIdx={setHeroIdx}
              search={search}
              onOpenSearch={() => setShowSearchOverlay(true)}
              category={category} setCategory={setCategory}
              products={filteredProducts}
              trending={trendingProducts}
              newDrops={newDrops}
              recentlyViewed={recentlyViewedProducts}
              onOpen={openProduct}
              onQuickAdd={quickAdd}
              wishlist={wishlist} onToggleWishlist={toggleWishlist}
              onOpenProfile={() => setView({ type: "profile" })}
              unreadCount={unreadCount}
              onOpenNotifs={() => setTab("notifications")}
              onOpenFilter={() => setShowFilter(true)}
              activeFilterCount={filters.brands.size + (filters.maxPrice < 5000 ? 1 : 0) + (filters.sort !== "popular" ? 1 : 0)}
            />
          )}

          {stage === "main" && view.type === "main" && tab === "cart" && (
            <CartScreen
              items={cartItems} setQty={setQty} onRemove={removeFromCart} onSave={saveForLater}
              savedItems={PRODUCTS.filter((p) => savedForLater.includes(p.id))} onMoveToCart={moveToCart}
              codeInput={codeInput} setCodeInput={setCodeInput} applyCode={applyCode}
              appliedCode={appliedCode} subtotal={subtotal} discountAmt={discountAmt} shipping={shipping} total={total}
              giftWrap={giftWrap} setGiftWrap={setGiftWrap}
              walletPoints={walletPoints} walletRedeemable={walletRedeemable} useWallet={useWallet} setUseWallet={setUseWallet}
              onCheckout={() => setView({ type: "checkout" })}
              onShop={() => setTab("home")}
            />
          )}

          {stage === "main" && view.type === "main" && tab === "orders" && (
            <OrdersScreen orders={orders} onOpen={(o) => setView({ type: "orderDetail", order: o })} onShop={() => setTab("home")} onReorder={reorderOrder} />
          )}

          {stage === "main" && view.type === "main" && tab === "discount" && (
            <DiscountScreen appliedCode={appliedCode} onApply={(c) => { setAppliedCode(c); showToast(`${c} applied`); setTab("cart"); }} />
          )}

          {stage === "main" && view.type === "main" && tab === "notifications" && (
            <NotificationsScreen notifs={notifs} onRead={markNotifRead} onMarkAll={markAllRead} prefs={notifPrefs} setPrefs={setNotifPrefs} />
          )}
        </div>

        {showNav && !showChat && (
          <button onClick={() => setShowChat(true)} aria-label="Chat with STRYDE assistant"
            className="absolute right-4 bottom-20 z-30 w-12 h-12 rounded-full bg-marigold-500 text-ink-900 shadow-lg flex items-center justify-center active:scale-95">
            <MessageCircle size={20} />
          </button>
        )}

        {showNav && (
          <div className="shrink-0 border-t border-stone-100 dark:border-ink-700 bg-white dark:bg-ink-800 px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center justify-between">
            {navItems.map(({ key, icon: Icon, label }) => {
              const active = tab === key;
              return (
                <button key={key} onClick={() => setTab(key)} className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl">
                  {active && <span className="absolute inset-0 bg-marigold-50 dark:bg-marigold-500/10 rounded-2xl" />}
                  <span className="relative">
                    <Icon size={20} className={active ? "text-marigold-600 dark:text-marigold-400" : "text-stone-400"} />
                    {key === "cart" && cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                    {key === "notifications" && unreadCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </span>
                  <span className={`relative text-[10px] font-medium ${active ? "text-marigold-700 dark:text-marigold-400" : "text-stone-400"}`}>{label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

/* ------------------------------- Splash / Onboarding / Auth ------------------------------- */

function SplashScreen({ onSkip }) {
  return (
    <button onClick={onSkip} className="w-full h-full min-h-[600px] flex flex-col items-center justify-center gap-4 bg-ink-900 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-marigold-500/20" />
      <div className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full bg-marigold-500/10" />
      <div className="w-20 h-20 rounded-3xl bg-marigold-500 flex items-center justify-center rotate-3 shadow-stamp relative z-10">
        <div className="w-12 h-8"><ShoeIcon sole="indigo" body="white" variant="runner" /></div>
      </div>
      <p className="text-paper text-3xl font-display tracking-widest relative z-10">STRYDE</p>
      <p className="text-paper/60 text-xs relative z-10">India's drop-culture sneaker store</p>
      <div className="flex gap-1.5 mt-6 relative z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-marigold-500" />
      </div>
    </button>
  );
}

function OnboardingScreen({ idx, setIdx, onDone }) {
  const slide = ONBOARD_SLIDES[idx];
  const isLast = idx === ONBOARD_SLIDES.length - 1;
  return (
    <div className="h-full flex flex-col px-6 pt-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-marigold-600">0{idx + 1} / 0{ONBOARD_SLIDES.length}</span>
        <button onClick={onDone} className="text-xs font-medium text-stone-400">Skip</button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-48 h-32 bg-stone-50 rounded-2xl flex items-center justify-center mb-8 border-2 border-dashed border-stone-200">
          <div className="w-28 h-20"><ShoeIcon sole={slide.sole} body={slide.body} variant={slide.variant} /></div>
        </div>
        <h2 className="text-2xl font-display tracking-wide text-stone-900 mb-2">{slide.title}</h2>
        <p className="text-sm text-stone-500 leading-relaxed w-64">{slide.desc}</p>
      </div>
      <div className="flex justify-center gap-1.5 mb-6">
        {ONBOARD_SLIDES.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-marigold-500" : "w-1.5 bg-stone-200"}`} />
        ))}
      </div>
      <PillButton className="w-full mb-8" onClick={() => (isLast ? onDone() : setIdx(idx + 1))}>
        {isLast ? "Get started" : "Next"} <ChevronRight size={16} />
      </PillButton>
    </div>
  );
}

function AuthScreen({ mode, setMode, channel, setChannel, form, setForm, errors, setErrors, onSubmit, onGuest, onDemo, showToast, otpSent, onSendOtp }) {
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const switchChannel = (c) => { setChannel(c); setErrors({}); };
  const switchMode = (m) => { setMode(m); setErrors({}); };
  return (
    <div className="px-6 pt-8">
      <div className="w-14 h-14 rounded-2xl bg-ink-900 flex items-center justify-center mb-6 rotate-2">
        <div className="w-9 h-6"><ShoeIcon sole="orange" body="white" variant="runner" /></div>
      </div>
      <h1 className="text-2xl font-display tracking-wide text-stone-900 mb-1">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
      <p className="text-sm text-stone-500 mb-5">{mode === "login" ? "Log in to keep tracking your orders." : "Sign up to save your details and orders."}</p>

      <div className="flex gap-2 mb-4 bg-stone-100 p-1 rounded-2xl">
        <button onClick={() => switchChannel("email")} className={`flex-1 text-xs font-semibold py-2 rounded-xl ${channel === "email" ? "bg-white text-ink-900 shadow-sm" : "text-stone-400"}`}>Email</button>
        <button onClick={() => switchChannel("phone")} className={`flex-1 text-xs font-semibold py-2 rounded-xl ${channel === "phone" ? "bg-white text-ink-900 shadow-sm" : "text-stone-400"}`}>Phone (OTP)</button>
      </div>

      {mode === "signup" && <TextField label="Full name" value={form.name} onChange={set("name")} placeholder="Salung Prompo" error={errors.name} />}

      {channel === "email" ? (
        <>
          <TextField label="Email" value={form.email} onChange={set("email")} placeholder="you@email.com" error={errors.email} />
          <TextField label="Password" type="password" value={form.password} onChange={set("password")} placeholder="••••••••" error={errors.password} />
        </>
      ) : (
        <>
          <TextField label="Mobile number" value={form.phone} onChange={set("phone")} placeholder="98765 43210" error={errors.phone} />
          <div className="flex items-end gap-2">
            <div className="flex-1"><TextField label="OTP" value={form.otp} onChange={set("otp")} placeholder="4-digit code" error={errors.otp} /></div>
            <button onClick={onSendOtp} className="mb-3 text-xs font-semibold text-marigold-600 whitespace-nowrap px-3 py-3 rounded-2xl bg-marigold-50">
              {otpSent ? "Resend" : "Send OTP"}
            </button>
          </div>
          {otpSent && <p className="text-[11px] text-emerald-600 -mt-2 mb-3">OTP sent — for this demo, enter 1234.</p>}
        </>
      )}

      {mode === "login" && channel === "email" && (
        <button onClick={() => showToast("Password reset link sent to your email")} className="text-xs font-medium text-marigold-600 mb-4">
          Forgot password?
        </button>
      )}

      <PillButton className="w-full mb-3" onClick={onSubmit}>{mode === "login" ? "Log in" : "Sign up"}</PillButton>
      <PillButton variant="ghost" className="w-full mb-3" onClick={onGuest}>Continue as guest</PillButton>
      <button onClick={onDemo} className="w-full text-center text-xs font-medium text-stone-400 mb-6 underline underline-offset-2">
        Having trouble? Use a one-tap demo account
      </button>

      <p className="text-center text-xs text-stone-500">
        {mode === "login" ? "New here?" : "Already have an account?"}{" "}
        <button onClick={() => switchMode(mode === "login" ? "signup" : "login")} className="text-marigold-600 font-medium">
          {mode === "login" ? "Sign up" : "Log in"}
        </button>
      </p>
    </div>
  );
}

/* ------------------------------- Search / Filter overlays ------------------------------- */

function SearchOverlay({ recent, onClear, onSearch, onClose }) {
  const [q, setQ] = useState("");
  return (
    <div className="absolute inset-0 z-40 bg-paper flex flex-col">
      <div className="flex items-center gap-2 px-5 pt-4 pb-3">
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 shrink-0"><ChevronLeft size={18} /></button>
        <div className="flex-1 flex items-center gap-2 bg-stone-100 rounded-2xl px-4 py-3">
          <Search size={16} className="text-stone-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch(q)}
            placeholder="Search sneakers, brands..."
            className="bg-transparent text-sm outline-none flex-1 text-stone-800 placeholder:text-stone-400"
          />
        </div>
      </div>
      <div className="px-5 overflow-y-auto flex-1">
        {recent.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-stone-500">Recent searches</p>
              <button onClick={onClear} className="text-[11px] text-marigold-600 font-medium">Clear</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recent.map((r) => (
                <button key={r} onClick={() => onSearch(r)} className="text-xs px-3 py-1.5 rounded-full bg-stone-100 text-stone-600 flex items-center gap-1">
                  <Clock size={11} /> {r}
                </button>
              ))}
            </div>
          </div>
        )}
        <p className="text-xs font-semibold text-stone-500 mb-2">Trending searches</p>
        <div className="flex flex-col gap-1">
          {TRENDING_SEARCHES.map((t) => (
            <button key={t} onClick={() => onSearch(t)} className="flex items-center gap-2 text-left py-2.5 text-sm text-stone-700 border-b border-stone-100">
              <Sparkles size={14} className="text-marigold-500 shrink-0" /> {t}
            </button>
          ))}
        </div>
        <button onClick={() => onSearch(q)} className="w-full mt-4">
          <PillButton className="w-full" onClick={() => onSearch(q)} disabled={!q.trim()}>Search "{q || "..."}"</PillButton>
        </button>
      </div>
    </div>
  );
}

function FilterSheet({ filters, setFilters, onClose }) {
  const [local, setLocal] = useState(filters);
  const toggleBrand = (b) => {
    setLocal((f) => {
      const next = new Set(f.brands);
      next.has(b) ? next.delete(b) : next.add(b);
      return { ...f, brands: next };
    });
  };
  const sorts = [
    { key: "popular", label: "Popularity" },
    { key: "priceLow", label: "Price: Low to High" },
    { key: "priceHigh", label: "Price: High to Low" },
    { key: "rating", label: "Customer Rating" },
  ];
  return (
    <div className="absolute inset-0 z-40 bg-black/40 flex items-end">
      <div className="w-full bg-paper rounded-t-[2rem] max-h-[85%] flex flex-col">
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <h2 className="text-lg font-display tracking-wide text-stone-900">Sort & Filter</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100"><X size={16} /></button>
        </div>
        <div className="px-5 overflow-y-auto flex-1 pb-2">
          <p className="text-xs font-semibold text-stone-500 mb-2 mt-2">Sort by</p>
          <div className="flex flex-col gap-1 mb-5">
            {sorts.map((s) => (
              <button key={s.key} onClick={() => setLocal((f) => ({ ...f, sort: s.key }))}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm ${local.sort === s.key ? "bg-marigold-50 text-marigold-700 font-semibold" : "text-stone-600"}`}>
                {s.label} {local.sort === s.key && <Check size={15} />}
              </button>
            ))}
          </div>

          <p className="text-xs font-semibold text-stone-500 mb-2">Max price: {formatINR(local.maxPrice)}</p>
          <input type="range" min="500" max="5000" step="100" value={local.maxPrice}
            onChange={(e) => setLocal((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
            className="w-full accent-marigold-500 mb-5" />

          <p className="text-xs font-semibold text-stone-500 mb-2">Brand</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {BRANDS.map((b) => (
              <button key={b} onClick={() => toggleBrand(b)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border ${local.brands.has(b) ? "bg-ink-900 text-white border-ink-900" : "border-stone-200 text-stone-600"}`}>
                {b}
              </button>
            ))}
          </div>
        </div>
        <div className="p-5 pt-3 flex gap-3 border-t border-stone-100">
          <PillButton variant="ghost" className="flex-1" onClick={() => setLocal({ sort: "popular", brands: new Set(), maxPrice: 5000 })}>Reset</PillButton>
          <PillButton className="flex-1" onClick={() => { setFilters(local); onClose(); }}>Apply</PillButton>
        </div>
      </div>
    </div>
  );
}

function ChatBot({ messages, onSend, onClose }) {
  const [draft, setDraft] = useState("");
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  const submit = () => { onSend(draft); setDraft(""); };
  return (
    <div className="absolute inset-0 z-50 bg-paper dark:bg-ink flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-stone-100 dark:border-ink-700 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-ink-900 flex items-center justify-center"><MessageCircle size={16} className="text-marigold-400" /></div>
          <div>
            <p className="text-sm font-semibold text-stone-900 dark:text-paper">STRYDE Assistant</p>
            <p className="text-[10px] text-emerald-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online</p>
          </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 dark:bg-ink-700"><X size={16} /></button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${m.from === "bot" ? "bg-stone-100 dark:bg-ink-700 text-stone-800 dark:text-paper self-start rounded-bl-sm" : "bg-ink-900 text-white self-end rounded-br-sm"}`}>
            {m.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="px-5 pb-2 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
        {CHAT_QUICK_REPLIES.map((q) => (
          <button key={q} onClick={() => onSend(q)} className="text-xs font-medium px-3 py-1.5 rounded-full bg-marigold-50 dark:bg-marigold-500/10 text-marigold-700 dark:text-marigold-400 whitespace-nowrap shrink-0">
            {q}
          </button>
        ))}
      </div>

      <div className="p-5 pt-2 flex gap-2 shrink-0">
        <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Type a message..."
          className="flex-1 bg-stone-100 dark:bg-ink-700 rounded-2xl px-4 py-3 text-sm outline-none text-stone-800 dark:text-paper placeholder:text-stone-400" />
        <button onClick={submit} disabled={!draft.trim()} className="bg-marigold-500 text-ink-900 w-11 h-11 rounded-2xl flex items-center justify-center disabled:opacity-40">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function useCountdownToMidnight() {
  const compute = () => {
    const now = new Date();
    const end = new Date(now);
    end.setHours(24, 0, 0, 0);
    const diff = Math.max(0, end - now);
    const h = String(Math.floor(diff / 3.6e6)).padStart(2, "0");
    const m = String(Math.floor((diff % 3.6e6) / 6e4)).padStart(2, "0");
    const s = String(Math.floor((diff % 6e4) / 1000)).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };
  const [time, setTime] = useState(compute);
  useEffect(() => {
    const t = setInterval(() => setTime(compute()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

/* ------------------------------- Home ------------------------------- */

const HERO_SLIDES = [
  { eyebrow: "Limited drop", title: "Sparx SM-717", sub: "Runner", tag: "Save 20% today", sole: "orange", body: "white", variant: "runner" },
  { eyebrow: "Just landed", title: "Nike Revolution 6", sub: "Everyday trainer", tag: "New at STRYDE", sole: "rose", body: "stone", variant: "runner" },
  { eyebrow: "Monsoon ready", title: "Woodland Trail Max", sub: "Waterproof grip", tag: "Free shipping", sole: "amber", body: "stone", variant: "trail" },
];

function HomeScreen({ profile, heroIdx, setHeroIdx, search, onOpenSearch, category, setCategory, products, trending, newDrops, recentlyViewed, onOpen, onQuickAdd, wishlist, onToggleWishlist, onOpenProfile, unreadCount, onOpenNotifs, onOpenFilter, activeFilterCount }) {
  const firstName = firstNameOf(profile.name);
  const hero = HERO_SLIDES[heroIdx];
  const countdown = useCountdownToMidnight();
  return (
    <div className="px-5">
      <div className="flex items-center justify-between pt-4 pb-4">
        <div>
          <p className="text-xs text-stone-400 dark:text-stone-500 flex items-center gap-1"><Sunrise size={12} /> Welcome back,</p>
          <h1 className="text-xl font-display tracking-wide text-stone-900 dark:text-paper">{firstName}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onOpenNotifs} aria-label="Notifications" className="relative w-10 h-10 rounded-full bg-stone-100 dark:bg-ink-700 flex items-center justify-center">
            <Bell size={17} className="text-stone-600 dark:text-paper" />
            {unreadCount > 0 && <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-rose-500" />}
          </button>
          <button onClick={onOpenProfile} className="w-10 h-10 rounded-full bg-ink-900 text-white flex items-center justify-center text-sm font-semibold">
            {initialsOf(profile.name)}
          </button>
        </div>
      </div>

      <button onClick={onOpenSearch} className="w-full flex items-center gap-2 bg-stone-100 dark:bg-ink-700 rounded-2xl px-4 py-3 mb-4 text-left">
        <Search size={16} className="text-stone-400" />
        <span className="text-sm text-stone-400 flex-1">{search || "Search sneakers, brands..."}</span>
      </button>

      <button onClick={() => setHeroIdx((heroIdx + 1) % HERO_SLIDES.length)}
        className="w-full bg-ink-900 rounded-2xl p-4 mb-3 flex items-center justify-between overflow-hidden relative text-left">
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-marigold-500/20" />
        <div className="relative z-10">
          <p className="text-marigold-400 text-[11px] font-bold uppercase tracking-wide mb-1">{hero.eyebrow}</p>
          <p className="text-white font-display text-xl tracking-wide leading-snug w-32">{hero.title}<br /><span className="text-sm font-sans font-normal text-white/60">{hero.sub}</span></p>
          <span className="inline-block mt-2"><StampTag>{hero.tag}</StampTag></span>
        </div>
        <div className="w-28 h-20 opacity-90 relative z-10"><ShoeIcon sole={hero.sole} body={hero.body} variant={hero.variant} /></div>
      </button>
      <div className="flex justify-center gap-1.5 mb-3">
        {HERO_SLIDES.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${i === heroIdx ? "w-5 bg-marigold-500" : "w-1.5 bg-stone-200 dark:bg-ink-700"}`} />
        ))}
      </div>

      <div className="flex items-center justify-between bg-marigold-50 dark:bg-marigold-500/10 rounded-2xl px-4 py-3 mb-5">
        <p className="text-xs font-semibold text-marigold-700 dark:text-marigold-400 flex items-center gap-1.5"><Sparkles size={14} /> Deal of the day ends in</p>
        <span className="font-mono text-sm font-bold text-marigold-700 dark:text-marigold-400">{countdown}</span>
      </div>

      <div className="overflow-hidden mb-5 border-y border-dashed border-stone-200 dark:border-ink-700 py-2">
        <div className="marquee-track flex gap-6 whitespace-nowrap text-[11px] font-bold uppercase tracking-widest text-stone-300 dark:text-ink-700/80">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className="flex items-center gap-2">{b} <span className="text-marigold-400">·</span></span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-5 overflow-x-auto no-scrollbar">
        {CATEGORIES.map(({ key, icon: Icon }) => (
          <button key={key} onClick={() => setCategory(key)}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full whitespace-nowrap ${category === key ? "bg-ink-900 text-white" : "bg-stone-100 dark:bg-ink-700 text-stone-500 dark:text-stone-300"}`}>
            <Icon size={13} /> {key}
          </button>
        ))}
        <button onClick={onOpenFilter} className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full whitespace-nowrap bg-marigold-50 dark:bg-marigold-500/10 text-marigold-700 dark:text-marigold-400 relative">
          <SlidersHorizontal size={13} /> Filters
          {activeFilterCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-marigold-500 text-white text-[9px] flex items-center justify-center">{activeFilterCount}</span>}
        </button>
      </div>

      {!search && category === "All" && (
        <>
          <SectionHeading eyebrow="Hot right now" title="Trending" />
          <div className="flex gap-3 overflow-x-auto no-scrollbar mb-6 pb-1 -mx-5 px-5">
            {trending.map((p) => (
              <div key={p.id} className="w-36 shrink-0"><ProductCard product={p} onOpen={onOpen} onQuickAdd={onQuickAdd} isWishlisted={wishlist.has(p.id)} onToggleWishlist={onToggleWishlist} /></div>
            ))}
          </div>

          {newDrops.length > 0 && (
            <>
              <SectionHeading eyebrow="Fresh off the line" title="New Drops" />
              <div className="flex gap-3 overflow-x-auto no-scrollbar mb-6 pb-1 -mx-5 px-5">
                {newDrops.map((p) => (
                  <div key={p.id} className="w-36 shrink-0"><ProductCard product={p} onOpen={onOpen} onQuickAdd={onQuickAdd} isWishlisted={wishlist.has(p.id)} onToggleWishlist={onToggleWishlist} /></div>
                ))}
              </div>
            </>
          )}

          {recentlyViewed.length > 0 && (
            <>
              <SectionHeading eyebrow="Pick up where you left off" title="Recently viewed" />
              <div className="flex gap-3 overflow-x-auto no-scrollbar mb-6 pb-1 -mx-5 px-5">
                {recentlyViewed.map((p) => (
                  <div key={p.id} className="w-36 shrink-0"><ProductCard product={p} onOpen={onOpen} onQuickAdd={onQuickAdd} isWishlisted={wishlist.has(p.id)} onToggleWishlist={onToggleWishlist} /></div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-stone-900 dark:text-paper">All sneakers</h2>
        <span className="text-xs text-marigold-600 dark:text-marigold-400 font-medium">{products.length} styles</span>
      </div>

      <div className="grid grid-cols-2 gap-3 pb-2">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={onOpen} onQuickAdd={onQuickAdd} isWishlisted={wishlist.has(p.id)} onToggleWishlist={onToggleWishlist} />
        ))}
        {products.length === 0 && (
          <div className="col-span-2 text-center py-12">
            <p className="text-sm font-medium text-stone-700 dark:text-paper">No sneakers found</p>
            <p className="text-xs text-stone-400 mt-1">Try a different search, category or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------- Product Detail ------------------------------- */

function ProductGallery({ product }) {
  const [idx, setIdx] = useState(0);
  const touchX = useRef(null);
  const images = product.images && product.images.length ? product.images : [product.image];

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx > 40) setIdx((i) => Math.max(0, i - 1));
    if (dx < -40) setIdx((i) => Math.min(images.length - 1, i + 1));
    touchX.current = null;
  };

  return (
    <div>
      <div className="mx-5 bg-stone-50 dark:bg-ink-700 rounded-2xl aspect-square overflow-hidden mb-2 relative"
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {product.tag && <span className="absolute top-3 left-3 z-10"><StampTag tone={product.tag === "Sale" ? "rose" : "ink"}>{product.tag}</StampTag></span>}
        <ProductPhoto product={{ ...product, image: images[idx] }} />
        {images.length > 1 && (
          <>
            <button onClick={() => setIdx((i) => Math.max(0, i - 1))} aria-label="Previous photo"
              className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 dark:bg-ink-900/80 flex items-center justify-center ${idx === 0 ? "opacity-0 pointer-events-none" : ""}`}>
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => setIdx((i) => Math.min(images.length - 1, i + 1))} aria-label="Next photo"
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 dark:bg-ink-900/80 flex items-center justify-center ${idx === images.length - 1 ? "opacity-0 pointer-events-none" : ""}`}>
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <span key={i} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-4 bg-marigold-500" : "w-1.5 bg-white/70"}`} />
              ))}
            </div>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="px-5 flex gap-2 mb-1">
          {images.map((src, i) => (
            <button key={src} onClick={() => setIdx(i)} className={`w-14 h-14 rounded-xl overflow-hidden border-2 ${idx === i ? "border-marigold-500" : "border-transparent"}`}>
              <img src={src} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductDetail({ product, reviews, allProducts, onBack, onAdd, onBuyNow, isWishlisted, onToggleWishlist, onAddReview, onOpenProduct, profileName, showToast }) {
  const [size, setSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)]);
  const [qty, setQty] = useState(1);
  const [colorway, setColorway] = useState(product.colorways[0]);
  const [tabKey, setTabKey] = useState("details");
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState(null);
  const [reviewDraft, setReviewDraft] = useState({ rating: 5, comment: "" });

  const related = useMemo(
    () => allProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4),
    [allProducts, product]
  );

  const checkPincode = () => {
    if (!/^\d{6}$/.test(pincode)) { setPincodeResult({ ok: false }); return; }
    const days = 3 + (parseInt(pincode[0], 10) % 4);
    setPincodeResult({ ok: true, days });
  };

  const submitReview = () => {
    if (!reviewDraft.comment.trim()) return;
    onAddReview(product.id, { name: firstNameOf(profileName), rating: reviewDraft.rating, comment: reviewDraft.comment });
    setReviewDraft({ rating: 5, comment: "" });
  };

  return (
    <div>
      <TopBar
        title="Product detail" eyebrow={product.brand}
        onBack={onBack}
        right={
          <div className="flex gap-2">
            <button onClick={() => showToast("Product link copied")} aria-label="Share product" className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 dark:bg-ink-700">
              <Sparkles size={15} className="text-stone-500" />
            </button>
            <button onClick={() => onToggleWishlist(product.id)} aria-label="Toggle wishlist" className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 dark:bg-ink-700">
              <Heart size={16} className={isWishlisted ? "fill-rose-500 text-rose-500" : "text-stone-500"} />
            </button>
          </div>
        }
      />
      <ProductGallery product={product} />

      <div className="px-5 mb-1 mt-2">
        <p className="text-[11px] font-medium text-stone-500 dark:text-stone-400 mb-2">Finish: <span className="text-stone-800 dark:text-paper font-semibold">{colorway.label}</span></p>
      </div>
      <div className="px-5 flex gap-2 mb-4">
        {product.colorways.map((c) => (
          <button key={c.label} onClick={() => setColorway(c)}
            className={`w-11 h-11 rounded-xl bg-stone-50 dark:bg-ink-700 flex items-center justify-center border-2 ${colorway.label === c.label ? "border-marigold-500" : "border-transparent"}`}
            title={c.label}>
            <div className="w-7 h-5"><ShoeIcon sole={c.sole} body={c.body} variant={product.variant} /></div>
          </button>
        ))}
      </div>

      <div className="px-5">
        <p className="text-xs text-stone-400">{product.brand} · {product.category} · {colorway.label}</p>
        <h2 className="text-xl font-display tracking-wide text-stone-900 dark:text-paper w-64 leading-snug mb-2">{product.name}</h2>
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xl font-semibold text-stone-900 dark:text-paper">{formatINR(priceForSize(product, size))}</span>
          {product.oldPrice && <span className="font-mono text-sm text-stone-400 line-through">{formatINR(product.oldPrice + sizeSurcharge(size))}</span>}
          <span className="flex items-center gap-1 text-xs text-marigold-600 font-medium ml-auto">
            <Star size={13} className="fill-marigold-500 text-marigold-500" /> {product.rating} ({product.reviews})
          </span>
        </div>
        {sizeSurcharge(size) > 0 && (
          <p className="text-[11px] text-marigold-600 dark:text-marigold-400 -mt-2 mb-3">Extended size UK {size} adds {formatINR(sizeSurcharge(size))} to the base price.</p>
        )}

        <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">Select size (UK)</p>
        <div className="flex gap-2 mb-5 flex-wrap">
          {product.sizes.map((s) => {
            const extra = sizeSurcharge(s);
            return (
              <button key={s} onClick={() => setSize(s)}
                className={`relative w-12 h-12 rounded-xl text-sm font-medium border flex flex-col items-center justify-center leading-tight ${size === s ? "bg-ink-900 text-white border-ink-900" : "border-stone-200 dark:border-ink-700 text-stone-600 dark:text-stone-300"}`}>
                <span>{s}</span>
                {extra > 0 && <span className={`text-[8px] ${size === s ? "text-marigold-300" : "text-marigold-600"}`}>+{extra}</span>}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">Quantity</p>
            <div className="flex items-center gap-3 bg-stone-100 dark:bg-ink-700 rounded-full px-1 py-1 w-fit">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-8 h-8 rounded-full bg-white dark:bg-ink-800 flex items-center justify-center"><Minus size={14} /></button>
              <span className="text-sm font-semibold w-5 text-center text-stone-800 dark:text-paper">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(5, q + 1))} className="w-8 h-8 rounded-full bg-white dark:bg-ink-800 flex items-center justify-center"><Plus size={14} /></button>
            </div>
          </div>
        </div>

        <div className="flex gap-4 border-b border-stone-100 dark:border-ink-700 mb-4">
          {[{ key: "details", label: "Details" }, { key: "reviews", label: `Reviews (${reviews.length})` }].map((t) => (
            <button key={t.key} onClick={() => setTabKey(t.key)}
              className={`text-sm pb-2 -mb-px border-b-2 font-medium ${tabKey === t.key ? "border-marigold-500 text-stone-900 dark:text-paper" : "border-transparent text-stone-400"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tabKey === "details" ? (
          <>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mb-4">{product.description}</p>
            <div className="flex flex-col gap-1.5 mb-5">
              {product.features.map((f) => (
                <p key={f} className="text-xs text-stone-600 dark:text-stone-300 flex items-center gap-2"><Check size={13} className="text-emerald-600 shrink-0" /> {f}</p>
              ))}
            </div>

            <div className="bg-stone-50 dark:bg-ink-700 rounded-2xl p-4 mb-6">
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2 flex items-center gap-1"><MapPinned size={13} /> Check delivery to your pincode</p>
              <div className="flex gap-2">
                <input value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="e.g. 500039"
                  className="flex-1 bg-white dark:bg-ink-800 rounded-xl px-3 py-2.5 text-sm outline-none text-stone-800 dark:text-paper" />
                <button onClick={checkPincode} className="bg-ink-900 text-white text-xs font-semibold px-4 rounded-xl">Check</button>
              </div>
              {pincodeResult && (
                pincodeResult.ok
                  ? <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-2 flex items-center gap-1"><Truck size={12} /> Delivery in {pincodeResult.days} days · Cash on Delivery available</p>
                  : <p className="text-xs text-rose-500 mt-2">Enter a valid 6-digit pincode</p>
              )}
            </div>
          </>
        ) : (
          <div className="mb-6">
            <div className="bg-stone-50 dark:bg-ink-700 rounded-2xl p-4 mb-4">
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">Write a review</p>
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button key={i} onClick={() => setReviewDraft((r) => ({ ...r, rating: i }))}>
                    <Star size={20} className={i <= reviewDraft.rating ? "fill-marigold-500 text-marigold-500" : "text-stone-200 dark:text-stone-600"} />
                  </button>
                ))}
              </div>
              <textarea value={reviewDraft.comment} onChange={(e) => setReviewDraft((r) => ({ ...r, comment: e.target.value }))}
                placeholder="How's the fit, comfort and quality?" rows={2}
                className="w-full bg-white dark:bg-ink-800 rounded-xl px-3 py-2.5 text-sm outline-none text-stone-800 dark:text-paper resize-none mb-2" />
              <PillButton variant="dark" className="w-full" onClick={submitReview}>Post review</PillButton>
            </div>
            <div className="flex flex-col gap-3">
              {reviews.length === 0 && <p className="text-center text-sm text-stone-400 py-6">No reviews yet — be the first!</p>}
              {reviews.map((r) => (
                <div key={r.id} className="border-b border-stone-100 dark:border-ink-700 pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-stone-900 dark:text-paper">{r.name}</p>
                    <span className="text-[10px] text-stone-400">{r.date}</span>
                  </div>
                  <StarRating value={r.rating} />
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="mb-4">
          <div className="px-5"><SectionHeading eyebrow="More like this" title="You may also like" /></div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-1">
            {related.map((p) => (
              <button key={p.id} onClick={() => onOpenProduct(p)} className="w-32 shrink-0 text-left bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-2.5">
                <div className="bg-stone-50 dark:bg-ink-900/40 rounded-xl aspect-square overflow-hidden mb-2"><ProductPhoto product={p} /></div>
                <p className="text-[11px] text-stone-400">{p.brand}</p>
                <p className="text-xs font-medium text-stone-900 dark:text-paper leading-snug line-clamp-2 mb-1">{p.name}</p>
                <p className="font-mono text-xs font-semibold text-stone-900 dark:text-paper">{formatINR(p.price)}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-5 pb-2 flex gap-3 sticky bottom-0 bg-paper dark:bg-ink pt-2">
        <PillButton variant="outline" className="flex-1" onClick={() => onAdd(product.id, size, qty)}>
          <ShoppingBag size={16} /> Add · {formatINR(priceForSize(product, size) * qty)}
        </PillButton>
        <PillButton className="flex-1" onClick={() => onBuyNow(product.id, size, qty)}>Buy now</PillButton>
      </div>
    </div>
  );
}

/* ------------------------------- Cart ------------------------------- */

function CartScreen({ items, setQty, onRemove, onSave, savedItems, onMoveToCart, codeInput, setCodeInput, applyCode, appliedCode, subtotal, discountAmt, shipping, total, giftWrap, setGiftWrap, walletPoints, walletRedeemable, useWallet, setUseWallet, onCheckout, onShop }) {
  return (
    <div className="px-5">
      <TopBar title={`Your cart (${items.length})`} />
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ShoppingBag size={32} className="text-stone-300 mb-3" />
          <p className="text-sm font-medium text-stone-700 dark:text-paper">Your cart is empty</p>
          <p className="text-xs text-stone-400 mt-1 mb-4">Add sneakers you like and they'll show up here.</p>
          <PillButton onClick={onShop}>Start shopping</PillButton>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 mb-5">
            {items.map((i) => (
              <div key={i.id} className="flex items-center gap-3 bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-3">
                <div className="w-14 h-14 bg-stone-50 dark:bg-ink-800 rounded-xl flex items-center justify-center shrink-0">
                  <div className="w-9 h-6"><ShoeIcon sole={i.sole} body={i.body} variant={i.variant} /></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-900 dark:text-paper truncate">{i.name}</p>
                  <p className="text-xs text-stone-400 mb-1">UK {i.size}</p>
                  <button onClick={() => onSave(i.id)} className="text-[11px] text-marigold-600 font-medium">Save for later</button>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 bg-stone-100 dark:bg-ink-800 rounded-full px-1 py-1">
                    <button onClick={() => setQty(i.id, i.qty - 1)} className="w-6 h-6 rounded-full bg-white dark:bg-ink-700 flex items-center justify-center"><Minus size={12} /></button>
                    <span className="text-xs font-semibold w-4 text-center text-stone-800 dark:text-paper">{i.qty}</span>
                    <button onClick={() => setQty(i.id, i.qty + 1)} className="w-6 h-6 rounded-full bg-white dark:bg-ink-700 flex items-center justify-center"><Plus size={12} /></button>
                  </div>
                  <span className="font-mono text-sm font-semibold text-stone-900 dark:text-paper">{formatINR(i.price * i.qty)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-3 flex items-center justify-between mb-4">
            <p className="text-xs font-medium text-stone-600 dark:text-stone-300 flex items-center gap-2"><Gift size={15} className="text-marigold-500" /> Gift wrap this order (+₹29)</p>
            <button onClick={() => setGiftWrap(!giftWrap)} className={`w-10 h-6 rounded-full flex items-center px-0.5 transition ${giftWrap ? "bg-marigold-500 justify-end" : "bg-stone-200 dark:bg-ink-800 justify-start"}`}>
              <span className="w-5 h-5 rounded-full bg-white block" />
            </button>
          </div>

          {walletPoints > 0 && (
            <div className="bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-3 flex items-center justify-between mb-4">
              <p className="text-xs font-medium text-stone-600 dark:text-stone-300 flex items-center gap-2"><Wallet size={15} className="text-marigold-500" /> Use {walletRedeemable} wallet points (-{formatINR(walletRedeemable)})</p>
              <button onClick={() => setUseWallet(!useWallet)} className={`w-10 h-6 rounded-full flex items-center px-0.5 transition ${useWallet ? "bg-marigold-500 justify-end" : "bg-stone-200 dark:bg-ink-800 justify-start"}`}>
                <span className="w-5 h-5 rounded-full bg-white block" />
              </button>
            </div>
          )}

          <div className="flex gap-2 mb-4">
            <input value={codeInput} onChange={(e) => setCodeInput(e.target.value)} placeholder="Promo code"
              className="flex-1 bg-stone-100 dark:bg-ink-700 rounded-2xl px-4 py-3 text-sm outline-none text-stone-800 dark:text-paper placeholder:text-stone-400" />
            <button onClick={applyCode} className="bg-ink-900 text-white text-sm font-semibold px-4 rounded-2xl">Apply</button>
          </div>
          {appliedCode && <p className="text-xs text-emerald-700 dark:text-emerald-400 -mt-2 mb-4">Code {appliedCode} applied</p>}

          <div className="border-t border-dashed border-stone-200 dark:border-ink-700 pt-4 mb-6 flex flex-col gap-2">
            <div className="flex justify-between text-sm text-stone-500 dark:text-stone-400"><span>Subtotal</span><span className="font-mono">{formatINR(subtotal)}</span></div>
            {discountAmt > 0 && <div className="flex justify-between text-sm text-emerald-700 dark:text-emerald-400"><span>Discount</span><span className="font-mono">-{formatINR(discountAmt)}</span></div>}
            {useWallet && walletRedeemable > 0 && <div className="flex justify-between text-sm text-emerald-700 dark:text-emerald-400"><span>Wallet points</span><span className="font-mono">-{formatINR(walletRedeemable)}</span></div>}
            {giftWrap && <div className="flex justify-between text-sm text-stone-500 dark:text-stone-400"><span>Gift wrap</span><span className="font-mono">₹29</span></div>}
            <div className="flex justify-between text-sm text-stone-500 dark:text-stone-400"><span>Shipping</span><span className="font-mono">{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
            <div className="flex justify-between text-base font-semibold text-stone-900 dark:text-paper"><span>Total</span><span className="font-mono">{formatINR(total)}</span></div>
          </div>

          <PillButton className="w-full mb-6" onClick={onCheckout}>Checkout · {formatINR(total)}</PillButton>
        </>
      )}

      {savedItems.length > 0 && (
        <>
          <SectionHeading title={`Saved for later (${savedItems.length})`} />
          <div className="flex flex-col gap-3 mb-6">
            {savedItems.map((p) => (
              <div key={p.id} className="flex items-center gap-3 bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-3">
                <div className="w-12 h-12 bg-stone-50 dark:bg-ink-800 rounded-xl flex items-center justify-center shrink-0">
                  <div className="w-8 h-6"><ShoeIcon sole={p.sole} body={p.body} variant={p.variant} /></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-900 dark:text-paper truncate">{p.name}</p>
                  <p className="font-mono text-xs text-stone-500 dark:text-stone-400">{formatINR(p.price)}</p>
                </div>
                <button onClick={() => onMoveToCart(p.id)} className="text-xs font-semibold text-marigold-600 px-3 py-1.5 rounded-full bg-marigold-50 dark:bg-marigold-500/10">Move to cart</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------- Discounts ------------------------------- */

function DiscountScreen({ appliedCode, onApply }) {
  const colorMap = { emerald: "bg-emerald-50 text-emerald-700", orange: "bg-marigold-50 text-marigold-700", sky: "bg-sky-50 text-sky-700", rose: "bg-rose-50 text-rose-700" };
  return (
    <div className="px-5">
      <TopBar title="Offers for you" />
      <div className="bg-ink-900 rounded-2xl p-4 mb-5 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-marigold-500/20" />
        <p className="text-marigold-400 text-[11px] font-bold uppercase tracking-wide mb-1 relative z-10">Today's special</p>
        <p className="text-white font-display text-lg tracking-wide relative z-10">Up to 50% off selected sneakers</p>
      </div>
      <div className="flex flex-col gap-3">
        {DISCOUNTS.map((d) => (
          <div key={d.code} className="bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-4 flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${colorMap[d.color]}`}>
              <Tag size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-mono text-sm font-semibold text-stone-900 dark:text-paper">{d.code}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 truncate">{d.desc}</p>
            </div>
            <button
              onClick={() => onApply(d.code)}
              className={`text-xs font-semibold px-3 py-2 rounded-xl shrink-0 ${appliedCode === d.code ? "bg-ink-900 text-white" : "bg-stone-100 dark:bg-ink-800 text-stone-700 dark:text-paper"}`}>
              {appliedCode === d.code ? "Applied" : "Use code"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- Checkout / Addresses ------------------------------- */

const PAYMENT_METHODS = [
  { key: "UPI", icon: Smartphone, label: "UPI" },
  { key: "Card", icon: CreditCard, label: "Card" },
  { key: "COD", icon: Banknote, label: "COD" },
  { key: "Wallet", icon: Wallet, label: "Wallet" },
];

function CheckoutStepper({ step }) {
  const steps = ["Address", "Payment", "Review"];
  return (
    <div className="flex items-center gap-1.5 mb-5">
      {steps.map((label, i) => {
        const n = i + 1;
        const active = step === n;
        const done = step > n;
        return (
          <React.Fragment key={label}>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${done ? "bg-emerald-600 text-white" : active ? "bg-marigold-500 text-ink-900" : "bg-stone-100 dark:bg-ink-700 text-stone-400"}`}>
                {done ? <Check size={12} /> : n}
              </span>
              <span className={`text-[11px] font-medium whitespace-nowrap ${active ? "text-stone-900 dark:text-paper" : "text-stone-400"}`}>{label}</span>
            </div>
            {n < steps.length && <div className={`flex-1 h-0.5 rounded-full ${step > n ? "bg-emerald-600" : "bg-stone-100 dark:bg-ink-700"}`} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function CheckoutScreen({ items, subtotal, discountAmt, shipping, total, giftWrap, giftWrapFee, walletDiscount, walletBalance, addresses, selectedAddress, onSelectAddress, payment, setPayment, onBack, onManageAddresses, onPlaceOrder, notes, setNotes }) {
  const [step, setStep] = useState(1);
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [payErrors, setPayErrors] = useState({});
  const [agree, setAgree] = useState(false);

  const formatCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const validatePayment = () => {
    const errs = {};
    if (payment === "UPI" && !/^[\w.-]+@[\w.-]+$/.test(upiId)) errs.upi = "Enter a valid UPI ID, e.g. name@okbank";
    if (payment === "Card") {
      if (card.number.replace(/\s/g, "").length !== 16) errs.number = "Enter a 16-digit card number";
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) errs.expiry = "Use MM/YY format";
      if (!/^\d{3}$/.test(card.cvv)) errs.cvv = "3-digit CVV";
    }
    if (payment === "COD" && total > 5000) errs.cod = "Cash on Delivery is only available for orders under ₹5,000";
    if (payment === "Wallet" && walletBalance < total) errs.wallet = `Insufficient wallet balance (you have ${formatINR(walletBalance)})`;
    setPayErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goNext = () => {
    if (step === 1) { if (selectedAddress) setStep(2); }
    else if (step === 2) { if (validatePayment()) setStep(3); }
  };

  return (
    <div className="px-5">
      <TopBar title="Checkout" onBack={step === 1 ? onBack : () => setStep(step - 1)} />
      <CheckoutStepper step={step} />

      {step === 1 && (
        <>
          <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">Choose a delivery address</p>
          <div className="flex flex-col gap-3 mb-4">
            {addresses.map((a) => (
              <button key={a.id} onClick={() => onSelectAddress(a.id)}
                className={`text-left bg-white dark:bg-ink-700 border-2 rounded-2xl p-4 ${selectedAddress?.id === a.id ? "border-marigold-500" : "border-stone-100 dark:border-ink-800"}`}>
                <p className="text-xs font-bold uppercase tracking-wide text-ink-900 dark:text-paper mb-1 flex items-center gap-1.5"><MapPin size={13} className="text-marigold-500" /> {a.label}{a.isDefault && <span className="text-[9px] bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded-full normal-case font-semibold">Default</span>}</p>
                <p className="text-sm text-stone-700 dark:text-stone-300">{a.name} · {a.phone}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">{a.line1}, {a.city}, {a.state} {a.pincode}</p>
              </button>
            ))}
            {addresses.length === 0 && <p className="text-sm text-stone-400 py-6 text-center">No saved addresses yet — add one to continue.</p>}
          </div>
          <PillButton variant="outline" className="w-full mb-5" onClick={onManageAddresses}><Plus size={16} /> Add / manage addresses</PillButton>
          <TextField label="Delivery instructions (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Leave with security guard" />
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">Payment method</p>
          <div className="flex gap-2 mb-5">
            {PAYMENT_METHODS.map(({ key, icon: Icon, label }) => (
              <button key={key} onClick={() => { setPayment(key); setPayErrors({}); }}
                className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl border text-[11px] font-medium ${payment === key ? "bg-ink-900 text-white border-ink-900" : "border-stone-200 dark:border-ink-700 text-stone-600 dark:text-stone-300"}`}>
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>

          {payment === "UPI" && (
            <TextField label="UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="yourname@okbank" error={payErrors.upi} />
          )}
          {payment === "Card" && (
            <>
              <TextField label="Card number" value={card.number} onChange={(e) => setCard((c) => ({ ...c, number: formatCard(e.target.value) }))} placeholder="1234 5678 9012 3456" error={payErrors.number} />
              <div className="flex gap-3">
                <div className="flex-1"><TextField label="Expiry" value={card.expiry} onChange={(e) => setCard((c) => ({ ...c, expiry: formatExpiry(e.target.value) }))} placeholder="MM/YY" error={payErrors.expiry} /></div>
                <div className="flex-1"><TextField label="CVV" type="password" value={card.cvv} onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) }))} placeholder="123" error={payErrors.cvv} /></div>
              </div>
            </>
          )}
          {payment === "COD" && (
            <div className="bg-stone-50 dark:bg-ink-700 rounded-2xl p-4 mb-3">
              <p className="text-sm text-stone-700 dark:text-paper">Pay {formatINR(total)} in cash when your order arrives.</p>
              {payErrors.cod && <p className="text-[11px] text-rose-500 mt-1">{payErrors.cod}</p>}
            </div>
          )}
          {payment === "Wallet" && (
            <div className="bg-stone-50 dark:bg-ink-700 rounded-2xl p-4 mb-3">
              <p className="text-sm text-stone-700 dark:text-paper">Wallet balance: <span className="font-mono font-semibold">{formatINR(walletBalance)}</span></p>
              {payErrors.wallet && <p className="text-[11px] text-rose-500 mt-1">{payErrors.wallet}</p>}
            </div>
          )}
        </>
      )}

      {step === 3 && (
        <>
          <div className="bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400 flex items-center gap-1"><MapPin size={13} /> Delivering to</p>
              <button onClick={() => setStep(1)} className="text-xs font-medium text-marigold-600">Edit</button>
            </div>
            <p className="text-sm text-stone-800 dark:text-paper">
              <span className="font-semibold">{selectedAddress?.label}</span> — {selectedAddress?.line1}, {selectedAddress?.city}, {selectedAddress?.state} {selectedAddress?.pincode}
            </p>
          </div>
          <div className="bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400 flex items-center gap-1"><Wallet size={13} /> Paying with</p>
              <button onClick={() => setStep(2)} className="text-xs font-medium text-marigold-600">Edit</button>
            </div>
            <p className="text-sm text-stone-800 dark:text-paper">{payment}{payment === "UPI" && upiId ? ` · ${upiId}` : ""}{payment === "Card" && card.number ? ` · •••• ${card.number.slice(-4)}` : ""}</p>
          </div>

          <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">Order summary ({items.length} items)</p>
          <div className="flex flex-col gap-2 mb-4">
            {items.map((i) => (
              <div key={i.id} className="flex justify-between text-sm text-stone-600 dark:text-stone-300">
                <span className="truncate pr-2">{i.qty}× {i.name} (UK {i.size})</span>
                <span className="font-mono shrink-0">{formatINR(i.price * i.qty)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-stone-200 dark:border-ink-700 pt-4 mb-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm text-stone-500 dark:text-stone-400"><span>Subtotal</span><span className="font-mono">{formatINR(subtotal)}</span></div>
            {discountAmt > 0 && <div className="flex justify-between text-sm text-emerald-700 dark:text-emerald-400"><span>Discount</span><span className="font-mono">-{formatINR(discountAmt)}</span></div>}
            {walletDiscount > 0 && <div className="flex justify-between text-sm text-emerald-700 dark:text-emerald-400"><span>Wallet points</span><span className="font-mono">-{formatINR(walletDiscount)}</span></div>}
            {giftWrap && <div className="flex justify-between text-sm text-stone-500 dark:text-stone-400"><span>Gift wrap</span><span className="font-mono">{formatINR(giftWrapFee)}</span></div>}
            <div className="flex justify-between text-sm text-stone-500 dark:text-stone-400"><span>Shipping</span><span className="font-mono">{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
            <div className="flex justify-between text-base font-semibold text-stone-900 dark:text-paper"><span>Total</span><span className="font-mono">{formatINR(total)}</span></div>
          </div>

          <label className="flex items-start gap-2 mb-4">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-marigold-500 w-4 h-4" />
            <span className="text-[11px] text-stone-500 dark:text-stone-400">I agree to the order terms and 7-day return policy.</span>
          </label>
          <p className="text-[11px] text-stone-400 flex items-center gap-1 mb-3"><ShieldCheck size={13} /> Secure checkout</p>
        </>
      )}

      <PillButton
        className="w-full mb-4"
        onClick={step === 3 ? onPlaceOrder : goNext}
        disabled={items.length === 0 || (step === 1 && !selectedAddress) || (step === 3 && !agree)}
      >
        {step === 3 ? `Place order · ${formatINR(total)}` : "Continue"}
      </PillButton>
    </div>
  );
}

function AddressBookScreen({ addresses, selectedId, onSelect, onAdd, onDelete, onSetDefault, onBack }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: "Home", name: "", phone: "", line1: "", city: "", state: "", pincode: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = () => {
    if (!form.name || !form.line1 || !form.pincode) return;
    onAdd(form);
    setForm({ label: "Home", name: "", phone: "", line1: "", city: "", state: "", pincode: "" });
    setShowForm(false);
  };
  return (
    <div className="px-5">
      <TopBar title="Your addresses" onBack={onBack} />
      <div className="flex flex-col gap-3 mb-4">
        {addresses.map((a) => (
          <button key={a.id} onClick={() => onSelect(a.id)} className={`text-left bg-white dark:bg-ink-700 border-2 rounded-2xl p-4 ${selectedId === a.id ? "border-marigold-500" : "border-stone-100 dark:border-ink-800"}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wide text-ink-900 dark:text-paper flex items-center gap-1.5">
                <MapPin size={13} className="text-marigold-500" /> {a.label} {a.isDefault && <span className="text-[9px] bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded-full normal-case font-semibold">Default</span>}
              </span>
              <div className="flex gap-2">
                {!a.isDefault && <button onClick={(e) => { e.stopPropagation(); onSetDefault(a.id); }} className="text-[11px] text-marigold-600 font-medium">Set default</button>}
                <button onClick={(e) => { e.stopPropagation(); onDelete(a.id); }} className="text-rose-500"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-sm text-stone-700 dark:text-stone-300">{a.name} · {a.phone}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">{a.line1}, {a.city}, {a.state} {a.pincode}</p>
          </button>
        ))}
      </div>

      {showForm ? (
        <div className="bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-4 mb-4">
          <div className="flex gap-2 mb-3">
            {["Home", "Work", "Other"].map((l) => (
              <button key={l} onClick={() => setForm((f) => ({ ...f, label: l }))}
                className={`text-xs font-medium px-3 py-1.5 rounded-full ${form.label === l ? "bg-ink-900 text-white" : "bg-stone-100 dark:bg-ink-800 text-stone-500"}`}>{l}</button>
            ))}
          </div>
          <TextField label="Full name" value={form.name} onChange={set("name")} placeholder="Salung Prompo" />
          <TextField label="Phone" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
          <TextField label="Address line" value={form.line1} onChange={set("line1")} placeholder="House no, street, area" />
          <div className="flex gap-3">
            <div className="flex-1"><TextField label="City" value={form.city} onChange={set("city")} placeholder="Hyderabad" /></div>
            <div className="flex-1"><TextField label="State" value={form.state} onChange={set("state")} placeholder="Telangana" /></div>
          </div>
          <TextField label="Pincode" value={form.pincode} onChange={set("pincode")} placeholder="500039" />
          <div className="flex gap-3">
            <PillButton variant="ghost" className="flex-1" onClick={() => setShowForm(false)}>Cancel</PillButton>
            <PillButton className="flex-1" onClick={submit}>Save address</PillButton>
          </div>
        </div>
      ) : (
        <PillButton variant="outline" className="w-full mb-6" onClick={() => setShowForm(true)}><Plus size={16} /> Add new address</PillButton>
      )}
    </div>
  );
}

/* ------------------------------- Orders ------------------------------- */

function OrderConfirmScreen({ order, onViewOrder, onContinue }) {
  if (!order) return null;
  return (
    <div className="px-5 pt-10 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-marigold-50 dark:bg-marigold-500/10 flex items-center justify-center mb-4">
        <PartyPopper size={26} className="text-marigold-600" />
      </div>
      <h2 className="text-xl font-display tracking-wide text-stone-900 dark:text-paper mb-1">Order placed!</h2>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6 w-64">Your order {order.id} is confirmed and being prepared for shipment. You earned wallet points on this order.</p>

      <div className="w-full bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-4 mb-6 text-left">
        <div className="flex justify-between text-sm mb-2"><span className="text-stone-500 dark:text-stone-400">Order ID</span><span className="font-mono text-stone-900 dark:text-paper">{order.id}</span></div>
        <div className="flex justify-between text-sm mb-2"><span className="text-stone-500 dark:text-stone-400">Payment</span><span className="text-stone-900 dark:text-paper">{order.payment}</span></div>
        <div className="flex justify-between text-sm"><span className="text-stone-500 dark:text-stone-400">Total</span><span className="font-mono text-stone-900 dark:text-paper">{formatINR(order.total)}</span></div>
      </div>

      <PillButton className="w-full mb-3" onClick={onViewOrder}>Track this order</PillButton>
      <PillButton variant="ghost" className="w-full" onClick={onContinue}>Continue shopping</PillButton>
    </div>
  );
}

function OrdersScreen({ orders, onOpen, onShop, onReorder }) {
  const [filter, setFilter] = useState("All");
  const tabs = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];
  const list = orders.filter((o) => filter === "All" || o.status === filter);
  return (
    <div className="px-5">
      <TopBar title="Your orders" />
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button key={t} onClick={() => setFilter(t)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap ${filter === t ? "bg-ink-900 text-white" : "bg-stone-100 dark:bg-ink-700 text-stone-500 dark:text-stone-300"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {list.map((o) => (
          <div key={o.id} className="bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-stone-900 dark:text-paper">{o.id}</p>
              <StatusBadge status={o.status} />
            </div>
            <p className="text-xs text-stone-400 mb-2">{o.date}</p>
            {o.items.map((it, i) => (
              <p key={i} className="text-sm text-stone-600 dark:text-stone-300">{it.name} <span className="text-stone-400">· {it.note}</span></p>
            ))}
            <div className="flex items-center justify-between mt-3">
              <span className="font-mono text-sm font-semibold text-stone-900 dark:text-paper">{formatINR(o.total)}</span>
              <div className="flex items-center gap-3">
                <button onClick={() => onReorder(o)} className="text-xs font-medium text-stone-500 dark:text-stone-300 flex items-center gap-1"><RotateCcw size={13} /> Reorder</button>
                <button onClick={() => onOpen(o)} className="text-xs font-medium text-marigold-600 flex items-center gap-1">
                  Track order <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm font-medium text-stone-700 dark:text-paper">No orders in this status</p>
            <button onClick={onShop} className="text-xs font-medium text-marigold-600 mt-2">Browse sneakers</button>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderDetailScreen({ order, onBack, showToast, onOpenChat, onReorder, onCancel }) {
  const [confirmCancel, setConfirmCancel] = useState(false);
  if (!order) return null;
  const activeStep = STATUS_STEP[order.status] ?? 0;
  const cancelled = order.status === "Cancelled";
  return (
    <div className="px-5">
      <TopBar title={order.id} onBack={onBack} right={<StatusBadge status={order.status} />} />

      {!cancelled ? (
        <div className="bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-4 mb-5">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${i <= activeStep ? "bg-marigold-500 text-ink-900" : "bg-stone-100 dark:bg-ink-800 text-stone-300"}`}>
                  {i <= activeStep ? <Check size={12} /> : <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                </div>
                {i < STEPS.length - 1 && <div className={`w-0.5 h-8 ${i < activeStep ? "bg-marigold-500" : "bg-stone-100 dark:bg-ink-800"}`} />}
              </div>
              <p className={`text-sm pt-0.5 ${i <= activeStep ? "text-stone-900 dark:text-paper font-medium" : "text-stone-400"}`}>{step}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-rose-50 dark:bg-rose-900/20 rounded-2xl p-4 mb-5 flex items-center gap-2">
          <X size={16} className="text-rose-500" />
          <p className="text-sm text-rose-700 dark:text-rose-300">This order was cancelled.</p>
        </div>
      )}

      <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">Items</p>
      <div className="flex flex-col gap-2 mb-5">
        {order.items.map((it, i) => (
          <div key={i} className="flex items-center gap-3 bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-3">
            <div className="w-12 h-12 bg-stone-50 dark:bg-ink-800 rounded-xl flex items-center justify-center shrink-0">
              <div className="w-8 h-6"><ShoeIcon sole="orange" body="stone" variant="runner" /></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-900 dark:text-paper truncate">{it.name}</p>
              <p className="text-xs text-stone-400">{it.note}</p>
            </div>
            <span className="font-mono text-sm text-stone-900 dark:text-paper">{formatINR(it.price)}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 mb-5">
        <div className="flex justify-between text-sm"><span className="text-stone-500 dark:text-stone-400 flex items-center gap-1"><MapPin size={13} /> Address</span><span className="text-stone-900 dark:text-paper text-right w-48">{order.address}</span></div>
        <div className="flex justify-between text-sm"><span className="text-stone-500 dark:text-stone-400 flex items-center gap-1"><Wallet size={13} /> Payment</span><span className="text-stone-900 dark:text-paper">{order.payment}</span></div>
        {order.deliveryNotes && (
          <div className="flex justify-between text-sm"><span className="text-stone-500 dark:text-stone-400 flex items-center gap-1"><Edit3 size={13} /> Note</span><span className="text-stone-900 dark:text-paper text-right w-48">{order.deliveryNotes}</span></div>
        )}
        <div className="flex justify-between text-base font-semibold pt-2 border-t border-dashed border-stone-200 dark:border-ink-700"><span className="text-stone-900 dark:text-paper">Total</span><span className="font-mono text-stone-900 dark:text-paper">{formatINR(order.total)}</span></div>
      </div>

      <button onClick={onOpenChat} className="w-full flex items-center justify-between bg-stone-50 dark:bg-ink-700 rounded-2xl p-4 mb-4">
        <span className="text-sm font-medium text-stone-700 dark:text-paper flex items-center gap-2"><PhoneCall size={15} className="text-marigold-500" /> Need help with this order?</span>
        <ChevronRight size={16} className="text-stone-400" />
      </button>

      <PillButton variant="outline" className="w-full mb-3" onClick={() => onReorder(order)}><RotateCcw size={16} /> Reorder these items</PillButton>

      {order.status === "Processing" && !confirmCancel && (
        <PillButton variant="danger" className="w-full mb-6" onClick={() => setConfirmCancel(true)}><X size={16} /> Cancel order</PillButton>
      )}
      {confirmCancel && (
        <div className="bg-rose-50 dark:bg-rose-900/20 rounded-2xl p-4 mb-6">
          <p className="text-sm text-rose-700 dark:text-rose-300 mb-3">Cancel {order.id}? This can't be undone.</p>
          <div className="flex gap-3">
            <PillButton variant="ghost" className="flex-1" onClick={() => setConfirmCancel(false)}>Keep order</PillButton>
            <PillButton variant="danger" className="flex-1" onClick={() => onCancel(order.id)}>Yes, cancel</PillButton>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------- Wishlist / Notifications ------------------------------- */

function WishlistScreen({ products, onBack, onRemove, onAdd, onOpen, onMoveAll }) {
  return (
    <div className="px-5">
      <TopBar title={`Wishlist (${products.length})`} onBack={onBack}
        right={products.length > 0 && <button onClick={onMoveAll} className="text-xs font-medium text-marigold-600">Move all to cart</button>} />
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart size={32} className="text-stone-300 mb-3" />
          <p className="text-sm font-medium text-stone-700 dark:text-paper">No favorites yet</p>
          <p className="text-xs text-stone-400 mt-1">Tap the heart on any sneaker to save it here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-3 bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-3">
              <button onClick={() => onOpen(p)} className="w-14 h-14 bg-stone-50 dark:bg-ink-800 rounded-xl flex items-center justify-center shrink-0">
                <div className="w-9 h-6"><ShoeIcon sole={p.sole} body={p.body} variant={p.variant} /></div>
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-stone-900 dark:text-paper truncate">{p.name}</p>
                <p className="font-mono text-sm text-stone-500 dark:text-stone-400">{formatINR(p.price)}</p>
              </div>
              <button onClick={() => onAdd(p.id)} className="w-8 h-8 rounded-full bg-marigold-50 dark:bg-marigold-500/10 text-marigold-700 dark:text-marigold-400 flex items-center justify-center" aria-label="Add to cart">
                <ShoppingBag size={14} />
              </button>
              <button onClick={() => onRemove(p.id)} className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-500 flex items-center justify-center" aria-label="Remove from wishlist">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NotificationsScreen({ notifs, onRead, onMarkAll, prefs, setPrefs }) {
  const [filter, setFilter] = useState("All");
  const [showPrefs, setShowPrefs] = useState(false);
  const tabs = ["All", "Orders", "Promo"];
  const kindFor = { Orders: "order", Promo: "promo" };
  const list = notifs.filter((n) => filter === "All" || n.kind === kindFor[filter]);
  return (
    <div className="px-5">
      <TopBar title="Notifications" right={
        <div className="flex items-center gap-3">
          <button onClick={() => setShowPrefs((v) => !v)} aria-label="Notification settings" className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 dark:bg-ink-700"><SlidersHorizontal size={14} /></button>
          <button onClick={onMarkAll} className="text-xs font-medium text-marigold-600 whitespace-nowrap">Mark all read</button>
        </div>
      } />
      {showPrefs && (
        <div className="bg-stone-50 dark:bg-ink-700 rounded-2xl p-4 mb-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-stone-700 dark:text-paper">Order updates</span>
            <button onClick={() => setPrefs((p) => ({ ...p, orders: !p.orders }))} className={`w-10 h-6 rounded-full flex items-center px-0.5 transition ${prefs.orders ? "bg-marigold-500 justify-end" : "bg-stone-200 dark:bg-ink-800 justify-start"}`}>
              <span className="w-5 h-5 rounded-full bg-white block" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-stone-700 dark:text-paper">Promotions & drops</span>
            <button onClick={() => setPrefs((p) => ({ ...p, promos: !p.promos }))} className={`w-10 h-6 rounded-full flex items-center px-0.5 transition ${prefs.promos ? "bg-marigold-500 justify-end" : "bg-stone-200 dark:bg-ink-800 justify-start"}`}>
              <span className="w-5 h-5 rounded-full bg-white block" />
            </button>
          </div>
        </div>
      )}
      <div className="flex gap-2 mb-4">
        {tabs.map((t) => (
          <button key={t} onClick={() => setFilter(t)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full ${filter === t ? "bg-ink-900 text-white" : "bg-stone-100 dark:bg-ink-700 text-stone-500 dark:text-stone-300"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {list.map((n) => (
          <button key={n.id} onClick={() => onRead(n.id)} className="w-full flex items-start gap-3 bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-3 text-left">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${n.kind === "order" ? "bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-300" : "bg-marigold-50 dark:bg-marigold-500/10 text-marigold-600 dark:text-marigold-400"}`}>
              {n.kind === "order" ? <Truck size={16} /> : <Tag size={16} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${n.read ? "text-stone-600 dark:text-stone-400" : "text-stone-900 dark:text-paper font-medium"}`}>{n.title}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400">{n.body}</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-[10px] text-stone-400 whitespace-nowrap">{n.time}</span>
              {!n.read && <span className="w-2 h-2 rounded-full bg-rose-500" />}
            </div>
          </button>
        ))}
        {list.length === 0 && <p className="text-center text-sm text-stone-400 py-10">Nothing here yet.</p>}
      </div>
    </div>
  );
}

/* ------------------------------- Profile / Wallet / Help ------------------------------- */

function ProfileScreen({ editProfile, setEditProfile, onSave, onBack, ordersCount, wishlistCount, walletPoints, dark, setDark, onOpenOrders, onOpenWishlist, onOpenAddresses, onOpenWallet, onOpenHelp, onLogout, showToast }) {
  const set = (k) => (e) => setEditProfile((p) => ({ ...p, [k]: e.target.value }));
  const referralCode = referralCodeFor(editProfile);
  return (
    <div className="px-5">
      <TopBar title="Your profile" onBack={onBack} />
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-ink-900 text-white flex items-center justify-center text-2xl font-semibold mb-3">
          {initialsOf(editProfile.name)}
        </div>
        <div className="flex gap-6">
          <button onClick={onOpenOrders} className="text-center">
            <p className="text-sm font-semibold text-stone-900 dark:text-paper">{ordersCount}</p>
            <p className="text-[10px] text-stone-400">Orders</p>
          </button>
          <button onClick={onOpenWishlist} className="text-center">
            <p className="text-sm font-semibold text-stone-900 dark:text-paper">{wishlistCount}</p>
            <p className="text-[10px] text-stone-400">Wishlist</p>
          </button>
          <button onClick={onOpenWallet} className="text-center">
            <p className="text-sm font-semibold text-stone-900 dark:text-paper">{walletPoints}</p>
            <p className="text-[10px] text-stone-400">Points</p>
          </button>
        </div>
      </div>

      <div className="bg-ink-900 rounded-2xl p-4 mb-5 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-marigold-500/20" />
        <p className="text-marigold-400 text-[11px] font-bold uppercase tracking-wide mb-1 relative z-10">Refer & earn</p>
        <p className="text-white text-sm mb-3 relative z-10">Share your code — you both get 100 wallet points on their first order.</p>
        <div className="flex items-center gap-2 relative z-10">
          <span className="flex-1 bg-white/10 text-white font-mono text-sm px-3 py-2 rounded-xl tracking-wide">{referralCode}</span>
          <button onClick={() => showToast("Referral code copied")} className="bg-marigold-500 text-ink-900 text-xs font-semibold px-3 py-2 rounded-xl">Copy</button>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-4">
        <Field icon={User} label="Full name" value={editProfile.name} onChange={set("name")} />
        <Field icon={Edit3} label="Email" value={editProfile.email} onChange={set("email")} />
        <Field icon={Phone} label="Phone" value={editProfile.phone} onChange={set("phone")} />
        <Field icon={MapPin} label="City" value={editProfile.city} onChange={set("city")} />
      </div>
      <PillButton className="w-full mb-5" onClick={onSave}><Check size={16} /> Save details</PillButton>

      <div className="flex flex-col gap-1 mb-5">
        <button onClick={onOpenAddresses} className="w-full flex items-center justify-between py-3 border-b border-stone-100 dark:border-ink-700">
          <span className="text-sm text-stone-700 dark:text-paper flex items-center gap-2"><MapPin size={16} className="text-stone-400" /> Manage addresses</span>
          <ChevronRight size={16} className="text-stone-300" />
        </button>
        <button onClick={onOpenWallet} className="w-full flex items-center justify-between py-3 border-b border-stone-100 dark:border-ink-700">
          <span className="text-sm text-stone-700 dark:text-paper flex items-center gap-2"><Wallet size={16} className="text-stone-400" /> Wallet & rewards</span>
          <ChevronRight size={16} className="text-stone-300" />
        </button>
        <button onClick={onOpenHelp} className="w-full flex items-center justify-between py-3 border-b border-stone-100 dark:border-ink-700">
          <span className="text-sm text-stone-700 dark:text-paper flex items-center gap-2"><HelpCircle size={16} className="text-stone-400" /> Help & support</span>
          <ChevronRight size={16} className="text-stone-300" />
        </button>
        <div className="w-full flex items-center justify-between py-3">
          <span className="text-sm text-stone-700 dark:text-paper flex items-center gap-2">{dark ? <Moon size={16} className="text-stone-400" /> : <Sun size={16} className="text-stone-400" />} Dark mode</span>
          <button onClick={() => setDark(!dark)} className={`w-10 h-6 rounded-full flex items-center px-0.5 transition ${dark ? "bg-marigold-500 justify-end" : "bg-stone-200 justify-start"}`}>
            <span className="w-5 h-5 rounded-full bg-white block" />
          </button>
        </div>
      </div>

      <PillButton variant="danger" className="w-full mb-4" onClick={onLogout}><LogOut size={16} /> Log out</PillButton>
    </div>
  );
}

function WalletScreen({ points, onBack, profile, showToast, onRedeemCoupon }) {
  const history = [
    { label: "Earned on order #STR1957", amt: "+40", date: "12 Jun" },
    { label: "Redeemed at checkout", amt: "-100", date: "3 Jun" },
    { label: "Welcome bonus", amt: "+50", date: "1 Jun" },
  ];
  const referralCode = referralCodeFor(profile);
  return (
    <div className="px-5">
      <TopBar title="Wallet & rewards" onBack={onBack} />
      <div className="bg-ink-900 rounded-2xl p-5 mb-4 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-marigold-500/20" />
        <p className="text-white/60 text-[11px] font-medium mb-1 relative z-10">Available balance</p>
        <p className="text-white font-display text-3xl tracking-wide relative z-10">{points} pts</p>
        <p className="text-marigold-400 text-xs mt-1 relative z-10">= {formatINR(points)} · earn 2% back on every order</p>
      </div>

      <div className="flex gap-3 mb-5">
        <button onClick={onRedeemCoupon} disabled={points < 100}
          className="flex-1 bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-3 text-left disabled:opacity-40">
          <Gift size={16} className="text-marigold-500 mb-1" />
          <p className="text-xs font-semibold text-stone-800 dark:text-paper">Redeem 100 pts</p>
          <p className="text-[10px] text-stone-400">for a ₹100 coupon</p>
        </button>
        <div className="flex-1 bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-3">
          <Sparkles size={16} className="text-marigold-500 mb-1" />
          <p className="text-xs font-semibold text-stone-800 dark:text-paper">Code: {referralCode}</p>
          <button onClick={() => showToast("Referral code copied")} className="text-[10px] text-marigold-600 font-medium">Copy & share</button>
        </div>
      </div>

      <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">Recent activity</p>
      <div className="flex flex-col gap-2">
        {history.map((h, i) => (
          <div key={i} className="flex items-center justify-between bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-3">
            <div>
              <p className="text-sm text-stone-800 dark:text-paper">{h.label}</p>
              <p className="text-[10px] text-stone-400">{h.date}</p>
            </div>
            <span className={`font-mono text-sm font-semibold ${h.amt.startsWith("+") ? "text-emerald-600" : "text-rose-500"}`}>{h.amt} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HelpScreen({ onBack, showToast, onOpenChat }) {
  const [openIdx, setOpenIdx] = useState(0);
  const [query, setQuery] = useState("");
  const filteredFaqs = FAQS.filter(
    (f) => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="px-5">
      <TopBar title="Help & support" onBack={onBack} />
      <div className="flex gap-3 mb-6">
        <button onClick={onOpenChat} className="flex-1 bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-4 flex flex-col items-center gap-2">
          <MessageCircle size={20} className="text-marigold-500" />
          <span className="text-xs font-medium text-stone-700 dark:text-paper">Live chat</span>
        </button>
        <button onClick={() => showToast("Calling support (demo)")} className="flex-1 bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-4 flex flex-col items-center gap-2">
          <Phone size={20} className="text-marigold-500" />
          <span className="text-xs font-medium text-stone-700 dark:text-paper">Call us</span>
        </button>
        <button onClick={() => showToast("Opening email (demo)")} className="flex-1 bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl p-4 flex flex-col items-center gap-2">
          <Mail size={20} className="text-marigold-500" />
          <span className="text-xs font-medium text-stone-700 dark:text-paper">Email</span>
        </button>
      </div>
      <div className="flex items-center gap-2 bg-stone-100 dark:bg-ink-700 rounded-2xl px-4 py-3 mb-4">
        <Search size={15} className="text-stone-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search help articles..."
          className="bg-transparent text-sm outline-none flex-1 text-stone-800 dark:text-paper placeholder:text-stone-400" />
      </div>
      <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">Frequently asked questions</p>
      <div className="flex flex-col gap-2 mb-6">
        {filteredFaqs.map((f, i) => (
          <div key={f.q} className="bg-white dark:bg-ink-700 border border-stone-100 dark:border-ink-800 rounded-2xl overflow-hidden">
            <button onClick={() => setOpenIdx(openIdx === i ? -1 : i)} className="w-full flex items-center justify-between p-4 text-left">
              <span className="text-sm font-medium text-stone-800 dark:text-paper pr-3">{f.q}</span>
              <ChevronDown size={16} className={`text-stone-400 shrink-0 transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
            </button>
            {openIdx === i && <p className="px-4 pb-4 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">{f.a}</p>}
          </div>
        ))}
        {filteredFaqs.length === 0 && <p className="text-center text-sm text-stone-400 py-6">No matching articles — try live chat instead.</p>}
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange }) {
  return (
    <label className="flex items-center gap-3 bg-stone-100 dark:bg-ink-700 rounded-2xl px-4 py-3">
      <Icon size={16} className="text-stone-400 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-stone-400">{label}</p>
        <input value={value} onChange={onChange} className="bg-transparent text-sm text-stone-800 dark:text-paper outline-none w-full" />
      </div>
    </label>
  );
}
