import coffeeSignature from "@/assets/coffee-signature.jpg";
import coffeeBrazil from "@/assets/coffee-brazil.jpg";
import coffeeEthiopia from "@/assets/coffee-ethiopia.jpg";
import coffeeColombia from "@/assets/coffee-colombia.jpg";
import machinePrimo from "@/assets/machine-primo.jpg";
import machineUno from "@/assets/machine-uno.jpg";
import machineOffice from "@/assets/machine-office.jpg";
import machineHoreca from "@/assets/machine-horeca.jpg";
import accGrinder from "@/assets/acc-grinder.jpg";
import accChemistry from "@/assets/acc-chemistry.jpg";

export type Prices = { rub: number; uzs: number };

export type Machine = {
  id: string;
  slug: string;
  kind: "machine" | "accessory";
  name: { ru: string; uz: string };
  tagline: { ru: string; uz: string };
  description: { ru: string; uz: string };
  rent: Prices; // monthly
  freeThresholdKg: number;
  specs: { label: { ru: string; uz: string }; value: { ru: string; uz: string } }[];
  gradient: string;
  image: string;
};

export type Coffee = {
  id: string;
  slug: string;
  name: { ru: string; uz: string };
  tagline: { ru: string; uz: string };
  description: { ru: string; uz: string };
  pricePerKg: Prices;
  notes: { ru: string; uz: string }[];
  roast: { ru: string; uz: string };
  gradient: string;
};

export const machines: Machine[] = [
  {
    id: "m1",
    slug: "qave-primo-2",
    kind: "machine",
    name: { ru: "QAVE Primo 2", uz: "QAVE Primo 2" },
    tagline: { ru: "Двухгруппная для кофейни", uz: "Kafe uchun ikki guruhli" },
    description: {
      ru: "Профессиональная двухгруппная эспрессо-машина для кофеен с потоком до 400 чашек в день. Стабильная температура группы и мощный паровой контур.",
      uz: "Kuniga 400 chashkagacha oqim uchun professional ikki guruhli espresso-mashinasi.",
    },
    rent: { rub: 15000, uzs: 2000000 },
    freeThresholdKg: 10,
    specs: [
      { label: { ru: "Группы", uz: "Guruhlar" }, value: { ru: "2", uz: "2" } },
      { label: { ru: "Бойлер", uz: "Bo‘yler" }, value: { ru: "11 л", uz: "11 l" } },
      { label: { ru: "Мощность", uz: "Quvvat" }, value: { ru: "3.2 кВт", uz: "3.2 kVt" } },
    ],
    gradient: "linear-gradient(135deg,#6b3a2a 0%, #2c1a0e 100%)",
  },
  {
    id: "m2",
    slug: "qave-uno",
    kind: "machine",
    name: { ru: "QAVE Uno", uz: "QAVE Uno" },
    tagline: { ru: "Компактная для take away", uz: "Take away uchun kompakt" },
    description: {
      ru: "Одногруппная эспрессо-машина для небольших точек, кофе-баров и take away. Быстрый прогрев и низкое энергопотребление.",
      uz: "Kichik nuqtalar va take away uchun bir guruhli espresso-mashinasi.",
    },
    rent: { rub: 9000, uzs: 1200000 },
    freeThresholdKg: 6,
    specs: [
      { label: { ru: "Группы", uz: "Guruhlar" }, value: { ru: "1", uz: "1" } },
      { label: { ru: "Бойлер", uz: "Bo‘yler" }, value: { ru: "6 л", uz: "6 l" } },
      { label: { ru: "Мощность", uz: "Quvvat" }, value: { ru: "2.1 кВт", uz: "2.1 kVt" } },
    ],
    gradient: "linear-gradient(135deg,#a0522d 0%, #6b3a2a 100%)",
  },
  {
    id: "m3",
    slug: "qave-office",
    kind: "machine",
    name: { ru: "QAVE Office", uz: "QAVE Office" },
    tagline: { ru: "Суперавтомат для офиса", uz: "Ofis uchun superavtomat" },
    description: {
      ru: "Автоматическая кофемашина для офисов на 20–120 сотрудников. Пресет-меню и обслуживание одной кнопкой.",
      uz: "20–120 xodimli ofislar uchun avtomatik kofemashina.",
    },
    rent: { rub: 12000, uzs: 1600000 },
    freeThresholdKg: 8,
    specs: [
      { label: { ru: "Чашек/день", uz: "Chashka/kun" }, value: { ru: "до 150", uz: "150 gacha" } },
      { label: { ru: "Молоко", uz: "Sut" }, value: { ru: "автоконтур", uz: "avtomatik" } },
      { label: { ru: "Меню", uz: "Menyu" }, value: { ru: "12 рецептов", uz: "12 retsept" } },
    ],
    gradient: "linear-gradient(135deg,#7a6857 0%, #2c1a0e 100%)",
  },
  {
    id: "m4",
    slug: "qave-horeca-pro",
    kind: "machine",
    name: { ru: "QAVE HoReCa Pro", uz: "QAVE HoReCa Pro" },
    tagline: { ru: "Трёхгруппная для ресторанов", uz: "Restoranlar uchun uch guruhli" },
    description: {
      ru: "Флагман для высоконагруженных заведений с потоком до 800 чашек в день. PID-контроль каждой группы.",
      uz: "Yuqori yuklamali muassasalar uchun flagman model.",
    },
    rent: { rub: 22000, uzs: 2900000 },
    freeThresholdKg: 15,
    specs: [
      { label: { ru: "Группы", uz: "Guruhlar" }, value: { ru: "3", uz: "3" } },
      { label: { ru: "Бойлер", uz: "Bo‘yler" }, value: { ru: "17 л", uz: "17 l" } },
      { label: { ru: "PID", uz: "PID" }, value: { ru: "по группам", uz: "guruh bo‘yicha" } },
    ],
    gradient: "linear-gradient(135deg,#2c1a0e 0%, #6b3a2a 100%)",
  },
  {
    id: "a1",
    slug: "grinder-mono",
    kind: "accessory",
    name: { ru: "Кофемолка Mono", uz: "Mono tegirmoni" },
    tagline: { ru: "Прямой помол под эспрессо", uz: "Espresso uchun to‘g‘ridan-to‘g‘ri maydalash" },
    description: { ru: "Профессиональная кофемолка с прямым помолом и таймером порций.", uz: "Professional tegirmon." },
    rent: { rub: 4000, uzs: 550000 },
    freeThresholdKg: 5,
    specs: [
      { label: { ru: "Жернова", uz: "Toshlar" }, value: { ru: "64 мм", uz: "64 mm" } },
      { label: { ru: "Таймер", uz: "Taymer" }, value: { ru: "да", uz: "ha" } },
    ],
    gradient: "linear-gradient(135deg,#c4b8a8 0%, #7a6857 100%)",
  },
  {
    id: "a2",
    slug: "chemistry-kit",
    kind: "accessory",
    name: { ru: "Комплект химии", uz: "Kimyo to‘plami" },
    tagline: { ru: "Уход за оборудованием", uz: "Uskunani parvarishlash" },
    description: { ru: "Средства для чистки групп, молочных контуров и декальцинации.", uz: "Tozalash vositalari to‘plami." },
    rent: { rub: 2500, uzs: 350000 },
    freeThresholdKg: 3,
    specs: [
      { label: { ru: "Комплект", uz: "To‘plam" }, value: { ru: "на 3 мес", uz: "3 oy" } },
    ],
    gradient: "linear-gradient(135deg,#ede8df 0%, #c4b8a8 100%)",
  },
];

export const coffees: Coffee[] = [
  {
    id: "c1",
    slug: "signature-espresso",
    name: { ru: "Signature Espresso", uz: "Signature Espresso" },
    tagline: { ru: "Универсальный бленд для эспрессо", uz: "Espresso uchun universal blend" },
    description: { ru: "Плотное тело, шоколад и орех. Отлично работает с молоком.", uz: "Zich tan, shokolad va yong‘oq. Sut bilan zo‘r." },
    pricePerKg: { rub: 1800, uzs: 250000 },
    notes: [
      { ru: "молочный шоколад", uz: "sutli shokolad" },
      { ru: "фундук", uz: "findiq" },
      { ru: "карамель", uz: "karamel" },
    ],
    roast: { ru: "тёмная", uz: "quyuq" },
    gradient: "linear-gradient(135deg,#6b3a2a 0%, #a0522d 100%)",
  },
  {
    id: "c2",
    slug: "brazil-santos",
    name: { ru: "Brazil Santos", uz: "Brazil Santos" },
    tagline: { ru: "Моносорт из Бразилии", uz: "Braziliyadan monosort" },
    description: { ru: "Мягкий вкус с нотами какао и ореха. База большинства блендов.", uz: "Yumshoq ta’m." },
    pricePerKg: { rub: 1600, uzs: 220000 },
    notes: [
      { ru: "какао", uz: "kakao" },
      { ru: "миндаль", uz: "bodom" },
    ],
    roast: { ru: "средняя", uz: "o‘rta" },
    gradient: "linear-gradient(135deg,#a0522d 0%, #6b3a2a 100%)",
  },
  {
    id: "c3",
    slug: "ethiopia-yirgacheffe",
    name: { ru: "Ethiopia Yirgacheffe", uz: "Ethiopia Yirgacheffe" },
    tagline: { ru: "Фильтр моносорт", uz: "Filtr uchun monosort" },
    description: { ru: "Цитрус, жасмин, чайное послевкусие. Для фильтр-кофе и альтернативы.", uz: "Sitrus, yasemin, choyli keyingi ta’m." },
    pricePerKg: { rub: 2400, uzs: 320000 },
    notes: [
      { ru: "лимон", uz: "limon" },
      { ru: "жасмин", uz: "yasemin" },
      { ru: "чёрный чай", uz: "qora choy" },
    ],
    roast: { ru: "светлая", uz: "yorug‘" },
    gradient: "linear-gradient(135deg,#c4b8a8 0%, #a0522d 100%)",
  },
  {
    id: "c4",
    slug: "colombia-supremo",
    name: { ru: "Colombia Supremo", uz: "Colombia Supremo" },
    tagline: { ru: "Сбалансированный моносорт", uz: "Balanslangan monosort" },
    description: { ru: "Ягодная кислотность, ореховая сладость. Универсально для эспрессо и капучино.", uz: "Rezavor kislotalik, yong‘oqli shirinlik." },
    pricePerKg: { rub: 1900, uzs: 260000 },
    notes: [
      { ru: "красное яблоко", uz: "qizil olma" },
      { ru: "грецкий орех", uz: "yong‘oq" },
    ],
    roast: { ru: "средняя", uz: "o‘rta" },
    gradient: "linear-gradient(135deg,#7a6857 0%, #6b3a2a 100%)",
  },
];
