export type ProductImageKey =
  | 'ehrmann'
  | 'alpengurt'
  | 'molochnyyMir'
  | 'svezhiyeNovosti'
  | 'brestLitovsk'
  | 'lyakhovichok'
  | 'milkLyakhovichok1l'
  | 'milkSnovskoe1l'
  | 'milkMinskayaMarka1l'
  | 'milkMolochnyyMir095'
  | 'milkBabushkinaKrynka09'
  | 'milkBabushkinaKrynka1lTpak'
  | 'milkMolochnyyMir1lTba'
  | 'milkMinskayaMarka15l'
  | 'minskayaMarkaMilk15'
  | 'slavyanskieTraditsiiMilk15'
  | 'milkMozhno093'
  | 'milkZdravushkaBaked093'
  | 'milkBellakt19'
  | 'milkMolochnyyMir145'
  | 'plantoBarista1lTba'
  | 'nemoloko1lTba'
  | 'milkBellakt400'
  | 'udachnyyVyborCream400'
  | 'milkFilmAssorted'
  | 'kefirLesnyeYagody25'
  | 'kefirBellaktGrandAiran220'
  | 'kefirMolochnyeGorkiTairan220'
  | 'kefirSavushkin415'
  | 'ryazhenkaSavushkin415'
  | 'kefirProstokvashaSlavyanskie380'
  | 'kefirRyazhenkaSlavyanskie380'
  | 'kefirRyazhenkaMinskaya500'
  | 'kefirRogachevProtein210'
  | 'kefirExponenta'
  | 'kefirExponentaNormPro250'
  | 'kefirMinskayaMarka05Tpak'
  | 'kefirBioFit480'
  | 'kefirMolochnyyMirBifitat500'
  | 'kefirMolochnyyMirDarAyran500'
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
  | 'minskayaMarkaMilk09'
  | 'slavyanskieTraditsiiMilk09'
  | 'milkBakedSlavyanskieTraditsii500'
  | 'milkBakedMolochnyyMir500'
  | 'milkDepi250'
  | 'milkBabushkinaKrynka200'
  | 'milkRogachev200ml'
  | 'milkBellakt200ml'
  | 'milkBellakt900mlBottle'
  | 'milkGoatBellakt200ml'
  | 'molochnyyMirAssorti280'
  | 'chudoKokteylMol200'
  | 'chudoKokteylMol960'
  | 'milkSavushkin1lTBrik'
  | 'milkSavushkin1lBottle'
  | 'milkZdravushka093'
  | 'milkOstromechevskieProstory1l'
  | 'milkPostavyGorodok1l'
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
    src: import.meta.env.BASE_URL + 'products/ehrmann-cream-100g.webp',
    source:
      'https://tornado.shop/molochnaya-produkciya/slivki/slivki-kampina-100g-10-d-kofe-kampina-bzmzh/',
  },
  alpengurt: {
    name: 'Сливки Альпенгурт 100г',
    src: import.meta.env.BASE_URL + 'products/alpengurt-cream-100g.webp',
    source: 'https://alpengurt.ru/products/portsionnye-slivki/103-kartinka',
  },
  molochnyyMir: {
    name: 'Сливки Молочный мир 0.5л',
    src: import.meta.env.BASE_URL + 'products/molochnyy-mir-cream-0-5l.webp',
    source: 'https://emall.by/product/934364',
  },
  svezhiyeNovosti: {
    name: 'Сливки Свежие новости 430г бут.',
    src: import.meta.env.BASE_URL + 'products/svezhiye-novosti-cream-430g.webp',
    source: 'Фото пользователя',
  },
  brestLitovsk: {
    name: 'Сливки Брест-Литовск 250г бут.',
    src: import.meta.env.BASE_URL + 'products/brest-litovsk-cream-250g.webp',
    source: 'Фото пользователя',
  },
  lyakhovichok: {
    name: 'Сливки Ляховичок 10%/20% 250г',
    src: import.meta.env.BASE_URL + 'products/lyakhovichok-cream-250g.webp',
    source: 'Фото пользователя',
  },
  milkLyakhovichok1l: {
    name: 'Молоко Ляховичок 1л',
    src: import.meta.env.BASE_URL + 'products/milk-lyakhovichok-1l.webp',
    source: 'Фото пользователя',
  },
  milkSnovskoe1l: {
    name: 'Молоко Сновское 1л',
    src: import.meta.env.BASE_URL + 'products/milk-snovskoe-1l.webp',
    source: 'Фото пользователя',
  },
  milkMinskayaMarka1l: {
    name: 'Молоко Минская марка 1л',
    src: import.meta.env.BASE_URL + 'products/milk-minskaya-marka-1l.webp',
    source: 'Фото пользователя',
  },
  milkMolochnyyMir095: {
    name: 'Молоко Молочный мир 0.95л',
    src: import.meta.env.BASE_URL + 'products/milk-molochnyy-mir-0-95l.webp',
    source: 'Фото пользователя',
  },
  milkBabushkinaKrynka09: {
    name: 'Молоко Бабушкина крынка 0.9л',
    src: import.meta.env.BASE_URL + 'products/milk-babushkina-krynka-0-9l.webp',
    source: 'Фото пользователя',
  },
  milkBabushkinaKrynka1lTpak: {
    name: 'Молоко Бабушкина крынка 1л т-пак',
    src:
      import.meta.env.BASE_URL + 'products/milk-babushkina-krynka-1l-tpak.webp',
    source: 'Фото пользователя',
  },
  milkMolochnyyMir1lTba: {
    name: 'Молоко Молочный мир 1л ТБА',
    src: import.meta.env.BASE_URL + 'products/milk-molochnyy-mir-1l-tba.webp',
    source: 'Фото пользователя',
  },
  milkMinskayaMarka15l: {
    name: 'Молоко Минская марка 1.5л',
    src: import.meta.env.BASE_URL + 'products/milk-minskaya-marka-1-5l.webp',
    source: 'Фото пользователя',
  },
  minskayaMarkaMilk15: {
    name: 'Молоко Минская марка 1.5л',
    src: import.meta.env.BASE_URL + 'products/minskaya-marka-milk-1-5l.webp',
    source: 'Фото пользователя',
  },
  slavyanskieTraditsiiMilk15: {
    name: 'Молоко Славянские традиции 1.5л',
    src:
      import.meta.env.BASE_URL +
      'products/slavyanskie-traditsii-milk-1-5l.webp',
    source: 'Фото пользователя',
  },
  milkMozhno093: {
    name: 'Молоко МОЖНО 0.93л',
    src: import.meta.env.BASE_URL + 'products/milk-mozhno-0-93l.webp',
    source: 'Фото пользователя',
  },
  milkZdravushkaBaked093: {
    name: 'Молоко Здравушка топленое 0.93л',
    src: import.meta.env.BASE_URL + 'products/milk-zdravushka-baked-0-93l.webp',
    source: 'Фото пользователя',
  },
  milkBellakt19: {
    name: 'Молоко Беллакт 1.9л',
    src: import.meta.env.BASE_URL + 'products/milk-bellakt-1-9l.webp',
    source: 'Фото пользователя',
  },
  milkMolochnyyMir145: {
    name: 'Молоко Молочный мир 1.45л',
    src: import.meta.env.BASE_URL + 'products/milk-molochnyy-mir-1-45l.webp',
    source: 'Фото пользователя',
  },
  plantoBarista1lTba: {
    name: 'Planto Barista 1л ТБА',
    src: import.meta.env.BASE_URL + 'products/planto-barista-1l-tba.webp',
    source: 'Фото пользователя',
  },
  nemoloko1lTba: {
    name: 'Nemoloko 1л ТБА',
    src: import.meta.env.BASE_URL + 'products/nemoloko-1l-tba.webp',
    source: 'Фото пользователя',
  },
  milkBellakt400: {
    name: 'Молоко Беллакт 400г',
    src: import.meta.env.BASE_URL + 'products/milk-bellakt-400g.webp',
    source: 'Фото пользователя',
  },
  udachnyyVyborCream400: {
    name: 'Сливки Удачный выбор 400г',
    src: import.meta.env.BASE_URL + 'products/udachnyy-vybor-cream-400g.webp',
    source: 'Фото пользователя',
  },
  milkFilmAssorted: {
    name: 'Молоко в пленке различной жирности',
    src: import.meta.env.BASE_URL + 'products/milk-film-assorted.webp',
    source: 'Фото пользователя',
  },
  kefirLesnyeYagody25: {
    name: 'Кефир Лесные ягоды 2.5% 500г',
    src: import.meta.env.BASE_URL + 'products/kefir-lesnye-yagody-25-500g.webp',
    source: 'Фото пользователя',
  },
  kefirBellaktGrandAiran220: {
    name: 'Беллакт Гранд Айранд 220г пл.ст.',
    src:
      import.meta.env.BASE_URL + 'products/kefir-bellakt-grand-airan-220g.webp',
    source: 'Фото пользователя',
  },
  kefirMolochnyeGorkiTairan220: {
    name: 'Молочные горки Тайран 220г пл.ст.',
    src:
      import.meta.env.BASE_URL +
      'products/kefir-molochnye-gorki-tairan-220g.webp',
    source: 'Фото пользователя',
  },
  kefirSavushkin415: {
    name: 'Кефир Савушкин 415г бут',
    src: import.meta.env.BASE_URL + 'products/kefir-savushkin-415g.webp',
    source: 'Фото пользователя',
  },
  ryazhenkaSavushkin415: {
    name: 'Ряженка Савушкин 415г бут',
    src: import.meta.env.BASE_URL + 'products/ryazhenka-savushkin-415g.webp',
    source: 'Фото пользователя',
  },
  kefirProstokvashaSlavyanskie380: {
    name: 'Простокваша Славянские Традиции 380г ст',
    src:
      import.meta.env.BASE_URL +
      'products/kefir-prostokvasha-slavyanskie-380g.webp',
    source: 'Фото пользователя',
  },
  kefirRyazhenkaSlavyanskie380: {
    name: 'Ряженка Славянские традиции 380г ст',
    src:
      import.meta.env.BASE_URL +
      'products/kefir-ryazhenka-slavyanskie-380g.webp',
    source: 'Фото пользователя',
  },
  kefirRyazhenkaMinskaya500: {
    name: 'Ряженка Минская марка 500г пюр-пак',
    src:
      import.meta.env.BASE_URL +
      'products/kefir-ryazhenka-minskaya-marka-500g.webp',
    source: 'Фото пользователя',
  },
  kefirRogachevProtein210: {
    name: 'Протеиновый коктейль Рогачевъ 210г ТБА',
    src:
      import.meta.env.BASE_URL +
      'products/kefir-rogachev-protein-cocktail-210g.webp',
    source: 'Фото пользователя',
  },
  kefirExponenta: {
    name: 'Напиток Exponenta пюр-пак',
    src: import.meta.env.BASE_URL + 'products/kefir-exponenta-drink.webp',
    source: 'Фото пользователя',
  },
  kefirExponentaNormPro250: {
    name: 'Напиток Экспонента НОРМ-ПРО 250г бут',
    src:
      import.meta.env.BASE_URL + 'products/kefir-exponenta-norm-pro-250g.webp',
    source: 'Фото пользователя',
  },
  kefirMinskayaMarka05Tpak: {
    name: 'Кефир Минская марка 0.5л т-пак',
    src:
      import.meta.env.BASE_URL + 'products/kefir-minskaya-marka-05-tpak.webp',
    source: 'Фото пользователя',
  },
  kefirBioFit480: {
    name: 'БиоФит 480г бут',
    src: import.meta.env.BASE_URL + 'products/kefir-biofit-480g.webp',
    source: 'Фото пользователя',
  },
  kefirMolochnyyMirBifitat500: {
    name: 'Молочный мир Бифитат 500г бут',
    src:
      import.meta.env.BASE_URL +
      'products/kefir-molochnyy-mir-bifitat-500g.webp',
    source: 'Фото пользователя',
  },
  kefirMolochnyyMirDarAyran500: {
    name: 'Молочный мир ДарАйран 500г бут',
    src:
      import.meta.env.BASE_URL +
      'products/kefir-molochnyy-mir-darayran-500g.webp',
    source: 'Фото пользователя',
  },
  rogachev: {
    name: 'Сливки Рогачевъ 10%-20% 500мл',
    src: import.meta.env.BASE_URL + 'products/rogachev-cream-500ml.webp',
    source: 'Фото пользователя',
  },
  minskayaMarka: {
    name: 'Сливки Минская марка 500г',
    src: import.meta.env.BASE_URL + 'products/minskaya-marka-cream-500g.webp',
    source: 'Фото пользователя',
  },
  minskayaMarka200: {
    name: 'Сливки Минская марка 10-20% 200мл',
    src: import.meta.env.BASE_URL + 'products/minskaya-marka-cream-200ml.webp',
    source: 'Фото пользователя',
  },
  minskayaMarkaKrem33: {
    name: 'Крем сливочный Минская марка 33%',
    src: import.meta.env.BASE_URL + 'products/minskaya-marka-krem-33.webp',
    source: 'Фото пользователя',
  },
  prostokvashino: {
    name: 'Сливки Простоквашино 10-20% 200г',
    src: import.meta.env.BASE_URL + 'products/prostokvashino-cream-200g.webp',
    source: 'Фото пользователя',
  },
  rogachev200: {
    name: 'Сливки Рогачевъ 10-20% 200г',
    src: import.meta.env.BASE_URL + 'products/rogachev-cream-200g.webp',
    source: 'Фото пользователя',
  },
  bellakt: {
    name: 'Сливки Беллакт 10-20% 200г',
    src: import.meta.env.BASE_URL + 'products/bellakt-cream-200g.webp',
    source: 'Фото пользователя',
  },
  bellaktWhippingCream33: {
    name: 'Крем для взбивания Беллакт 33% 200г',
    src: import.meta.env.BASE_URL + 'products/bellakt-whipping-cream-33.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeRogachev: {
    name: 'Молоко сгущ. 8.5% Рогачевъ',
    src: import.meta.env.BASE_URL + 'products/condensed-milk-rogachev-8-5.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeGlubokoe: {
    name: 'Молоко сгущ. 8.5% Глубокое',
    src: import.meta.env.BASE_URL + 'products/condensed-milk-glubokoe-8-5.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeGlubokoe85: {
    name: 'Сгущ. молоко 8.5% Глубокое',
    src: import.meta.env.BASE_URL + 'products/sgushchennoe-glubokoe-8-5.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeRogachev85: {
    name: 'Сгущ. молоко 8.5% Рогачевъ',
    src: import.meta.env.BASE_URL + 'products/sgushchennoe-rogachev-8-5.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeLakomka: {
    name: 'Сгущ. молоко вар. Лакомка',
    src: import.meta.env.BASE_URL + 'products/condensed-milk-lakomka.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeEgorka: {
    name: 'Сгущ. молоко вар. Егорка',
    src: import.meta.env.BASE_URL + 'products/condensed-milk-egorka.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeKakaoRogachev: {
    name: 'Молоко сгущ. с какао Рогачев',
    src:
      import.meta.env.BASE_URL + 'products/condensed-milk-cocoa-rogachev.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeKakaoGlubokoe: {
    name: 'Молоко сгущ. с какао Глубокое',
    src:
      import.meta.env.BASE_URL + 'products/condensed-milk-cocoa-glubokoe.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeGlubokoe5: {
    name: 'Молоко сгущ. 5% Глубокое',
    src: import.meta.env.BASE_URL + 'products/sgushchennoe-glubokoe-5.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeGlubokoeStavney: {
    name: 'Молоко сгущ. с ставней Глубокое',
    src:
      import.meta.env.BASE_URL + 'products/sgushchennoe-glubokoe-stavney.webp',
    source: 'Фото пользователя',
  },
  sgushchennoeGlubokoeFructose: {
    name: 'Молоко сгущ с фруктозой Глубокое',
    src:
      import.meta.env.BASE_URL + 'products/sgushchennoe-glubokoe-fructose.webp',
    source: 'Фото пользователя',
  },
  milkConcentratedGlubokoe86: {
    name: 'Молоко конц. 8.6% Глубокое',
    src:
      import.meta.env.BASE_URL + 'products/milk-concentrated-glubokoe-8-6.webp',
    source: 'Фото пользователя',
  },
  creamCondensedGlubokoe: {
    name: 'Сливки сгущ. Глубокое',
    src: import.meta.env.BASE_URL + 'products/cream-condensed-glubokoe.webp',
    source: 'Фото пользователя',
  },
  creamCondensedRogachev: {
    name: 'Сливки сгущ. Рогачевъ',
    src: import.meta.env.BASE_URL + 'products/cream-condensed-rogachev.webp',
    source: 'Фото пользователя',
  },
  minskayaMarkaMilk500: {
    name: 'Молоко минская марка 500мл',
    src: import.meta.env.BASE_URL + 'products/minskaya-marka-milk-500ml.webp',
    source: 'Фото пользователя',
  },
  minskayaMarkaMilk09: {
    name: 'Молоко Минская марка 0.9л',
    src: import.meta.env.BASE_URL + 'products/minskaya-marka-milk-0-9l.webp',
    source: 'Фото пользователя',
  },
  slavyanskieTraditsiiMilk09: {
    name: 'Молоко Славянские традиции 0.9л',
    src:
      import.meta.env.BASE_URL +
      'products/slavyanskie-traditsii-milk-0-9l.webp',
    source: 'Фото пользователя',
  },
  milkBakedSlavyanskieTraditsii500: {
    name: 'Молоко топленое Славянские традиции 500мл',
    src:
      import.meta.env.BASE_URL +
      'products/milk-baked-slavyanskie-traditsii-500ml.webp',
    source: 'Фото пользователя',
  },
  milkBakedMolochnyyMir500: {
    name: 'Молоко топленое Молочный мир 500мл',
    src:
      import.meta.env.BASE_URL + 'products/milk-baked-molochnyy-mir-500ml.webp',
    source: 'Фото пользователя',
  },
  milkDepi250: {
    name: 'Молоко Депи 250мл',
    src: import.meta.env.BASE_URL + 'products/milk-depi-250ml.webp',
    source: 'Фото пользователя',
  },
  milkBabushkinaKrynka200: {
    name: 'Молоко Бабушкина крынка 200мл',
    src:
      import.meta.env.BASE_URL + 'products/milk-babushkina-krynka-200ml.webp',
    source: 'Фото пользователя',
  },
  milkRogachev200ml: {
    name: 'Молоко Рогачевъ 200мл',
    src: import.meta.env.BASE_URL + 'products/milk-rogachev-200ml.webp',
    source: 'Фото пользователя',
  },
  milkBellakt200ml: {
    name: 'Молоко Беллакт 200мл',
    src: import.meta.env.BASE_URL + 'products/milk-bellakt-200ml.webp',
    source: 'Фото пользователя',
  },
  milkBellakt900mlBottle: {
    name: 'Молоко Беллакт 900мл',
    src: import.meta.env.BASE_URL + 'products/milk-bellakt-900ml-bottle.webp',
    source: 'Фото пользователя',
  },
  milkGoatBellakt200ml: {
    name: 'Молоко козье Беллакт 200мл',
    src: import.meta.env.BASE_URL + 'products/milk-goat-bellakt-200ml.webp',
    source: 'Фото пользователя',
  },
  molochnyyMirAssorti280: {
    name: 'Молочный мир асс. 280г бут',
    src: import.meta.env.BASE_URL + 'products/molochnyy-mir-assorti-280g.webp',
    source: 'Фото пользователя',
  },
  chudoKokteylMol200: {
    name: 'Чудо коктейль мол 200мл',
    src: import.meta.env.BASE_URL + 'products/chudo-kokteyl-mol-200ml.webp',
    source: 'Фото пользователя',
  },
  chudoKokteylMol960: {
    name: 'Чудо коктейль мол 960г',
    src: import.meta.env.BASE_URL + 'products/chudo-kokteyl-mol-960g.webp',
    source: 'Фото пользователя',
  },
  milkSavushkin1lTBrik: {
    name: 'Молоко Савушкин 1л т-брик',
    src: import.meta.env.BASE_URL + 'products/milk-savushkin-1l-t-brik.webp',
    source: 'Фото пользователя',
  },
  milkSavushkin1lBottle: {
    name: 'Молоко Савушкин 1л бут',
    src: import.meta.env.BASE_URL + 'products/milk-savushkin-1l-bottle.webp',
    source: 'Фото пользователя',
  },
  milkZdravushka093: {
    name: 'Молоко Здравушка 0.93л',
    src: import.meta.env.BASE_URL + 'products/milk-zdravushka-0-93l.webp',
    source: 'Фото пользователя',
  },
  milkOstromechevskieProstory1l: {
    name: 'Молоко Остромечевские просторы 1л',
    src:
      import.meta.env.BASE_URL +
      'products/milk-ostromechevskie-prostory-1l.webp',
    source: 'Фото пользователя',
  },
  milkPostavyGorodok1l: {
    name: 'Молоко Поставы городок 1л',
    src: import.meta.env.BASE_URL + 'products/milk-postavy-gorodok-1l.webp',
    source: 'Фото пользователя',
  },
  milkYasBelous1lTba: {
    name: 'Молоко Ясь Белоус 1л ТБА',
    src: import.meta.env.BASE_URL + 'products/milk-yas-belous-1l-tba.webp',
    source: 'Фото пользователя',
  },
  milkMozhno1lTba: {
    name: 'Молоко Можно 1л ТБА',
    src: import.meta.env.BASE_URL + 'products/milk-mozhno-1l-tba.webp',
    source: 'Фото пользователя',
  },
}
