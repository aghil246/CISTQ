import type { LucideIcon } from "lucide-react"
import {
  Boxes,
  Cpu,
  HardDrive,
  Network,
  Radio,
  Router,
  Server,
  ShieldCheck,
  Wifi,
} from "lucide-react"

export type CategoryId =
  | "routers"
  | "switches"
  | "firewalls"
  | "wireless"
  | "servers"
  | "storage"

export type Category = {
  id: CategoryId
  title: string
  tagline: string
  icon: LucideIcon
  /** Number of listed products, shown on the card. */
  count: number
  /** Two-column links opened from the mega menu. */
  menu: { title: string; items: string[] }[]
}

export type Product = {
  id: string
  name: string
  brand: string
  model: string
  category: CategoryId
  /** Price in Iranian Toman. */
  price: number
  /** Pre-discount price in Toman, when the item is on sale. */
  oldPrice?: number
  rating: number
  reviews: number
  stock: number
  tags: ("bestseller" | "new" | "offer" | "refurbished")[]
  icon: LucideIcon
  blurb: string
}

export const shop = {
  name: "شاپ‌ایکس",
  latinName: "ShopX",
  tagline: "تجهیزات شبکه، سرور و ذخیره‌سازی",
  phone: "۰۲۱-۹۱۰۰۸۸۴۵",
  phoneHref: "+982191008845",
  email: "sales@shopx.ir",
  address: "تهران، خیابان ولیعصر، برج فناوری، طبقه ۱۲",
  hours: "شنبه تا چهارشنبه ۹ تا ۱۸ — پنجشنبه ۹ تا ۱۳",
  socials: [
    { label: "اینستاگرام", href: "#" },
    { label: "لینکدین", href: "#" },
    { label: "تلگرام", href: "#" },
    { label: "یوتیوب", href: "#" },
  ],
} as const

export const heroStats = [
  { value: "۱۸,۰۰۰+", label: "مشتری سازمانی" },
  { value: "۲۰۰+", label: "کشور و منطقه" },
  { value: "۲۰سال", label: "سابقه در بازار ICT" },
  { value: "۲۴/۷", label: "پشتیبانی فنی" },
] as const

export const categories: Category[] = [
  {
    id: "routers",
    title: "روترها",
    tagline: "مسیریابی سازمانی و اپراتوری",
    icon: Router,
    count: 1240,
    menu: [
      {
        title: "بر اساس برند",
        items: ["سیسکو", "هوآوی", "جونیپر", "میکروتیک", "یوبیکوتی"],
      },
      {
        title: "بر اساس کاربرد",
        items: ["روتر سازمانی", "روتر اپراتوری", "روتر صنعتی", "گیت‌وی ۵G", "روتر بی‌سیم"],
      },
    ],
  },
  {
    id: "switches",
    title: "سوئیچ‌ها",
    tagline: "اکسس، تجمیع و هسته",
    icon: Network,
    count: 2130,
    menu: [
      {
        title: "لایه شبکه",
        items: ["سوئیچ اکسس", "سوئیچ تجمیع", "سوئیچ هسته", "سوئیچ دیتاسنتر"],
      },
      {
        title: "مدیریت",
        items: ["مدیریت‌شده", "هوشمند", "بدون مدیریت", "PoE و PoE+"],
      },
    ],
  },
  {
    id: "firewalls",
    title: "فایروال و امنیت",
    tagline: "امنیت شبکه و تهدیدات",
    icon: ShieldCheck,
    count: 640,
    menu: [
      {
        title: "دسته‌بندی",
        items: ["فایروال سازمانی", "Next-Gen Firewall", "UTM", "VPN Gateway"],
      },
      {
        title: "برند",
        items: ["فورتی‌نت", "پالو آلتو", "سیسکو", "سوفوس", "چک‌پوینت"],
      },
    ],
  },
  {
    id: "wireless",
    title: "شبکه بی‌سیم",
    tagline: "اکسس‌پوینت و کنترلر",
    icon: Wifi,
    count: 890,
    menu: [
      {
        title: "محصولات",
        items: ["اکسس‌پوینت", "کنترلر بی‌سیم", "آنتن", "پل بی‌سیم"],
      },
      {
        title: "استاندارد",
        items: ["Wi-Fi 6", "Wi-Fi 6E", "Wi-Fi 7", "Mesh"],
      },
    ],
  },
  {
    id: "servers",
    title: "سرورها",
    tagline: "رک، برجی و بلید",
    icon: Server,
    count: 470,
    menu: [
      {
        title: "فرم فاکتور",
        items: ["Rack", "Tower", "Blade", "Edge"],
      },
      {
        title: "برند",
        items: ["اچ‌پی‌ای", "دل", "لنوو", "سوپرمیکرو", "اینتل"],
      },
    ],
  },
  {
    id: "storage",
    title: "ذخیره‌سازی",
    tagline: "NAS، SAN و راه‌حل پشتیبان",
    icon: HardDrive,
    count: 380,
    menu: [
      {
        title: "نوع",
        items: ["استوریج شبکه NAS", "SAN", "All-Flash", "تکنولوژی نوار (Tape)"],
      },
      {
        title: "دسترسی",
        items: ["سینولوژی", "دل EMC", "اچ‌پی‌ای", "نت‌اپ", "QNAP"],
      },
    ],
  },
]

export const products: Product[] = [
  {
    id: "cisco-isr-4331",
    name: "روتر سیسکو مدل ISR 4331",
    brand: "Cisco",
    model: "ISR4331/K9",
    category: "routers",
    price: 418_000_000,
    oldPrice: 459_000_000,
    rating: 4.8,
    reviews: 126,
    stock: 8,
    tags: ["bestseller", "offer"],
    icon: Router,
    blurb: "روتر ماژولار سازمانی با پشتیبانی از سرویس‌های صوتی، ویدیو و امنیت یکپارچه.",
  },
  {
    id: "mikrotik-ccr2004",
    name: "روتر میکروتیک مدل CCR2004-1G-12S+2XS",
    brand: "MikroTik",
    model: "CCR2004-1G-12S+2XS",
    category: "routers",
    price: 196_500_000,
    rating: 4.7,
    reviews: 88,
    stock: 21,
    tags: ["bestseller"],
    icon: Router,
    blurb: "روتر ابری با پردازنده ۴ هسته‌ای و ۱۶ پورت ۱۰ گیگابیت برای شبکه‌های پرترافیک.",
  },
  {
    id: "huawei-ar617vw",
    name: "روتر هوآوی مدل AR617VW",
    brand: "Huawei",
    model: "AR617VW-LTE4EA",
    category: "routers",
    price: 84_900_000,
    oldPrice: 92_000_000,
    rating: 4.5,
    reviews: 64,
    stock: 35,
    tags: ["offer"],
    icon: Router,
    blurb: "روتر شاخه‌ای با مودم LTE داخلی و وای‌فای دوباند برای دفاتر کوچک.",
  },
  {
    id: "cisco-c9200-24t",
    name: "سوئیچ سیسکو کاتالیست ۹۲۰۰ مدل ۲۴ پورت",
    brand: "Cisco",
    model: "C9200-24T-E",
    category: "switches",
    price: 268_400_000,
    rating: 4.9,
    reviews: 73,
    stock: 6,
    tags: ["new", "bestseller"],
    icon: Network,
    blurb: "سوئیچ مدیریت‌شده لایه ۲ و ۳ با پشته‌پذیری و پشتیبانی از DNA Center.",
  },
  {
    id: "aruba-2930f-jl262a",
    name: "سوئیچ آروبا مدل 2930F ۴۸ پورت",
    brand: "Aruba",
    model: "JL262A",
    category: "switches",
    price: 96_800_000,
    oldPrice: 112_500_000,
    rating: 4.6,
    reviews: 41,
    stock: 14,
    tags: ["offer"],
    icon: Network,
    blurb: "سوئیچ اکسس PoE+ با ۴ پورت SFP+، مناسب دفتر و شعبه.",
  },
  {
    id: "mikrotik-crs328",
    name: "سوئیچ میکروتیک مدل CRS328-24P-4S+RM",
    brand: "MikroTik",
    model: "CRS328-24P-4S+RM",
    category: "switches",
    price: 63_200_000,
    rating: 4.4,
    reviews: 57,
    stock: 42,
    tags: ["bestseller"],
    icon: Network,
    blurb: "سوئیچ ۲۴ پورت PoE با ۴ پورت SFP+ و ظرفیت کلیدزنی بالا.",
  },
  {
    id: "fortigate-60f",
    name: "فایروال فورتی‌نت مدل FortiGate 60F",
    brand: "Fortinet",
    model: "FG-60F",
    category: "firewalls",
    price: 132_900_000,
    oldPrice: 149_000_000,
    rating: 4.8,
    reviews: 152,
    stock: 11,
    tags: ["bestseller", "offer"],
    icon: ShieldCheck,
    blurb: "فایروال نسل جدید با موتور SD-WAN و IPS برای کسب‌وکارهای کوچک و متوسط.",
  },
  {
    id: "paloalto-pa440",
    name: "فایروال پالو آلتو مدل PA-440",
    brand: "Palo Alto",
    model: "PA-440",
    category: "firewalls",
    price: 289_000_000,
    rating: 4.7,
    reviews: 39,
    stock: 4,
    tags: ["new"],
    icon: ShieldCheck,
    blurb: "فایروال سازمانی با بازرسی عمیق بسته و محافظت پیشرفته در برابر تهدیدات.",
  },
  {
    id: "ubiquiti-u6-pro",
    name: "اکسس‌پوینت یوبیکوتی مدل UniFi U6 Pro",
    brand: "Ubiquiti",
    model: "U6-Pro",
    category: "wireless",
    price: 27_600_000,
    rating: 4.9,
    reviews: 210,
    stock: 63,
    tags: ["bestseller"],
    icon: Radio,
    blurb: "اکسس‌پوینت Wi-Fi 6 دوباند با پشتیبانی بیش از ۳۰۰ کاربر همزمان.",
  },
  {
    id: "aruba-ap515",
    name: "اکسس‌پوینت آروبا مدل 515",
    brand: "Aruba",
    model: "R7J40A",
    category: "wireless",
    price: 48_400_000,
    oldPrice: 52_000_000,
    rating: 4.6,
    reviews: 47,
    stock: 0,
    tags: ["offer"],
    icon: Radio,
    blurb: "اکسس‌پوینت Wi-Fi 6 با آنتن داخلی و نرخ داده تا ۴.۸ گیگابیت بر ثانیه.",
  },
  {
    id: "hpe-dl380-gen10",
    name: "سرور اچ‌پی‌ای ProLiant DL380 Gen10",
    brand: "HPE",
    model: "P20249-B21",
    category: "servers",
    price: 1_240_000_000,
    rating: 4.8,
    reviews: 28,
    stock: 3,
    tags: ["new"],
    icon: Server,
    blurb: "سرور رک ۲U با پشتیبانی از پردازنده‌های Xeon Scalable و مدیریت iLO 5.",
  },
  {
    id: "dell-r750",
    name: "سرور دل PowerEdge R750",
    brand: "Dell",
    model: "R750-4314",
    category: "servers",
    price: 1_090_000_000,
    oldPrice: 1_185_000_000,
    rating: 4.7,
    reviews: 33,
    stock: 5,
    tags: ["offer", "bestseller"],
    icon: Server,
    blurb: "سرور رک ۲U دوسوکته با پشتیبانی از GPU و حافظه پرسرعت DDR4.",
  },
  {
    id: "synology-rs1221",
    name: "استوریج سینولوژی مدل RS1221+",
    brand: "Synology",
    model: "RS1221+",
    category: "storage",
    price: 214_000_000,
    rating: 4.7,
    reviews: 51,
    stock: 9,
    tags: ["bestseller"],
    icon: HardDrive,
    blurb: "NAS رکمونت ۸ بای با پشتیبانی NVMe Cache و اکوسیستم DSM.",
  },
  {
    id: "dell-me4",
    name: "استوریج دل EMC PowerVault ME4",
    brand: "Dell",
    model: "ME4024",
    category: "storage",
    price: 1_680_000_000,
    rating: 4.6,
    reviews: 17,
    stock: 2,
    tags: ["new"],
    icon: HardDrive,
    blurb: "آرایه ذخیره‌سازی SAN با کارایی بالا برای مجازی‌سازی و پایگاه داده.",
  },
]

export const brands = [
  "Cisco",
  "Huawei",
  "Juniper",
  "HPE",
  "Dell",
  "Fortinet",
  "Aruba",
  "Ubiquiti",
  "MikroTik",
  "Palo Alto",
  "Synology",
  "D-Link",
] as const

export const valueProps = [
  {
    title: "پشتیبانی فنی رایگان",
    description: "تیم مهندسی ما پیش از خرید و پس از آن در کنار شماست.",
    icon: Cpu,
  },
  {
    title: "گارانتی اصالت کالا",
    description: "همه محصولات اورجینال با ضمانت کتبی و خدمات پس از فروش.",
    icon: ShieldCheck,
  },
  {
    title: "ارسال سریع و مطمئن",
    description: "ارسال آمن به سراسر کشور و بسته‌بندی تخصصی تجهیزات.",
    icon: Boxes,
  },
  {
    title: "موجودی آماده ارسال",
    description: "بیش از بیست میلیون دلار تجهیزات با موجودی واقعی انبار.",
    icon: Server,
  },
] as const

export const footerLinks = [
  {
    title: "دسته‌بندی‌ها",
    links: [
      "روترها",
      "سوئیچ‌ها",
      "فایروال و امنیت",
      "شبکه بی‌سیم",
      "سرورها",
      "ذخیره‌سازی",
    ],
  },
  {
    title: "خدمات مشتریان",
    links: [
      "پیگیری سفارش",
      "شرایط گارانتی",
      "رویه بازگشت کالا",
      "روش‌های ارسال",
      "سوالات متداول",
    ],
  },
  {
    title: "شاپ‌ایکس",
    links: ["درباره ما", "تماس با ما", "فرصت‌های شغلی", "وبلاگ فنی", "نمایندگی‌ها"],
  },
  {
    title: "راهنما",
    links: [
      "راهنمای خرید",
      "مشاوره تخصصی",
      "مقایسه محصولات",
      "پیش‌فاکتور سازمانی",
      "شرایط استفاده",
    ],
  },
] as const

export const trustBadges = [
  { label: "ضمانت اصل بودن کالا", icon: ShieldCheck },
  { label: "پرداخت امن", icon: Cpu },
  { label: "ارسال به سراسر کشور", icon: Boxes },
] as const

export function getCategory(id: CategoryId): Category {
  return categories.find((category) => category.id === id) ?? categories[0]!
}

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}
