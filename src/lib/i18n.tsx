import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "ru" | "uz";

type Dict = Record<string, { ru: string; uz: string }>;

export const dict: Dict = {
  // nav
  nav_coffee: { ru: "Кофе", uz: "Kofe" },
  nav_machines: { ru: "Кофемашины", uz: "Kofemashinalar" },
  nav_training: { ru: "Обучение бариста", uz: "Barista o‘qitish" },
  nav_catalog: { ru: "Каталог", uz: "Katalog" },
  nav_contacts: { ru: "Контакты", uz: "Kontaktlar" },
  nav_b2b: { ru: "Для бизнеса", uz: "Biznes uchun" },
  nav_b2b_soon: { ru: "Личный кабинет — скоро", uz: "Shaxsiy kabinet — tez orada" },
  cta_request: { ru: "Заявка", uz: "Ariza" },
  // hero
  hero_badge: { ru: "Собственная обжарка • оборудование • сервис", uz: "Xususiy qovurish • uskuna • xizmat" },
  hero_title: { ru: "Кофе чемпионской обжарки и кофемашины для бизнеса", uz: "Chempionlar darajasidagi kofe va biznes uchun kofemashinalar" },
  hero_sub: {
    ru: "Поставляем свежеобжаренный кофе для кофеен, ресторанов, отелей и офисов. Продаём и сдаём в аренду профессиональные кофемашины, настраиваем вкус и сопровождаем оборудование после запуска.",
    uz: "Kafelar, restoranlar, mehmonxonalar va ofislar uchun yangi qovurilgan kofe yetkazamiz. Professional kofemashinalarni sotamiz va ijaraga beramiz, ta’mni sozlaymiz va uskunani ishga tushirgandan so‘ng qo‘llab-quvvatlaymiz.",
  },
  hero_cta1: { ru: "Получить предложение", uz: "Taklif olish" },
  hero_cta2: { ru: "Кофемашина для бизнеса", uz: "Biznes uchun kofemashina" },
  hero_right_title: { ru: "Что нужно вашему бизнесу?", uz: "Biznesingizga nima kerak?" },
  hero_c1_t: { ru: "Выбрать кофе", uz: "Kofeni tanlash" },
  hero_c1_s: { ru: "Бленды, моносорта и подбор вкуса под вашу аудиторию.", uz: "Blendlar, monosortlar va auditoriya uchun ta’m tanlash." },
  hero_c2_t: { ru: "Выбрать кофемашину", uz: "Kofemashinani tanlash" },
  hero_c2_s: { ru: "Оборудование для потока гостей.", uz: "Mehmonlar oqimi uchun uskuna." },
  hero_c3_t: { ru: "Заказать кофебар", uz: "Kofe-bar buyurtma qilish" },
  hero_c3_s: { ru: "Выездные мероприятия.", uz: "Ko‘chma tadbirlar." },
  hero_c4_t: { ru: "Смотреть каталог", uz: "Katalogni ko‘rish" },
  hero_c4_s: { ru: "Кофе и кофемашины.", uz: "Kofe va kofemashinalar." },

  // section 2
  s2_title: { ru: "Всё, что нужно бизнесу для стабильного вкусного кофе", uz: "Barqaror mazali kofe uchun biznesga kerakli hamma narsa" },
  s2_desc: { ru: "QAVE — не просто магазин кофе, а профессиональный партнёр для заведений.", uz: "QAVE — shunchaki kofe do‘koni emas, balki muassasalar uchun professional hamkor." },
  s2_c1_t: { ru: "Обжариваем кофе", uz: "Kofeni qovuramiz" },
  s2_c1_x: { ru: "Собственная обжарка, стабильный вкус, бленды и моносорта под разные форматы напитков.", uz: "Xususiy qovurish, barqaror ta’m, turli formatdagi ichimliklar uchun blend va monosortlar." },
  s2_c2_t: { ru: "Продаём оборудование", uz: "Uskunalarni sotamiz" },
  s2_c2_x: { ru: "Профессиональные кофемашины, кофемолки, химия и аксессуары для кофеен, ресторанов и офисов.", uz: "Kafelar, restoranlar va ofislar uchun professional kofemashinalar, tegirmonlar, kimyo va aksessuarlar." },
  s2_c3_t: { ru: "Даём в аренду", uz: "Ijaraga beramiz" },
  s2_c3_x: { ru: "Подбираем кофемашину под бизнес и предлагаем аренду при регулярной закупке кофе.", uz: "Biznes uchun kofemashinani tanlaymiz va muntazam kofe xaridida ijara taklif qilamiz." },

  // section 3
  s3_sub: { ru: "Чемпионская обжарка", uz: "Chempion qovurish" },
  s3_title: { ru: "Кофе, за которым возвращаются", uz: "Qaytib keladigan kofe" },
  s3_text: {
    ru: "Мы работаем с зелёным зерном из Бразилии, Колумбии, Эфиопии и других кофейных регионов. Подбираем профиль обжарки так, чтобы вкус был стабильным каждый день — от первой настройки кофемашины до ежедневной работы бара.",
    uz: "Braziliya, Kolumbiya, Efiopiya va boshqa kofe mintaqalaridan yashil don bilan ishlaymiz. Qovurish profilini shunday tanlaymizki, ta’m har kuni barqaror bo‘lsin.",
  },
  s3_caption: { ru: "Fresh-контроль обжарки, партии и вкуса в чашке", uz: "Qovurish, partiya va chashkadagi ta’mni nazorat qilish" },
  s3_pro1: { ru: "Стабильность вкуса от партии к партии", uz: "Partiyalararo barqaror ta’m" },
  s3_pro2: { ru: "Обжарка под конкретное оборудование", uz: "Uskuna uchun mos qovurish" },
  s3_pro3: { ru: "Гибкие форматы упаковки для HoReCa", uz: "HoReCa uchun moslashuvchan qadoq" },

  // section 4 machines
  s4_sub: { ru: "Оборудование", uz: "Uskunalar" },
  s4_title: { ru: "Профессиональные кофемашины для бизнеса", uz: "Biznes uchun professional kofemashinalar" },
  s4_text: { ru: "Помогаем выбрать модель под формат заведения, количество чашек в день и требования к качеству напитка.", uz: "Muassasa formati, kunlik chashkalar soni va sifat talablariga qarab modelni tanlashga yordam beramiz." },
  s4_c1: { ru: "Кофемашины для кофеен и ресторанов", uz: "Kafelar va restoranlar uchun kofemashinalar" },
  s4_c2: { ru: "Кофемолки, химия и аксессуары", uz: "Tegirmonlar, kimyo va aksessuarlar" },
  s4_btn1: { ru: "Подобрать кофемашину", uz: "Kofemashina tanlash" },
  s4_btn2: { ru: "Смотреть каталог", uz: "Katalogni ko‘rish" },

  // section 5 rental
  s5_sub: { ru: "Аренда оборудования", uz: "Uskuna ijarasi" },
  s5_title: { ru: "Кофемашина в аренду при закупке кофе", uz: "Kofe xaridida kofemashina ijarasi" },
  s5_text: { ru: "Профессиональное оборудование без крупных стартовых вложений — для кофеен, ресторанов, отелей, офисов и точек take away.", uz: "Katta boshlang‘ich sarmoyasiz professional uskuna — kafelar, restoranlar, mehmonxonalar, ofislar va take-away nuqtalari uchun." },
  s5_step1_t: { ru: "Шаг 1: Заявка", uz: "1-qadam: Ariza" },
  s5_step1_x: { ru: "Вы рассказываете о формате заведения и примерном количестве чашек в день.", uz: "Muassasa formati va kunlik chashkalar soni haqida gapirasiz." },
  s5_step2_t: { ru: "Шаг 2: Подбор", uz: "2-qadam: Tanlov" },
  s5_step2_x: { ru: "Мы рекомендуем кофемашину, кофемолку и зерно под вашу задачу.", uz: "Vazifangizga mos kofemashina, tegirmon va donni tavsiya qilamiz." },
  s5_step3_t: { ru: "Шаг 3: Условия", uz: "3-qadam: Shartlar" },
  s5_step3_x: { ru: "Согласуем объём закупки кофе, аренду, сервис и сроки сотрудничества.", uz: "Kofe xarid hajmi, ijara, xizmat va hamkorlik muddatlarini kelishamiz." },
  s5_step4_t: { ru: "Шаг 4: Запуск", uz: "4-qadam: Ishga tushirish" },
  s5_step4_x: { ru: "Устанавливаем оборудование, настраиваем вкус и сопровождаем работу.", uz: "Uskunani o‘rnatamiz, ta’mni sozlaymiz va ishni qo‘llab-quvvatlaymiz." },

  // section 6 catering
  s6_title: { ru: "Выездной кофе-бар для мероприятий", uz: "Tadbirlar uchun ko‘chma kofe-bar" },
  s6_text: { ru: "Приезжаем на события с профессиональным оборудованием, бариста и свежеобжаренным кофе QAVE. Готовим напитки для гостей, проводим дегустации и помогаем познакомить аудиторию с брендом.", uz: "Tadbirlarga professional uskuna, barista va yangi qovurilgan QAVE kofesi bilan boramiz." },
  s6_c1_t: { ru: "Профессиональные бариста", uz: "Professional baristalar" },
  s6_c1_x: { ru: "Опытная команда для любого потока гостей.", uz: "Har qanday mehmonlar oqimi uchun tajribali jamoa." },
  s6_c2_t: { ru: "Полный сет оборудования", uz: "To‘liq uskunalar to‘plami" },
  s6_c2_x: { ru: "Привозим и настраиваем всё на месте.", uz: "Hammasini olib kelamiz va joyida sozlaymiz." },
  s6_c3_t: { ru: "Меню под ваш бренд", uz: "Sizning brendingiz uchun menyu" },
  s6_c3_x: { ru: "Авторские напитки и брендированные стаканы.", uz: "Mualliflik ichimliklari va brend stakanlar." },
  s6_btn1: { ru: "Заказать", uz: "Buyurtma qilish" },
  s6_btn2: { ru: "Выбрать кофе для события", uz: "Tadbir uchun kofe tanlash" },

  // section 7 training
  s7_sub: { ru: "Обучение бариста", uz: "Barista o‘qitish" },
  s7_title: { ru: "Обучаем команду клиента готовить кофе правильно", uz: "Mijoz jamoasini kofe tayyorlashga o‘rgatamiz" },
  s7_text: { ru: "Помогаем бариста и сотрудникам заведений уверенно работать с кофе, оборудованием и рецептурами. В зависимости от условий сотрудничества обучение может быть платным или входить в партнёрский пакет.", uz: "Baristalar va muassasa xodimlariga kofe va uskuna bilan ishonchli ishlashga yordam beramiz." },
  s7_pro1: { ru: "Теория и практика на вашем оборудовании", uz: "Sizning uskunangizda nazariya va amaliyot" },
  s7_pro2: { ru: "Рецептуры под ваш бренд", uz: "Sizning brendingiz uchun retseptlar" },
  s7_pro3: { ru: "Поддержка бариста после запуска", uz: "Ishga tushirilgandan keyin baristalarni qo‘llab-quvvatlash" },

  // section 8 coffee catalog
  s8_sub: { ru: "Каталог кофе", uz: "Kofe katalogi" },
  s8_title: { ru: "Основные позиции для стабильной работы кофейни", uz: "Kafeni barqaror ishlatish uchun asosiy pozitsiyalar" },
  s8_text: { ru: "Для B2B-каталога важны вкус, назначение и формат использования, а не только название и цена.", uz: "B2B katalog uchun ta’m, maqsad va foydalanish formati muhim." },
  s8_view_all: { ru: "Смотреть весь каталог", uz: "Butun katalogni ko‘rish" },

  // section 9 for who
  s9_sub: { ru: "Для кого", uz: "Kimlar uchun" },
  s9_title: { ru: "Решения под разные форматы бизнеса", uz: "Turli biznes formatlari uchun yechimlar" },
  s9_1: { ru: "Кофейни", uz: "Kafelar" },
  s9_2: { ru: "Рестораны", uz: "Restoranlar" },
  s9_3: { ru: "Отели", uz: "Mehmonxonalar" },
  s9_4: { ru: "Офисы", uz: "Ofislar" },
  s9_5: { ru: "Take away", uz: "Take away" },

  // section 10 why
  s10_sub: { ru: "Почему выбирают QAVE", uz: "Nega QAVE tanlanadi" },
  s10_title: { ru: "Один партнёр вместо разрозненных поставщиков", uz: "Alohida yetkazib beruvchilar o‘rniga bitta hamkor" },
  s10_1_t: { ru: "Собственная обжарка", uz: "Xususiy qovurish" },
  s10_1_x: { ru: "Контролируем вкус и качество каждой партии.", uz: "Har bir partiyaning ta’m va sifatini nazorat qilamiz." },
  s10_2_t: { ru: "Кофе + оборудование", uz: "Kofe + uskuna" },
  s10_2_x: { ru: "Подбираем связку зерна и кофемашины под бизнес-задачу.", uz: "Biznes vazifasi uchun don va kofemashina to‘plamini tanlaymiz." },
  s10_3_t: { ru: "Оборудование без крупных вложений", uz: "Katta sarmoyasiz uskuna" },
  s10_3_x: { ru: "Помогаем запуститься с кофемашиной при регулярной закупке кофе.", uz: "Muntazam kofe xaridida kofemashina bilan ishga tushishga yordam beramiz." },
  s10_4_t: { ru: "Сервисная поддержка", uz: "Servis qo‘llab-quvvatlash" },
  s10_4_x: { ru: "Сопровождаем оборудование после установки.", uz: "O‘rnatilgandan keyin uskunani qo‘llab-quvvatlaymiz." },
  s10_5_t: { ru: "Подбор под формат", uz: "Format bo‘yicha tanlov" },
  s10_5_x: { ru: "Решения для кофейни, ресторана, офиса, отеля и take away.", uz: "Kafe, restoran, ofis, mehmonxona va take away uchun yechimlar." },
  s10_6_t: { ru: "Коммерческий подход", uz: "Tijorat yondashuvi" },
  s10_6_x: { ru: "Смотрим не только на вкус, но и на экономику напитка.", uz: "Nafaqat ta’m, balki ichimlik iqtisodiyotiga ham qaraymiz." },

  // form
  form_sub: { ru: "Заявка", uz: "Ariza" },
  form_title: { ru: "Подберём кофе и оборудование под ваш бизнес", uz: "Biznesingiz uchun kofe va uskuna tanlaymiz" },
  form_text: { ru: "Оставьте контакты — мы рассчитаем, какое зерно, кофемашина и формат сотрудничества подойдут вашему заведению.", uz: "Kontaktlaringizni qoldiring — muassasangizga qanday don va kofemashina mos kelishini hisoblab beramiz." },
  form_name: { ru: "Имя", uz: "Ism" },
  form_phone: { ru: "Телефон", uz: "Telefon" },
  form_company: { ru: "Компания", uz: "Kompaniya" },
  form_submit: { ru: "Отправить заявку", uz: "Arizani yuborish" },
  form_success: { ru: "Заявка отправлена. Мы свяжемся с вами.", uz: "Ariza yuborildi. Siz bilan bog‘lanamiz." },

  // catalog page
  cat_title: { ru: "Каталог", uz: "Katalog" },
  cat_back: { ru: "На главную", uz: "Bosh sahifaga" },
  cat_all: { ru: "Всё", uz: "Hammasi" },
  cat_coffee: { ru: "Кофе", uz: "Kofe" },
  cat_machines: { ru: "Кофемашины", uz: "Kofemashinalar" },
  cat_accessories: { ru: "Аксессуары", uz: "Aksessuarlar" },
  cat_empty: { ru: "Ничего не найдено", uz: "Hech narsa topilmadi" },

  // cart
  cart_title: { ru: "Корзина", uz: "Savat" },
  cart_empty_t: { ru: "Пока пусто", uz: "Hozircha bo‘sh" },
  cart_empty_x: { ru: "Добавьте кофемашину и кофе, чтобы получить оборудование бесплатно.", uz: "Uskunani bepul olish uchun kofemashina va kofe qo‘shing." },
  cart_open: { ru: "Каталог", uz: "Katalog" },
  cart_checkout: { ru: "Оформить заявку", uz: "Ariza berish" },
  cart_total: { ru: "Итого в месяц", uz: "Oyiga jami" },
  cart_add_coffee: { ru: "Добавить кофе к заказу", uz: "Buyurtmaga kofe qo‘shish" },
  cart_add: { ru: "Добавить", uz: "Qo‘shish" },
  cart_free_badge: { ru: "БЕСПЛАТНО", uz: "BEPUL" },
  cart_free_from: { ru: "Бесплатно от", uz: "Bepul" },
  cart_month: { ru: "мес", uz: "oy" },
  cart_per_kg: { ru: "кг", uz: "kg" },
  cart_kg_month: { ru: "кг в месяц", uz: "kg/oy" },
  machine_limit_toast: { ru: "Лимит — 1 кофемашина на контракт аренды", uz: "Cheklov — ijara shartnomasi uchun 1 kofemashina" },

  // machine card
  mc_free_from: { ru: "Бесплатно от", uz: "Bepul" },
  mc_rent: { ru: "Аренда", uz: "Ijara" },
  mc_add: { ru: "В корзину", uz: "Savatga" },
  mc_details: { ru: "Подробнее", uz: "Batafsil" },
  coffee_add: { ru: "В корзину", uz: "Savatga" },

  // upsell
  upsell_ru: { ru: "Хотите эту кофемашину бесплатно? Добавьте ещё {x} кг кофе в месяц", uz: "Ushbu kofemashinani bepul olishni xohlaysizmi? Oyiga yana {x} kg kofe qo‘shing" },
  upsell_done: { ru: "Условия бесплатной аренды выполнены", uz: "Bepul ijara shartlari bajarildi" },

  // footer
  footer_rights: { ru: "© QAVE Coffee. Все права защищены.", uz: "© QAVE Coffee. Barcha huquqlar himoyalangan." },
  footer_contacts: { ru: "Контакты", uz: "Kontaktlar" },
  footer_nav: { ru: "Навигация", uz: "Navigatsiya" },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
  fmt: (rub: number, uzs: number, suffix?: string) => string;
};

const I18nContext = createContext<Ctx | null>(null);

function formatNumber(n: number) {
  return n.toLocaleString("ru-RU").replace(/,/g, " ");
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");
  const t = (key: keyof typeof dict) => dict[key]?.[lang] ?? String(key);
  const fmt = (rub: number, uzs: number, suffix?: string) => {
    if (lang === "ru") {
      const base = `${formatNumber(rub)} руб.`;
      return suffix ? `${base}/${suffix === "month" ? "мес" : suffix === "kg" ? "кг" : suffix}` : base;
    }
    const base = `${formatNumber(uzs)} сум`;
    return suffix ? `${base}/${suffix === "month" ? "oy" : suffix === "kg" ? "kg" : suffix}` : base;
  };
  return <I18nContext.Provider value={{ lang, setLang, t, fmt }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
