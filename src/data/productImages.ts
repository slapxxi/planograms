export type ProductImageKey =
  | 'ehrmann'
  | 'alpengurt'
  | 'molochnyyMir'
  | 'svezhiyeNovosti'
  | 'brestLitovsk'
  | 'lyakhovichok'
  | 'rogachev'
  | 'rogachev200'
  | 'minskayaMarka'
  | 'minskayaMarka200'
  | 'minskayaMarkaKrem33'
  | 'prostokvashino'
  | 'bellakt'
  | 'bellaktWhippingCream33'
  | 'sgushchennoeRogachev'
  | 'sgushchennoeGlubokoe'
  | 'sgushchennoeGlubokoe85'
  | 'sgushchennoeRogachev85'
  | 'sgushchennoeLakomka'
  | 'sgushchennoeEgorka'
  | 'sgushchennoeKakaoRogachev'
  | 'sgushchennoeKakaoGlubokoe'
  | 'sgushchennoeGlubokoe5'
  | 'sgushchennoeGlubokoeStavney'
  | 'sgushchennoeGlubokoeFructose'
  | 'milkConcentratedGlubokoe86'
  | 'creamCondensedGlubokoe'
  | 'creamCondensedRogachev'
  | 'minskayaMarkaMilk500'
  | 'milkBakedSlavyanskieTraditsii500'
  | 'milkBakedMolochnyyMir500'
  | 'milkDepi250'
  | 'milkBabushkinaKrynka200'
  | 'milkRogachev200ml'
  | 'milkBellakt200ml'
  | 'milkGoatBellakt200ml'
  | 'molochnyyMirAssorti280'
  | 'chudoKokteylMol200'
  | 'chudoKokteylMol960'
  | 'milkSavushkin1lTBrik'
  | 'milkYasBelous1lTba'
  | 'milkMozhno1lTba'

export type ProductImage = {
  name: string
  src: string
  source: string
}

export const productImages: Record<ProductImageKey, ProductImage> = {
  ehrmann: {
    name: 'Сливки Эрманн 100г',
    src: '/products/ehrmann-cream-100g.webp',
    source:
      'https://tornado.shop/molochnaya-produkciya/slivki/slivki-kampina-100g-10-d-kofe-kampina-bzmzh/',
  },
  alpengurt: {
    name: 'Сливки Альпенгурт 100г',
    src: '/products/alpengurt-cream-100g.webp',
    source: 'https://alpengurt.ru/products/portsionnye-slivki/103-kartinka',
  },
  molochnyyMir: {
    name: 'Сливки Молочный мир 0.5л',
    src: '/products/molochnyy-mir-cream-0-5l.webp',
    source: 'https://emall.by/product/934364',
  },
  svezhiyeNovosti: {
    name: 'Сливки Свежие новости 430г бут.',
    src: '/products/svezhiye-novosti-cream-430g.webp',
    source: 'Фото пользователя',
  },
  brestLitovsk: {
    name: 'Сливки Брест-Литовск 250г бут.',
    src: '/products/brest-litovsk-cream-250g.webp',
    source: 'Фото пользователя',
  },
  lyakhovichok: {
    name: 'Сливки Ляховичок 10%/20% 250г',
    src: '/products/lyakhovichok-cream-250g.webp',
    source: 'Фото пользователя',
  },
  rogachev: {
    name: 'Сливки Рогачевъ 10%-20% 500мл',
    src: '/products/rogachev-cream-500ml.webp',
    source: 'Фото пользователя',
  },
  minskayaMarka: {
    name: 'Сливки Минская марка 500г',
    src: '/products/minskaya-marka-cream-500g.webp',
    source: 'Фото пользователя',
  },
  minskayaMarka200: {
    name: 'Сливки Минская марка 10-20% 200мл',
    src: '/products/minskaya-marka-cream-200ml.webp',
    source: 'Фото пользователя',
  },
  minskayaMarkaKrem33: {
    name: 'Крем сливочный Минская марка 33%',
    src: '/products/minskaya-marka-krem-33.webp',
    source: 'Фото пользователя',
  },
  prostokvashino: {
    name: 'Сливки Простоквашино 10-20% 200г',
    src: '/products/prostokvashino-cream-200g.webp',
    source: 'Фото пользователя',
  },
  rogachev200: {
    name: 'Сливки Рогачевъ 10-20% 200г',
    src: '/products/rogachev-cream-200g.webp',
    source: 'Фото пользователя',
  },
  bellakt: {
    name: 'Сливки Беллакт 10-20% 200г',
    src: '/products/bellakt-cream-200g.webp',
    source: 'Фото пользователя',
  },
  bellaktWhippingCream33: {
    name: 'Крем для взбивания Беллакт 33% 200г',
    src: '/products/bellakt-whipping-cream-33.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeRogachev: {
    name: 'Молоко сгущ. 8.5% Рогачевъ',
    src: '/products/condensed-milk-rogachev-8-5.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeGlubokoe: {
    name: 'Молоко сгущ. 8.5% Глубокое',
    src: '/products/condensed-milk-glubokoe-8-5.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeGlubokoe85: {
    name: 'Сгущ. молоко 8.5% Глубокое',
    src: '/products/sgushchennoe-glubokoe-8-5.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeRogachev85: {
    name: 'Сгущ. молоко 8.5% Рогачевъ',
    src: '/products/sgushchennoe-rogachev-8-5.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeLakomka: {
    name: 'Сгущ. молоко вар. Лакомка',
    src: '/products/condensed-milk-lakomka.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeEgorka: {
    name: 'Сгущ. молоко вар. Егорка',
    src: '/products/condensed-milk-egorka.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeKakaoRogachev: {
    name: 'Молоко сгущ. с какао Рогачев',
    src: '/products/condensed-milk-cocoa-rogachev.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeKakaoGlubokoe: {
    name: 'Молоко сгущ. с какао Глубокое',
    src: '/products/condensed-milk-cocoa-glubokoe.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeGlubokoe5: {
    name: 'Молоко сгущ. 5% Глубокое',
    src: '/products/sgushchennoe-glubokoe-5.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeGlubokoeStavney: {
    name: 'Молоко сгущ. с ставней Глубокое',
    src: '/products/sgushchennoe-glubokoe-stavney.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeGlubokoeFructose: {
    name: 'Молоко сгущ с фруктозой Глубокое',
    src: '/products/sgushchennoe-glubokoe-fructose.webp',
    source: 'Фото пользователя',
  },
  milkConcentratedGlubokoe86: {
    name: 'Молоко конц. 8.6% Глубокое',
    src: '/products/milk-concentrated-glubokoe-8-6.webp',
    source: 'Фото пользователя',
  },
  creamCondensedGlubokoe: {
    name: 'Сливки сгущ. Глубокое',
    src: '/products/cream-condensed-glubokoe.webp',
    source: 'Фото пользователя',
  },
  creamCondensedRogachev: {
    name: 'Сливки сгущ. Рогачевъ',
    src: '/products/cream-condensed-rogachev.webp',
    source: 'Фото пользователя',
  },
  minskayaMarkaMilk500: {
    name: 'Молоко минская марка 500мл',
    src: '/products/minskaya-marka-milk-500ml.webp',
    source: 'Фото пользователя',
  },
  milkBakedSlavyanskieTraditsii500: {
    name: 'Молоко топленое Славянские традиции 500мл',
    src: '/products/milk-baked-slavyanskie-traditsii-500ml.webp',
    source: 'Фото пользователя',
  },
  milkBakedMolochnyyMir500: {
    name: 'Молоко топленое Молочный мир 500мл',
    src: '/products/milk-baked-molochnyy-mir-500ml.webp',
    source: 'Фото пользователя',
  },
  milkDepi250: {
    name: 'Молоко Депи 250мл',
    src: '/products/milk-depi-250ml.webp',
    source: 'Фото пользователя',
  },
  milkBabushkinaKrynka200: {
    name: 'Молоко Бабушкина крынка 200мл',
    src: '/products/milk-babushkina-krynka-200ml.webp',
    source: 'Фото пользователя',
  },
  milkRogachev200ml: {
    name: 'Молоко Рогачевъ 200мл',
    src: '/products/milk-rogachev-200ml.webp',
    source: 'Фото пользователя',
  },
  milkBellakt200ml: {
    name: 'Молоко Беллакт 200мл',
    src: '/products/milk-bellakt-200ml.webp',
    source: 'Фото пользователя',
  },
  milkGoatBellakt200ml: {
    name: 'Молоко козье Беллакт 200мл',
    src: '/products/milk-goat-bellakt-200ml.webp',
    source: 'Фото пользователя',
  },
  molochnyyMirAssorti280: {
    name: 'Молочный мир асс. 280г бут',
    src: '/products/molochnyy-mir-assorti-280g.webp',
    source: 'Фото пользователя',
  },
  chudoKokteylMol200: {
    name: 'Чудо коктейль мол 200мл',
    src: '/products/chudo-kokteyl-mol-200ml.webp',
    source: 'Фото пользователя',
  },
  chudoKokteylMol960: {
    name: 'Чудо коктейль мол 960г',
    src: '/products/chudo-kokteyl-mol-960g.webp',
    source: 'Фото пользователя',
  },
  milkSavushkin1lTBrik: {
    name: 'Молоко Савушкин 1л т-брик',
    src: '/products/milk-savushkin-1l-t-brik.webp',
    source: 'Фото пользователя',
  },
  milkYasBelous1lTba: {
    name: 'Молоко Ясь Белоус 1л ТБА',
    src: '/products/milk-yas-belous-1l-tba.webp',
    source: 'Фото пользователя',
  },
  milkMozhno1lTba: {
    name: 'Молоко Можно 1л ТБА',
    src: '/products/milk-mozhno-1l-tba.webp',
    source: 'Фото пользователя',
  },
}
