import type { CSSProperties } from 'react'
import type { ProductImageKey } from '~/data/productImages'

export type Product = {
  name: string
  faces: number
  faceSpan?: number
  height?: number
  images?: ProductImageKey[]
}

export type Shelf = {
  products: Product[]
}

export type Group = {
  id: string
  title: string
  color: string
  background: string
  shelves: Shelf[]
}

export type NumberedProduct = {
  product: Product
  number: number
}

export type NumberedShelf = {
  products: NumberedProduct[]
}

export type NumberedGroup = {
  group: Group
  shelves: NumberedShelf[]
}

export const CM_PER_FACE = 8

export function faceSpanToCm(span: number) {
  return span * CM_PER_FACE
}

export function cmToFaceSpan(cm: number) {
  return cm / CM_PER_FACE
}

export function formatCm(cm: number) {
  return Number(cm.toFixed(1)).toString()
}

export function productHeight(product: Product) {
  return Math.max(1, Math.round(product.height ?? 1))
}

export function numberProducts(groups: Group[]): NumberedGroup[] {
  let nextNumber = 1

  return groups.map((group) => ({
    group,
    shelves: group.shelves
      .filter((shelf) => shelf.products.length > 0)
      .map((shelf) => ({
        products: shelf.products.map((product) => ({
          product,
          number: nextNumber++,
        })),
      })),
  }))
}

export const groups: Group[] = [
  {
    id: 'milk',
    title: 'Молоко',
    color: '#1565c0',
    background: '#e8f2ff',
    shelves: [
      {
        products: [
          {
            name: 'Сливки Эрманн/Альпенгурт 100г',
            faces: 1,
            images: ['ehrmann', 'alpengurt'],
          },
          {
            name: 'Сливки Молочный мир 0.5л',
            faces: 1,
            images: ['molochnyyMir'],
          },
          {
            name: 'Сливки Свежие новости 430г бут.',
            faces: 1,
            images: ['svezhiyeNovosti'],
          },
          {
            name: 'Сливки Брест-Литовск 250г бут.',
            faces: 2,
            images: ['brestLitovsk'],
          },
          {
            name: 'Сливки Ляховичок 10%/20% 250г',
            faces: 2,
            images: ['lyakhovichok'],
          },
          {
            name: 'Сливки Рогачевъ 10%-20% 500мл',
            faces: 1,
            images: ['rogachev'],
          },
          {
            name: 'Сливки Минская марка 500г',
            faces: 1,
            images: ['minskayaMarka'],
          },
          {
            name: 'Сливки Минская марка 10-20% 200мл',
            faces: 2,
            images: ['minskayaMarka200'],
          },
          {
            name: 'Крем сливочный Минская марка 33%',
            faces: 1,
            images: ['minskayaMarkaKrem33'],
          },
          {
            name: 'Сливки Простоквашино 10-20% 200г',
            faces: 2,
            images: ['prostokvashino'],
          },
          {
            name: 'Сливки Рогачевъ 10-20% 200г',
            faces: 1,
            height: 2,
            images: ['rogachev200'],
          },
          {
            name: 'Сливки Беллакт 10-20% 200г',
            faces: 1,
            height: 2,
            images: ['bellakt'],
          },
          {
            name: 'Крем для взбивания Беллакт 33% 200г',
            faces: 1,
            height: 2,
            images: ['bellaktWhippingCream33'],
          },
          {
            name: 'Молоко сгущ. 8.5% Рогачевъ/Глубокое',
            faces: 1,
            images: ['sgushchennoeRogachev', 'sgushchennoeGlubokoe'],
          },
          {
            name: 'Сгущ. молоко 8.5% Глубокое',
            faces: 1,
            height: 2,
            images: ['sgushchennoeGlubokoe85'],
          },
          {
            name: 'Сгущ. молоко 8.5% Рогачевъ',
            faces: 1,
            height: 2,
            images: ['sgushchennoeRogachev85'],
          },
          {
            name: 'Сгущ. молоко вар. Лакомка/Егорка',
            faces: 1,
            height: 2,
            images: ['sgushchennoeLakomka', 'sgushchennoeEgorka'],
          },
          {
            name: 'Молоко сгущ. с какао Рогачев/Глубокое',
            faces: 1,
            height: 2,
            images: ['sgushchennoeKakaoRogachev', 'sgushchennoeKakaoGlubokoe'],
          },
          {
            name: 'Молоко сгущ. 5% Глубокое',
            faces: 1,
            height: 2,
            images: ['sgushchennoeGlubokoe5'],
          },
          {
            name: 'Молоко сгущ. с ставней Глубокое',
            faces: 1,
            height: 2,
            images: ['sgushchennoeGlubokoeStavney'],
          },
          {
            name: 'Молоко сгущ с фруктозой Глубокое',
            faces: 1,
            height: 2,
            images: ['sgushchennoeGlubokoeFructose'],
          },
          {
            name: 'Молоко конц. 8.6% Глубокое',
            faces: 1,
            height: 2,
            images: ['milkConcentratedGlubokoe86'],
          },
          {
            name: 'Сливки сгущ. Глубокое/Рогачевъ',
            faces: 1,
            height: 2,
            images: ['creamCondensedGlubokoe', 'creamCondensedRogachev'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Молоко минская марка 500мл',
            faces: 2,
            faceSpan: 1.5,
            images: ['minskayaMarkaMilk500'],
          },
          {
            name: 'Молоко топленое Славянские традиции 500мл',
            faces: 2,
            faceSpan: 1.5,
            images: ['milkBakedSlavyanskieTraditsii500'],
          },
          {
            name: 'Молоко топленое Молочный мир 500мл',
            faces: 1,
            faceSpan: 2,
            images: ['milkBakedMolochnyyMir500'],
          },
          {
            name: 'Молоко Депи 250мл',
            faces: 6,
            faceSpan: 4.25,
            images: ['milkDepi250'],
          },
          {
            name: 'Молоко Бабушкина крынка 200мл',
            faces: 3,
            faceSpan: 2.5,
            height: 2,
            images: ['milkBabushkinaKrynka200'],
          },
          {
            name: 'Молоко Рогачевъ 200мл',
            faces: 3,
            faceSpan: 2.5,
            height: 2,
            images: ['milkRogachev200ml'],
          },
          {
            name: 'Молоко Беллакт 200мл',
            faces: 3,
            faceSpan: 2.25,
            height: 2,
            images: ['milkBellakt200ml'],
          },
          {
            name: 'Молоко козье Беллакт 200мл',
            faces: 2,
            faceSpan: 1.5,
            height: 2,
            images: ['milkGoatBellakt200ml'],
          },
          {
            name: 'Молочный мир асс. 280г бут',
            faces: 3,
            faceSpan: 2.25,
            images: ['molochnyyMirAssorti280'],
          },
          {
            name: 'Чудо коктейль мол 200мл',
            faces: 5,
            faceSpan: 3.125,
            images: ['chudoKokteylMol200'],
          },
          {
            name: 'Чудо коктейль мол 960г',
            faces: 3,
            faceSpan: 3.75,
            images: ['chudoKokteylMol960'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Молоко Савушкин 1л т-брик',
            faces: 3,
            images: ['milkSavushkin1lTBrik'],
          },
          {
            name: 'Молоко Ясь Белоус/Можно 1л ТБА',
            faces: 2,
            images: ['milkYasBelous1lTba', 'milkMozhno1lTba'],
          },
          {
            name: 'Молоко минская марка/Славянские традиции 0.9 бут',
            faces: 4,
            images: ['minskayaMarkaMilk09', 'slavyanskieTraditsiiMilk09'],
          },
          {
            name: 'Молоко Савушкин 1л бут',
            faces: 7,
            images: ['milkSavushkin1lBottle'],
          },
          {
            name: 'Молоко Здравушка 0.93л бут',
            faces: 3,
            images: ['milkZdravushka093'],
          },
          {
            name: 'Молоко Беллакт 900мл бут',
            faces: 3,
            images: ['milkBellakt900mlBottle'],
          },
          {
            name: 'Молоко Остромечевские просторы 1л бут',
            faces: 2,
            images: ['milkOstromechevskieProstory1l'],
          },
          {
            name: 'Молоко Поставы городок 1л бут',
            faces: 2,
            faceSpan: 3,
            images: ['milkPostavyGorodok1l'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Молоко Ляховичок 1л п-пак',
            faces: 3,
            images: ['milkLyakhovichok1l'],
          },
          {
            name: 'Молоко Сновское 1л п-пак',
            faces: 1,
            images: ['milkSnovskoe1l'],
          },
          {
            name: 'Молоко Минская марка 1л п-пак',
            faces: 1,
            images: ['milkMinskayaMarka1l'],
          },
          {
            name: 'Молоко минская марка/Славянские традиции 0.9 бут',
            faces: 4,
            images: ['minskayaMarkaMilk09', 'slavyanskieTraditsiiMilk09'],
          },
          {
            name: 'Молоко Савушкин 1л бут',
            faces: 7,
            images: ['milkSavushkin1lBottle'],
          },
          {
            name: 'Молоко Здравушка 0.93л бут',
            faces: 3,
            images: ['milkZdravushka093'],
          },
          {
            name: 'Молоко Беллакт 900мл бут',
            faces: 3,
            images: ['milkBellakt900mlBottle'],
          },
          {
            name: 'Молоко Молочный мир 0.95л бут',
            faces: 2,
            images: ['milkMolochnyyMir095'],
          },
          {
            name: 'Молоко Бабушкина Крынка 0.9л бут',
            faces: 2,
            faceSpan: 3,
            images: ['milkBabushkinaKrynka09'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Молоко Бабушкина крынка 1л т-пак',
            faces: 2,
            faceSpan: 3,
            images: ['milkBabushkinaKrynka1lTpak'],
          },
          {
            name: 'Молоко Молочный мир 1л ТБА',
            faces: 1,
            images: ['milkMolochnyyMir1lTba'],
          },
          {
            name: 'Молоко Минская марка 1.5л п-пак',
            faces: 1,
            images: ['milkMinskayaMarka15l'],
          },
          {
            name: 'Молоко Минская марка/Славянские традиции 1.5л бут',
            faces: 3,
            faceSpan: 4,
            images: ['minskayaMarkaMilk15', 'slavyanskieTraditsiiMilk15'],
          },
          {
            name: 'Молоко Савушкин 1л бут',
            faces: 7,
            images: ['milkSavushkin1lBottle'],
          },
          {
            name: 'Молоко МОЖНО/Здравушка Топленое 0.93л бут',
            faces: 3,
            images: ['milkMozhno093', 'milkZdravushkaBaked093'],
          },
          {
            name: 'Молоко Беллакт 1.9л бут',
            faces: 2,
            faceSpan: 3,
            images: ['milkBellakt19'],
          },
          {
            name: 'Молоко Молочный мир 1.45л бут',
            faces: 2,
            faceSpan: 2,
            images: ['milkMolochnyyMir145'],
          },
          {
            name: 'Молоко Бабушкина Крынка 0.9л бут',
            faces: 2,
            faceSpan: 3,
            images: ['milkBabushkinaKrynka09'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Planto Barista/Nemoloko 1л ТБА',
            faces: 4,
            faceSpan: 3,
            images: ['plantoBarista1lTba', 'nemoloko1lTba'],
          },
          {
            name: 'Молоко Беллакт 400г',
            faces: 1,
            faceSpan: 1.75,
            images: ['milkBellakt400'],
          },
          {
            name: 'Сливки Удачный выбор 400г',
            faces: 2,
            images: ['udachnyyVyborCream400'],
          },
          {
            name: 'Молоко в пленке различной жирности',
            faces: 20,
            faceSpan: 20.25,
            images: ['milkFilmAssorted'],
          },
        ],
      },
    ],
  },
  {
    id: 'kefir',
    title: 'Кефиры',
    color: '#6a1b9a',
    background: '#f3e9fb',
    shelves: [
      {
        products: [
          {
            name: 'Кефир Лесные ягоды 2.5% 500г',
            faces: 2,
            images: ['kefirLesnyeYagody25'],
          },
          {
            name: 'Беллакт Гранд Айранд 220г пл.ст.',
            faces: 2,
            images: ['kefirBellaktGrandAiran220'],
          },
          {
            name: 'Молочные горки Тайран 220г пл.ст.',
            faces: 2,
            faceSpan: 2,
            images: ['kefirMolochnyeGorkiTairan220'],
          },
          {
            name: 'Ряженка Савушкин 415г бут',
            faces: 5,
            faceSpan: 4,
            images: ['kefirSavushkin415'],
          },
          {
            name: 'Простокваша Славянские Традиции/Ряженка Славянские традиции 380г ст',
            faces: 2,
            images: [
              'kefirProstokvashaSlavyanskie380',
              'kefirRyazhenkaSlavyanskie380',
            ],
          },
          {
            name: 'Ряженка Минская марка 500г. пюр-пак',
            faces: 1,
            images: ['kefirRyazhenkaMinskaya500'],
          },
          {
            name: 'Протеиновый коктейль Рогачевъ 210г ТБА',
            faces: 1,
            height: 2,
            images: ['kefirRogachevProtein210'],
          },
          {
            name: 'Напиток Exponenta пюр-пак',
            faces: 6,
            faceSpan: 5.25,
            images: ['kefirExponenta'],
          },
          {
            name: 'Напиток Экспонента НОРМ-ПРО 250г бут',
            faces: 3,
            faceSpan: 3,
            images: ['kefirExponentaNormPro250'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Кефир Минская марка 0.5л т-пак',
            faces: 2,
            images: ['kefirMinskayaMarka05Tpak'],
          },
          {
            name: 'БиоФит 480г бут',
            faces: 2,
            images: ['kefirBioFit480'],
          },
          {
            name: 'Молочный мир Бифитат/Молочный мир ДарАйран 500г бут',
            faces: 2,
            images: [
              'kefirMolochnyyMirBifitat500',
              'kefirMolochnyyMirDarAyran500',
            ],
          },
          {
            name: 'Кефир Савушкин 415г бут',
            faces: 5,
            faceSpan: 4,
            images: ['kefirSavushkin415'],
          },
          {
            name: 'Ряженка Савушкин 415г бут',
            faces: 4,
            faceSpan: 3,
            images: ['ryazhenkaSavushkin415'],
          },
          {
            name: 'Протеиновый коктейль Рогачевъ 210г ТБА',
            faces: 1,
            height: 2,
            images: ['kefirRogachevProtein210'],
          },
          {
            name: 'Напиток Exponenta пюр-пак',
            faces: 6,
            faceSpan: 5.25,
            images: ['kefirExponenta'],
          },
          {
            name: 'EXPONENTA Экспотоник 500мл бут',
            faces: 3,
            faceSpan: 3,
            images: ['kefirExponentaExpotonik500'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Кефир Славянские традиции/Минская марка 900мл бут',
            faces: 2,
            images: ['kefirSlavyanskieTraditsii900', 'kefirMinskayaMarka900'],
          },
          {
            name: 'БиоФит кефирный 930г бут',
            faces: 2,
            images: ['kefirBioFit930'],
          },
          {
            name: 'Кефир Свежие новости/Бабушкина крынка 900г бут',
            faces: 2,
            images: ['kefirSvezhiyeNovosti900', 'kefirBabushkinaKrynka900'],
          },
          {
            name: 'Кефир Савушкин 950г бут',
            faces: 6,
            images: ['kefirSavushkin950'],
          },
          {
            name: 'Ряженка Савушкин 950г бут',
            faces: 2,
            images: ['ryazhenkaSavushkin950'],
          },
          {
            name: 'TEOS PRO/ТОП POWER',
            faces: 6,
            faceSpan: 5.25,
            images: ['kefirTeosPro', 'kefirTopPower'],
          },
          {
            name: 'TEOS PRO 250г бут',
            faces: 4,
            faceSpan: 3,
            images: ['kefirTeosPro250'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Кефир Славянские традиции/Минская марка 900мл бут',
            faces: 2,
            images: ['kefirSlavyanskieTraditsii900', 'kefirMinskayaMarka900'],
          },
          {
            name: 'Биокефир Здравушка/Кефир МОЖНО 930г бут',
            faces: 2,
            images: ['kefirZdravushkaBio930', 'kefirMozhno930'],
          },
          {
            name: 'Кефир Беллакт 900г бут',
            faces: 2,
            images: ['kefirBellakt900'],
          },
          {
            name: 'Кефир Савушкин 950г бут',
            faces: 6,
            images: ['kefirSavushkin950'],
          },
          {
            name: 'Ряженка Савушкин 950г бут',
            faces: 2,
            images: ['ryazhenkaSavushkin950'],
          },
          {
            name: 'Коктейль молочный ТМ ТОП, ШЕЙК, ПАУЭР, КАФЕ, КУЛ, МИСТЕРИ 330-450г бут',
            faces: 6,
            faceSpan: 5.25,
            images: ['kefirMilkCocktailTop330450'],
          },
          {
            name: 'Бионапиток Активил 500г бут',
            faces: 4,
            faceSpan: 3,
            images: ['kefirBionapitokAktivl500'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Кефир/Продукт кефирный в пленке',
            faces: 10,
            images: ['kefirFilmAssorted'],
          },
          {
            name: 'Ряженка/закваска Агрокомбинат Снов 500г пленка',
            faces: 2,
            images: ['ryazhenkaZakvaskaAgrokombinatSnov500'],
          },
          {
            name: 'Сыворотка молочная Бабушкина крныка/Complimilk 1л пленка',
            faces: 2,
            images: ['wheyBabushkinaKrynkaComplimilk1l'],
          },
          {
            name: 'Савушкин с какао 750г',
            faces: 2,
            images: ['kefirSavushkinCocoa750'],
          },
          {
            name: 'ТОП ФРЕШ сыворочный с соком 500г бут',
            faces: 2,
            images: ['wheyTopFreshJuice500'],
          },
          {
            name: 'Сыворочный Савушкин Свежесть 850г бут',
            faces: 4,
            faceSpan: 4.25,
            images: ['wheySavushkinSvezhest850'],
          },
        ],
      },
    ],
  },
  {
    id: 'tvorog',
    title: 'Сметана и творог',
    color: '#2e7d32',
    background: '#e8f6e9',
    shelves: [
      {
        products: [
          {
            name: 'Сметана ТМ Брест-Литовск 380г пл.ст.',
            faces: 5,
            faceSpan: 6.25,
            images: ['smetanaBrestLitovsk380'],
          },
          {
            name: 'Сметана Свежие новости 380г пл.ст.',
            faces: 2,
            faceSpan: 2.5,
            images: ['smetanaSvezhiyeNovosti380'],
          },
          {
            name: 'Сметана Молочные горки 300г пл.ст.',
            faces: 1,
            faceSpan: 1.25,
            images: ['smetanaMolochnyeGorki300'],
          },
          {
            name: 'Творог Ляховичок Рассыпчатый 5% 700г пакет',
            faces: 1,
            faceSpan: 1.5,
            images: ['tvorogLyakhovichokRassypchatyy5700g'],
          },
          {
            name: 'Творог Ляховичок рассыпчатый 5% 350г пакет',
            faces: 1,
            faceSpan: 1.25,
            images: ['tvorogLyakhovichokRassypchatyy5350g'],
          },
          {
            name: 'Творог Ляховичок рассыпчатый 2% 350г пакет',
            faces: 1,
            faceSpan: 1.25,
            images: ['tvorogLyakhovichokRassypchatyy2350g'],
          },
          {
            name: 'Творог Клецкая крыначка Классический обезжир 400г пакет',
            faces: 1,
            faceSpan: 1.25,
            images: ['tvorogKletskayaKrynachkaKlassicheskiyObezhir400'],
          },
          {
            name: 'Творог Клецкая крыначка Классический 9% 400г пакет',
            faces: 1,
            faceSpan: 1.25,
            images: ['tvorogKletskayaKrynachkaKlassicheskiy9400'],
          },
          {
            name: 'Творог Ясь Белоус Классический 5% 400г пакет',
            faces: 1,
            faceSpan: 1.25,
            images: ['tvorogYasBelousKlassicheskiy5400'],
          },
          {
            name: 'Творог Ясь Белоус Классический 5% 700г пакет',
            faces: 1,
            faceSpan: 1.5,
            images: ['tvorogYasBelousKlassicheskiy5700'],
          },
          {
            name: 'Творог Савушкин рассыпчат 5% 500г пакет',
            faces: 2,
            faceSpan: 3.25,
            images: ['tvorogSavushkinRassypchatyy5500'],
          },
          {
            name: 'Творог Савушкин рассыпчат 5% 700г пакет',
            faces: 2,
            faceSpan: 3.25,
            images: ['tvorogSavushkinRassypchat5700'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Сметана ТМ Брест-Литовск 380г пл.ст.',
            faces: 5,
            faceSpan: 6.25,
            images: ['smetanaBrestLitovsk380'],
          },
          {
            name: 'Сметана Ляховичок 350г пл/ст',
            faces: 2,
            faceSpan: 2.5,
            images: ['smetanaLyakhovichok350'],
          },
          {
            name: 'Сметана Ясь Белоус 350г пл.ст.',
            faces: 1,
            faceSpan: 1.25,
            images: ['smetanaYasBelous350'],
          },
          {
            name: 'Творог Молочные горки безлактоз 5% 350г пакет',
            faces: 1,
            faceSpan: 1.5,
            images: ['tvorogMolochnyeGorkiBezlaktoz5350'],
          },
          {
            name: 'Творог 1М безлактоз 5% 350г пакет',
            faces: 1,
            faceSpan: 1.5,
            images: ['tvorog1MBezlaktoz5350'],
          },
          {
            name: 'Творог Славянские традиции рассыпчат 2%/5% 350г пакет',
            faces: 2,
            faceSpan: 3.125,
            images: [
              'tvorogSlavyanskieTraditsiiRassypchat2',
              'tvorogSlavyanskieTraditsiiRassypchat5',
            ],
          },
          {
            name: 'Творог Минская марка рассыпчат 9% 350г пакет',
            faces: 1,
            faceSpan: 1.5,
            images: ['tvorogMinskayaMarkaRassypchat9350'],
          },
          {
            name: 'Творог Минская марка рассыпчат 5% 350г пакет',
            faces: 1,
            faceSpan: 1.5,
            images: ['tvorogMinskayaMarkaRassypchat5350'],
          },
          {
            name: 'Творог Савушкин рассыпчат 5% 350г пакет',
            faces: 2,
            faceSpan: 3.25,
            images: ['tvorogSavushkinRassypchat5350'],
          },
          {
            name: 'Творог Савушкин рассыпчат 9% 350г пакет',
            faces: 2,
            faceSpan: 3.25,
            images: ['tvorogSavushkinRassypchat9350'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Сметана ТМ Брест-Литовск 380г пл.ст.',
            faces: 5,
            faceSpan: 6.25,
            images: ['smetanaBrestLitovsk380'],
          },
          {
            name: 'Сметана Славянские традиции/1М Молочный/Минская марка 380г пл.ст.',
            faces: 3,
            faceSpan: 3.75,
            images: ['smetanaSlavyanskieTraditsii1MMolchnyMinskaya380'],
          },
          {
            name: 'Творог Беллакт 5% 280г шайба',
            faces: 1,
            faceSpan: 1.25,
            images: ['tvorogBellakt5280'],
          },
          {
            name: 'Творог Удачный выбор 3%/6% фас вес 1кг шайба',
            faces: 1,
            faceSpan: 1.25,
            images: ['tvorogUdachnyyVybor361kg'],
          },
          {
            name: 'Творог Славянские традиции 5%/9% 335г. шайба',
            faces: 1,
            faceSpan: 1.25,
            images: ['tvorogSlavyanskieTraditsii59335'],
          },
          {
            name: 'Творог Славянские традиции 5%/9% 355г шайба',
            faces: 2,
            faceSpan: 2.5,
            images: ['tvorogSlavyanskieTraditsii59355'],
          },
          {
            name: 'Творог Славянские традиции 9% 375г шайба',
            faces: 1,
            faceSpan: 1.25,
            images: ['tvorogSlavyanskieTraditsii9375'],
          },
          {
            name: 'Творог Остромечевские просторы Домашний 9% вес 1кг шайба',
            faces: 1,
            faceSpan: 1.25,
            images: ['tvorogOstromechevskieProstoryDomashniy91kg'],
          },
          {
            name: 'Творог Брест-Литовск 5% 300г шайба',
            faces: 1,
            faceSpan: 1.25,
            images: ['tvorogBrestLitovsk5300'],
          },
          {
            name: 'Творог Брест-литовск 9% 300г шайба',
            faces: 1,
            faceSpan: 1.25,
            images: ['tvorogBrestLitovsk9300'],
          },
          {
            name: 'Творог Савушкин 1% 300г шайба',
            faces: 1,
            faceSpan: 1.25,
            images: ['tvorogSavushkin1300'],
          },
          {
            name: 'Творог Савушкин 5% 300г шайба',
            faces: 2,
            faceSpan: 2.5,
            images: ['tvorogSavushkin5300'],
          },
          {
            name: 'Творог Савушкин 9% 300г шайба',
            faces: 1,
            faceSpan: 1.25,
            images: ['tvorogSavushkin9300'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Сметана ТМ Брест-литовск в пл.ст. 180г',
            faces: 5,
            faceSpan: 6.25,
            height: 2,
            images: ['smetanaBrestLitovsk180'],
          },
          {
            name: 'Сметана Минская марка 180г пл.ст.',
            faces: 3,
            faceSpan: 3.75,
            height: 2,
            images: ['smetanaMinskayaMarka180'],
          },
          {
            name: 'Творог Молочные горки 5% 180г пачка',
            faces: 1,
            images: ['tvorogMolochnyeGorki5180'],
          },
          {
            name: 'Творог Беллакт 5%/9% 180г пачка',
            faces: 1,
            images: ['tvorogBellakt5180', 'tvorogBellakt9180'],
          },
          {
            name: 'Творог Ляховичок 2%/5%/9%/15% 200г пачка',
            faces: 2,
            images: [
              'tvorogLyakhovichok2200',
              'tvorogLyakhovichok5200',
              'tvorogLyakhovichok9200',
              'tvorogLyakhovichok15200',
            ],
          },
          {
            name: 'Творог Савушкин 2% 180г пачка',
            faces: 1,
            images: ['tvorogSavushkin2180'],
          },
          {
            name: 'Творог Савушкин 5% 180г пачка',
            faces: 3,
            images: ['tvorogSavushkin5180'],
          },
          {
            name: 'Творог Савушкин 9% 180г пачка',
            faces: 2,
            images: ['tvorogSavushkin9180'],
          },
          {
            name: 'Творог Савушкин 5% 180г клинок',
            faces: 2,
            images: ['tvorogSavushkin5180Klinok'],
          },
          {
            name: 'Творог Савушкин 9% 180г клинок',
            faces: 2,
            images: ['tvorogSavushkin9180Klinok'],
          },
          {
            name: 'Творог ТМ Свежие новости 7% 220г клинок',
            faces: 2,
            images: ['tvorogSvezhiyeNovosti7220'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Сметана ТМ Брест-литовск в пл.ст. 180г',
            faces: 5,
            faceSpan: 6.25,
            height: 2,
            images: ['smetanaBrestLitovsk180'],
          },
          {
            name: 'Сметана Свежие новости 180г пл.ст.',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['smetanaSvezhiyeNovosti180'],
          },
          {
            name: 'Сметана Здравушка 180г пл.ст.',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['smetanaZdravushka180'],
          },
          {
            name: 'Сметана Молочный мир 200г пл.ст.',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['smetanaMolochnyyMir200'],
          },
          {
            name: 'Творог Снов 12% 250г линкавер',
            faces: 1,
            faceSpan: 1.25,
            images: ['tvorogSnov12250'],
          },
          {
            name: 'Творог Ясь Белоус 4%/Творог Здравушка 5%/9% 200г флоу-пак',
            faces: 2,
            images: ['tvorogYasBelous4Flow200', 'tvorogZdravushka59Flow200'],
          },
          {
            name: 'Творог Complimilk 6% 200г пачка',
            faces: 1,
            images: ['tvorogComplimilk6200'],
          },
          {
            name: 'Творог Минская марка Традиционный 2%/5%/9% 180г пачка',
            faces: 3,
            images: [
              'tvorogMinskayaMarkaTraditsionny2180',
              'tvorogMinskayaMarkaTraditsionny5180',
              'tvorogMinskayaMarkaTraditsionny9180',
            ],
          },
          {
            name: 'Творог Бабушкина крынка 1%/5%/7%/10% 200г пачка',
            faces: 3,
            images: [
              'tvorogBabushkinaKrinka1200',
              'tvorogBabushkinaKrinka5200',
              'tvorogBabushkinaKrinka7200',
              'tvorogBabushkinaKrinka10200',
            ],
          },
          {
            name: 'Творог Cream Nuvo 9%/5% 200г пл.конт.',
            faces: 1,
            faceSpan: 1.375,
            height: 2,
            images: ['tvorogCreamNuvo95200'],
          },
          {
            name: 'Творог Cream Nuvo 9%/5% 380г пл.конт.',
            faces: 1,
            faceSpan: 1.375,
            height: 2,
            images: ['tvorogCreamNuvo95380'],
          },
          {
            name: 'Творог Молочная страна Домашний зернен 4% 400г контейнер',
            faces: 1,
            faceSpan: 1.75,
            images: ['tvorogMolochnayaStranaDomashniyZerneny4400'],
          },
          {
            name: 'Творог Молочная страна Домашний зернен 4% 500г ведро',
            faces: 1,
            faceSpan: 1.25,
            images: ['tvorogMolochnayaStranaDomashniyZerneny4500'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Сметана в пленке различной жирности',
            faces: 8,
            faceSpan: 10,
            images: ['smetanaVPlenkeRazlichnoyZhirkosti'],
          },
          {
            name: 'Маргарины/спреды в асс-те',
            faces: 1,
            faceSpan: 2.5,
            images: ['margarinySpredyAssorte'],
          },
          {
            name: 'Масло топленое',
            faces: 1,
            faceSpan: 2.5,
            images: ['masloToplenoe'],
          },
          {
            name: 'Крем на растительных маслах De Olio',
            faces: 1,
            faceSpan: 1.25,
            images: ['kremNaRastitelnykhMaslakhDeOlio'],
          },
          {
            name: 'Масло сливочное',
            faces: 2,
            faceSpan: 5,
            images: ['masloSlivochnoe1', 'masloSlivochnoe2'],
          },
          {
            name: 'Масло сливочное Савушкин',
            faces: 1,
            faceSpan: 5,
            images: ['masloSlivochnoeSavushkin'],
          },
        ],
      },
    ],
  },
  {
    id: 'yogurt',
    title: 'Йогурты',
    color: '#e65100',
    background: '#fff1e3',
    shelves: [
      {
        products: [
          {
            name: 'Йогурт питьевой Савушкин Легкий в асс 415г бут.',
            faces: 5,
            faceSpan: 3.75,
            images: ['yogurtPitievoySavushkinLegkiyAss415'],
          },
          {
            name: 'Йогурт питьевой Савушкин в асс 415г бут',
            faces: 4,
            faceSpan: 3,
            images: ['yogurtPitievoySavushkinAss415'],
          },
          {
            name: 'Йогурт питьевой Оптималь в асс 415г бут',
            faces: 12,
            faceSpan: 9.25,
            images: ['yogurtPitievoyOptimalAss415'],
          },
          {
            name: 'Йогуртная группа Данон в асс',
            faces: 1,
            faceSpan: 7.5,
            images: ['yogurtnayaGruppaDanonAss'],
          },
          {
            name: 'Биойогурт/йогурт А2 АСАБЛИВЫ в асс 330г ст.бан',
            faces: 3,
            faceSpan: 2.625,
            height: 2,
            images: ['bioyogurtYogurtA2AsablivyAss330'],
          },
          {
            name: 'Напиток Молочный мир Йогофит в асс 420г бут',
            faces: 4,
            faceSpan: 3,
            images: ['napitokMolochnyyMirYogofitAss420'],
          },
          {
            name: 'Напиток йогуртный Молочный мир Узнай мир в асс 420г бут',
            faces: 4,
            faceSpan: 3,
            images: ['napitokYogurtnyyMolochnyyMirUznayMirAss420'],
          },
          {
            name: 'Йогурт Здравушка Греческий в асс 430г бут',
            faces: 2,
            faceSpan: 1.5,
            images: ['yogurtZdravushkaGrecheskiyAss430'],
          },
          {
            name: 'Йогурт питьевой Yoguru с пробиотиком в асс 320г бут',
            faces: 3,
            faceSpan: 2.25,
            images: ['yogurtPitievoyYoguruProbiotikAss320'],
          },
          {
            name: 'Йогурт Yoguru в асс 500г пюр пак',
            faces: 5,
            faceSpan: 3.75,
            images: ['yogurtYoguruAss500'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Йогурт Савушкин в асс 120г пл.ст',
            faces: 7,
            faceSpan: 5.5,
            height: 4,
            images: ['yogurtSavushkinAss120'],
          },
          {
            name: 'Йогурт TEOS Греческий в асс 250г пл. ст',
            faces: 5,
            faceSpan: 6.875,
            height: 2,
            images: ['yogurtTeosGrecheskiyAss250'],
          },
          {
            name: 'Йогурт Апети в асс 105г пл.ст',
            faces: 3,
            faceSpan: 3.5,
            height: 3,
            images: ['yogurtApetiAss105'],
          },
          {
            name: 'Йогуртная группа Данон в асс',
            faces: 1,
            faceSpan: 7.5,
            images: ['yogurtnayaGruppaDanonAss'],
          },
          {
            name: 'Биойогурт/йогурт А2 АСАБЛИВЫ в асс 330г ст.бан',
            faces: 3,
            faceSpan: 2.625,
            height: 2,
            images: ['bioyogurtYogurtA2AsablivyAss330'],
          },
          {
            name: 'Йогурт EPICA CRISPY в асс 140г пл.ст',
            faces: 3,
            faceSpan: 4.25,
            height: 2,
            images: ['yogurtEpicaCrispyAss140'],
          },
          {
            name: 'Йогурт Молочный мир Белорусский в асс 150-350г пл.ст',
            faces: 2,
            faceSpan: 2.375,
            height: 2,
            images: ['yogurtMolochnyyMirBeloruskiyAss150350'],
          },
          {
            name: 'Йогурт Yoguru в асс 310г пл.ст',
            faces: 3,
            faceSpan: 3.5,
            height: 2,
            images: ['yogurtYoguruAss310'],
          },
          {
            name: 'Йогурт Yoguru в асс 125г пл.ст',
            faces: 4,
            faceSpan: 3.25,
            height: 3,
            images: ['yogurtYoguruAss125'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Паста творожная Савушкин в асс 100г/120г пл.ст',
            faces: 5,
            faceSpan: 5.5,
            height: 3,
            images: ['pastaTvorozhnayaSavushkinAss100120'],
          },
          {
            name: 'Йогурт TEOS Греческий в асс 140г пл.ст',
            faces: 5,
            faceSpan: 6.875,
            height: 3,
            images: ['yogurtTeosGrecheskiyAss140'],
          },
          {
            name: 'Йогурт СуперКид в асс 103г пл.ст',
            faces: 4,
            faceSpan: 3.75,
            height: 3,
            images: ['yogurtSuperkidAss103'],
          },
          {
            name: 'Йогуртная группа Данон в асс',
            faces: 1,
            faceSpan: 7.5,
            images: ['yogurtnayaGruppaDanonAss'],
          },
          {
            name: 'Йогурт Беллакт Sweet Heart в асс 150г пл.ст',
            faces: 3,
            faceSpan: 2.75,
            height: 3,
            images: ['yogurtBellaktSweetHeartAss150'],
          },
          {
            name: 'Десерт творожный GRAND DUET в асс 135г пл.ст',
            faces: 3,
            faceSpan: 4.125,
            height: 2,
            images: ['desertTvorozhnyyGrandDuetAss135'],
          },
          {
            name: 'Йогурт Молочный мир Yogo-fruit в асс 150г пл.ст',
            faces: 2,
            height: 3,
            images: ['yogurtMolochnyyMirYogoFruitAss150'],
          },
          {
            name: 'Йогурт Yogo Bubble в асс 120г пл.ст',
            faces: 1,
            faceSpan: 1.1875,
            height: 3,
            images: ['yogurtYogoBubbleAss120'],
          },
          {
            name: 'Йогурт Бабушкина крынка Creamy в асс 230г пл.ст',
            faces: 1,
            faceSpan: 1.1875,
            height: 3,
            images: ['yogurtBabushkinaKrinkaCreamyAss230'],
          },
          {
            name: 'Йогурт Бабушкина крынка Детокс в асс 230г пл.ст',
            faces: 2,
            faceSpan: 2.375,
            height: 3,
            images: ['yogurtBabushkinaKrinkaDetoksAss230'],
          },
          {
            name: 'Йогурт Eco Greco Греческий в асс 230-310г пл.ст',
            faces: 2,
            faceSpan: 2.375,
            height: 3,
            images: ['yogurtEcoGrecoGrecheskiyAss230310'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Творог мягкий Савушкин Нежный 5% 125г пл.ст',
            faces: 1,
            faceSpan: 1.1875,
            height: 3,
            images: ['tvorogMyagkiySavushkinNezhnyy5125'],
          },
          {
            name: 'Творог мягкий Савушкин Нежный обезжир 125г пл.ст',
            faces: 1,
            faceSpan: 1.1875,
            height: 3,
            images: ['tvorogMyagkiySavushkinNezhnyyObezhir125'],
          },
          {
            name: 'Творог мягкий Минская марка 4% 150г пл.ст',
            faces: 1,
            faceSpan: 1.1875,
            height: 3,
            images: ['tvorogMyagkiyMinskayaMarka4150'],
          },
          {
            name: 'Творог зерненый Минская марка 5% 140г пл.ст',
            faces: 1,
            faceSpan: 1.1875,
            height: 3,
            images: ['tvorogZernenyMinskayaMarka5140'],
          },
          {
            name: 'Творог зерненый Ясь Белоус Вясковы 3% 200г пл.ст',
            faces: 1,
            faceSpan: 1.125,
            height: 3,
            images: ['tvorogZernenyYasBelousVyaskovy3200'],
          },
          {
            name: 'Творог зерненый Савушкин 5% 200г пл.ст',
            faces: 1,
            faceSpan: 1.1875,
            height: 3,
            images: ['tvorogZernenySavushkin5200'],
          },
          {
            name: 'Творог зерненый Савушкин 5% 130г пл.ст',
            faces: 1,
            faceSpan: 1.1875,
            height: 3,
            images: ['tvorogZernenySavushkin5130'],
          },
          {
            name: 'Творог зерненый Савушкин с наполнителем 130г пл.ст',
            faces: 4,
            faceSpan: 4.75,
            height: 3,
            images: ['tvorogZernenySavushkinSNapolnitelem130'],
          },
          {
            name: 'Сырок глазир ТОП шоколад 40г',
            faces: 1,
            height: 4,
            images: ['syrokGlazirTopShokolad40'],
          },
          {
            name: 'Сырок глазир ТОП клубника 40г',
            faces: 1,
            height: 4,
            images: ['syrokGlazirTopKlubnika40'],
          },
          {
            name: 'Сырок глазир ТОП малина в белой глазури 40г',
            faces: 1,
            height: 4,
            images: ['syrokGlazirTopMalinaVBeloyGlazuri40'],
          },
          {
            name: 'Сырок глазир ТОП черника в белой глазури 40г',
            faces: 1,
            height: 4,
            images: ['syrokGlazirTopChernikaVBeloyGlazuri40'],
          },
          {
            name: 'Сырок ТОПх2 карамель с печеньем 45г',
            faces: 1,
            height: 4,
            images: ['syrokTopKh2KaramelSPechenyem45'],
          },
          {
            name: 'Сырок ТОПх2 соленая карамель 45г',
            faces: 1,
            height: 4,
            images: ['syrokTopKh2SolenayaKaramel45'],
          },
          {
            name: 'Сырок ТОПх2 кокос 45г',
            faces: 1,
            height: 4,
            images: ['syrokTopKh2Kokos45'],
          },
          {
            name: 'Сырок глазир Ми-шу! 50г фольга',
            faces: 1,
            height: 2,
            images: ['syrokGlazirMiShu50Folga'],
          },
          {
            name: 'Сырок глазир Ми-шу!с какао 50г фольга',
            faces: 1,
            height: 2,
            images: ['syrokGlazirMiShuSKakao50Folga'],
          },
          {
            name: 'Сырки глазир Бабушкина крынка/Веселые внучата в асс 40-45г фольга/флоу-пак',
            faces: 3,
            faceSpan: 3.75,
            height: 3,
            images: ['syrkiGlazirBabushkinaKrinkaVeselyeVnuchataAss4045'],
          },
          {
            name: 'Сырки глазир Ясь Белоус/Клецкая крыначка 45г флоу-пак в асс',
            faces: 3,
            faceSpan: 3.75,
            height: 4,
            images: ['syrkiGlazirYasBelousKletskaKrinachkaAss45'],
          },
          {
            name: 'Сырок глазир Молочный мир в асс 40г флоу-пак',
            faces: 1,
            faceSpan: 1.25,
            height: 3,
            images: ['syrokGlazirMolochnyyMirAss40'],
          },
          {
            name: 'Пирожное Беллакт в асс 75-100г флоу-пак',
            faces: 3,
            faceSpan: 3.75,
            height: 3,
            images: ['pirozhnoeBellaktAss75100'],
          },
          {
            name: 'Пирожное с творогом с вафлей Беллакт 50г флоу-пак',
            faces: 2,
            faceSpan: 1.5,
            height: 3,
            images: ['pirozhnoeSTvorogomSVafleyBellakt50'],
          },
          {
            name: 'Торт Беллакт 200г флоу-пак',
            faces: 1,
            height: 3,
            images: ['tortBellakt200'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Крема творожные Беллакт в асс 200г пл.ст',
            faces: 3,
            faceSpan: 2.8125,
            height: 3,
            images: ['kremaTvorozhnyeBellaktAss200'],
          },
          {
            name: 'Десерт творожный Беллакт в асс-те 120г пл.ст',
            faces: 1,
            height: 3,
            images: ['desertTvorozhnyyBellaktAss120'],
          },
          {
            name: 'Крема творожные Венский завтрак в асс. 150г пл.ст',
            faces: 2,
            faceSpan: 1.875,
            height: 3,
            images: ['kremaTvorozhnyeVenskiyZavtrakAss150'],
          },
          {
            name: 'Десерты творожные Венский завтрак в асс 150г пл.ст.',
            faces: 4,
            faceSpan: 3.75,
            height: 3,
            images: ['desertyTvorozhnyeVenskiyZavtrakAss150'],
          },
          {
            name: 'Десерт творожный Венский завтрак взбит в асс 125г пл.ст',
            faces: 2,
            faceSpan: 2.375,
            height: 3,
            images: ['desertTvorozhnyyVenskiyZavtrakVzbitAss125'],
          },
          {
            name: 'Пудинг Минская марка в асс 160г пл.ст',
            faces: 1,
            faceSpan: 1.25,
            height: 3,
            images: ['pudingMinskayaMarkaAss160'],
          },
          {
            name: 'Сырок глазир Моя Аленка 40г',
            faces: 1,
            height: 4,
            images: ['syrokGlazirMoyaAlenka40'],
          },
          {
            name: 'Сырок глазир Любимая Коровка 40г',
            faces: 1,
            height: 4,
            images: ['syrokGlazirLyubimayaKorovka40'],
          },
          {
            name: 'Сырок глазир кокос-миндаль 40г/Сырок глазир Савушкин Юбилейный 40г',
            faces: 1,
            height: 4,
            images: [
              'syrokGlazirKokosMindal40',
              'syrokGlazirSavushkinYubileynyy40',
            ],
          },
          {
            name: 'Сырок глазир Чизкейк 40г/Сырок глазир Муравейник 40г',
            faces: 1,
            height: 4,
            images: ['syrokGlazirChizkeik40', 'syrokGlazirMuraveynik40'],
          },
          {
            name: 'Сырок глазир Брест Литовск крем-брюле 45г',
            faces: 1,
            height: 2,
            images: ['syrokGlazirBrestLitovskKremBryule45'],
          },
          {
            name: 'Сырок глазир Брест Литовск ваниль 45г/Сырок Брест Литовск с какао 45г',
            faces: 1,
            height: 2,
            images: ['syrokBrestLitovskVanilKakao45'],
          },
          {
            name: 'Сырок глазир Плюш ваниль в карамельной глазури 45г',
            faces: 1,
            height: 2,
            images: ['syrokGlazirPlyushVanilKaramelnoyGlazuri45'],
          },
          {
            name: 'Сырок глазир Плюш ванильный 45г',
            faces: 1,
            height: 2,
            images: ['syrokGlazirPlyushVanilnyy45'],
          },
          {
            name: 'Сырок глазир Плюш какао 45г',
            faces: 1,
            height: 2,
            images: ['syrokGlazirPlyushKakao45'],
          },
          {
            name: 'Сырки глазированные "Элитный, Белорусский, 1М Молочный, Минская марка, Молочная страна" в асс',
            faces: 6,
            faceSpan: 7.5,
            height: 4,
            images: [
              'syrokiGlazirovannyeAss1',
              'syrokBelorusskiyVanilin',
              'syrokMulazTvorozhnyyDesertKaramel',
            ],
          },
          {
            name: 'Десерты творожные 1М Молочный в асс 45-50г',
            faces: 1,
            faceSpan: 1.25,
            height: 4,
            images: ['desertyTvorozhnye1MMolochnyyAss4550'],
          },
          {
            name: 'Сырки глазир Тимоша/Творожкино в асс 60г флоу-пак',
            faces: 3,
            faceSpan: 3.75,
            height: 4,
            images: ['syrokiGlazirTimosha60', 'syrokiGlazirTvorozhkino60'],
          },
          {
            name: 'Пирожное бисквит Kinder Пингви/Молочный ломтик фольга',
            faces: 2,
            faceSpan: 2.5,
            height: 4,
            images: ['pirozhnoeBiskvitKinderPingviMolochnyyLomtikFolga'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Продукт творожный для запекания сладкий 1кг ведро Беллакт',
            faces: 1,
            faceSpan: 1.625,
            images: ['produktTvorozhnyyDlyaZapekaniyaSladkiy1kgBellakt'],
          },
          {
            name: 'Творог мягкий Славянские традиции 400г',
            faces: 1,
            images: ['tvorogMyagkiySlavyanskieTraditsii400'],
          },
          {
            name: 'Десерт шоколадная колбаса пленка/Визави в асс - 300г',
            faces: 1,
            images: [
              'desertShokoladnayaKolbasaPlenka300',
              'desertVizaviAss300',
            ],
          },
          {
            name: 'Продукт творожный Минская марка Снежок с маком 400г в.уп',
            faces: 1,
            faceSpan: 1.625,
            images: ['produktTvorozhnyyMinskayaMarkaSnezhekSMakom400'],
          },
          {
            name: 'Продукт творожный Молочные горки Тропический микс 180г флоу-пак',
            faces: 1,
            images: ['produktTvorozhnyyMolochnyeGorkiTropicheskiyMiks180'],
          },
          {
            name: 'Масса твор. Снов в асс. 250г флоу-пак',
            faces: 1,
            images: ['massaTvorSnovAss250'],
          },
          {
            name: 'Масса твор. Беллакт в асс 180г цел.уп',
            faces: 1,
            images: ['massaTvorBellaktAss180TselUp'],
          },
          {
            name: 'Десерт творожный Ляховичок Лакомка в асс 100-200г флоу-пак',
            faces: 1,
            images: ['desertTvorozhnyyLyakhovichokLakomkaAss100200'],
          },
          {
            name: 'Десерт Картошка / Сырки твор. Беллакт сладкий в асс 100г флоу-пак',
            faces: 1,
            images: [
              'desertKartoshkaFlowPack',
              'syrokTvorBellaktSladkiyAss100Vanilin',
              'syrokTvorBellaktSladkiyAss100Mango',
            ],
          },
          {
            name: 'Сырки твор. Молочная страна Любимый в асс 100г',
            faces: 1,
            images: ['syrkiTvorMolochnayaStranaLyubimyyAss100'],
          },
          {
            name: 'Сырки творожные Савушкин в асс 100г флоу-пак',
            faces: 2,
            images: [
              'syrkiTvorozhnyeSavushkinAss100FlowPack1',
              'syrkiTvorozhnyeSavushkinAss100FlowPack2',
            ],
          },
          {
            name: 'Йогурт Беллакт в асс 400г пленка',
            faces: 1,
            images: ['yogurtBellaktAss400Plenka'],
          },
          {
            name: 'Паста десертная Беллакт ChocoLoco в асс 250г пл.ст',
            faces: 1,
            faceSpan: 1.1875,
            height: 2,
            images: ['pastaDesertnayaBellaktChocoLocoAss250'],
          },
          {
            name: 'Желе из творожной сыворотки Беллакт в асс 150г',
            faces: 1,
            faceSpan: 1.1875,
            height: 2,
            images: ['zheleIzTvorozhnoySyvorotkiBellaktAss150'],
          },
          {
            name: 'Венский завтрак 140г/Yoguru 150г в асс пл.ст',
            faces: 2,
            faceSpan: 2.375,
            height: 2,
            images: ['venskiyZavtrak140PlSt', 'yoguruAss150PlSt'],
          },
          {
            name: 'Желе со вкусом в асс 150г пл.ст ГМС Про',
            faces: 1,
            faceSpan: 1.1875,
            height: 2,
            images: ['zheleSoVkusomAss150PlStGMSPro'],
          },
          {
            name: 'Крема с творогом Buonissimo в асс 140-180-250г пл.ст',
            faces: 2,
            faceSpan: 2.375,
            height: 2,
            images: ['kremaSTvorogomBuonissimoAss140180250'],
          },
          {
            name: 'Пудинг молочный Гранд Десерт в асс 200-230г пл.ст',
            faces: 1,
            faceSpan: 1.1875,
            height: 2,
            images: ['pudingMolochnyyGrandDesertAss200230'],
          },
          {
            name: 'Продукт йогуртный Fruttis Вкусный перерыв 175г пл.ст',
            faces: 1,
            faceSpan: 1.1875,
            height: 2,
            images: ['produktYogurtnyyFruttisVkusnyyPereryv175'],
          },
          {
            name: 'Продукт йогуртный Fruttis в асс 180г пл.ст',
            faces: 1,
            faceSpan: 1.1875,
            height: 2,
            images: ['produktYogurtnyyFruttisAss180PlSt'],
          },
          {
            name: 'Продукт йогуртный Fruttis сливочное лакомство 5%/Супер-экстра 8% в асс 115г',
            faces: 1,
            faceSpan: 1.875,
            height: 2,
            images: [
              'produktYogurtnyyFruttisSlivochnoeLakomstvo5SuperEkstra8Ass115',
            ],
          },
          {
            name: 'Пудинг Эрманн Эрмигурт/Нежный в асс 100г пл.ст',
            faces: 1,
            faceSpan: 1.875,
            images: [
              'pudingErmannErmigurtAss100PlSt',
              'pudingErmannNezhnyyAss100PlSt',
            ],
          },
          {
            name: 'Пудинг молочный Чудо в асс 125г пл.ст',
            faces: 1,
            faceSpan: 1.625,
            images: ['pudingMolochnyyChudoAss125PlSt'],
          },
          {
            name: 'Йогурт питьевой Савушкин Легкий в асс 900г п.бут',
            faces: 3,
            faceSpan: 3,
            images: ['yogurtPitievoySavushkinLegkiyAss900PBut'],
          },
          {
            name: 'Йогурт питьевой Савушкин в асс 900г бут',
            faces: 3,
            faceSpan: 3,
            images: ['yogurtPitievoySavushkinAss900But'],
          },
          {
            name: 'Йогурт питьевой ТМ Свежие Новости в асс 800г',
            faces: 2,
            faceSpan: 2.5,
            images: ['yogurtPitievoyTMSvezhieNovostiAss800'],
          },
          {
            name: 'Молочный мир Йогофит 950г бут',
            faces: 1,
            images: ['molochnyyMirYogofit950But'],
          },
        ],
      },
    ],
  },
  {
    id: 'health',
    title: 'ЗОЖ (здоровое питание)',
    color: '#827717',
    background: '#f6f4dc',
    shelves: [
      {
        products: [
          {
            name: 'Йогурт питьевой Оптималь без сахара, 2%, 415 г',
            faces: 1,
            images: ['yogurtPitievoyOptimalBezSakhara415'],
          },
          {
            name: 'Йогурт питьевой Бабушкина крынка без сахара, 1.5%, 430 г',
            faces: 1,
            images: ['yogurtPitievoyBabushkinaKrinkaBezSakhara15430'],
          },
          {
            name: 'Йогурт Бабушкина крынка земляника, без добавления сахара, 1.5%, 430 г',
            faces: 1,
            images: [
              'yogurtBabushkinaKrinkaZemlyanikaBezDobavleniyaSakhara15430',
            ],
          },
          {
            name: 'Биойогурт питьевой Parmalat безлактозный в асс 290 г',
            faces: 3,
            images: ['bioyogurtPitievoyParmalatBezlaktoznyyAss290'],
          },
          {
            name: 'Йогурт питьевой #Можно безлактозный в асс 430 г',
            faces: 2,
            images: ['yogurtPitievoyMozhnoBezlaktoznyyAss430'],
          },
          {
            name: 'Биойогурт питьевой АктиБио без сахара 1.8% в асс 260 г',
            faces: 3,
            images: ['bioyogurtPitievoyAktibioBezSakhara18Ass260'],
          },
          {
            name: 'Йогурт обог пробиотиком Yoguru 1.5% 320г пэт-бут',
            faces: 1,
            images: ['yogurtYoguruProbiotik15PetBut320'],
          },
          {
            name: 'Йогурт питьевой Dia Vita 1.5% 280 г',
            faces: 2,
            images: ['yogurtPitievoyDiaVita15280'],
          },
          {
            name: 'Коктейль YoMilk Ptotein 1,5% 200мл',
            faces: 2,
            height: 2,
            images: ['kokteylYoMilkPtotein15200'],
          },
          {
            name: 'Протеиновый коктейль Рогачевъ 210г ТБА',
            faces: 2,
            height: 2,
            images: ['kefirRogachevProtein210'],
          },
          {
            name: 'Коктейль молочный FitElit обезжиренный, протеиновый, 500 г',
            faces: 2,
            images: ['kokteylMolochnyyFitElitObezzhirennyyProteynovyy500'],
          },
          {
            name: 'EXPONENTA BIO-SKYR 3 в 1 500 г.',
            faces: 3,
            images: ['bioSkyrExponenta3v1500'],
          },
          {
            name: 'EXPONENTA кефирная 450г',
            faces: 1,
            images: ['kefirExponenta450'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Йогурт с бифидо. 1,5%, 125 г Yoguru',
            faces: 1,
            faceSpan: 2,
            height: 2,
            images: ['yogurtBifido15Yoguru125'],
          },
          {
            name: 'Йогурт PARMALAT Comfort безлактозный 3,5% без змж 130г',
            faces: 2,
            height: 3,
            images: ['yogurtParmalatComfortBezlaktoznyy35BezZmzh130'],
          },
          {
            name: 'Биойогурт Актибио без сахара 3% 130г',
            faces: 2,
            height: 2,
            images: ['bioyogurtAktibioBezSakhara3130'],
          },
          {
            name: 'Йогурт Греческий Молочный Мир, 1.8%, 140 г',
            faces: 1,
            height: 2,
            images: ['yogurtGreekMolochnyyMir18140'],
          },
          {
            name: 'Йогурт греческий Epica натуральный, 2.5%, 130 г',
            faces: 1,
            faceSpan: 2,
            height: 2,
            images: ['yogurtGreekEpicaNatural25130'],
          },
          {
            name: 'Йогурт греческий Epica натуральный, 2.5%, 130 г',
            faces: 1,
            faceSpan: 2,
            height: 2,
            images: ['yogurtGreekEpicaNatural25130'],
          },
          {
            name: 'Йогурт греческий Epica натуральный, 2.5%, 130 г',
            faces: 1,
            faceSpan: 2,
            height: 2,
            images: ['yogurtGreekEpicaNatural25130'],
          },
          {
            name: 'Молочный коктейль Топ пауэр с высоким содержанием белка, 1%, 450 г',
            faces: 5,
            faceSpan: 6,
            images: ['kokteylMolochyyTopPauerProtein1450'],
          },
          {
            name: 'EXPONENTA BIO-SKYR 3 в 1 500 г.',
            faces: 3,
            images: ['bioSkyrExponenta3v1500'],
          },
          {
            name: 'EXPONENTA кефирная 450г',
            faces: 1,
            images: ['kefirExponenta450'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Сметана Асаблівая А2 12%, 330 г',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['smetanaAsablivayaA212330'],
          },
          {
            name: 'Биойогурт Асаблівы А2 3.6%, 330 г',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['bioyogurtAsablivyA236330'],
          },
          {
            name: 'Йогурт Греческий 2% 140 г Рогачевъ стакан',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['yogurtGreek2Rogachev140Stakan'],
          },
          {
            name: 'Йогурт Греческий Eco Greco',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['yogurtGreekEcoGreco'],
          },
          {
            name: 'Йогурт Yoguru с бифидобактериями, 1.5%, 310 г',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['yogurtYoguruBifidobakterii15310'],
          },
          {
            name: 'Йогурт Yoguru Греческий, без сахара, 1.5%, 180 г',
            faces: 1,
            faceSpan: 1.25,
            height: 4,
            images: ['yogurtYoguruGreekBezSakhara15180'],
          },
          {
            name: 'Йогурт Молочный мир Белорусский, 2%, 150 г',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['yogurtMolochnyyMirBelorusskiy2150'],
          },
          {
            name: 'Йогурт греческий Teos натуральный 2% 250 г',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['yogurtGreekTeosNatural2250'],
          },
          {
            name: 'Йогурт густой Teos, греческий, 2 %, 140 г',
            faces: 1,
            faceSpan: 1.25,
            height: 3,
            images: ['yogurtGustoyTeosGreek2140'],
          },
          {
            name: 'TEOS PRO',
            faces: 3,
            images: ['kefirTeosPro'],
          },
          {
            name: 'TEOS PRO 250г бут',
            faces: 3,
            images: ['kefirTeosPro250'],
          },
          {
            name: 'Напиток Экспонента НОРМ-ПРО 250г бут',
            faces: 2,
            images: ['kefirExponentaNormPro250'],
          },
          {
            name: 'EXPONENTA NORM-PRO 500 г.',
            faces: 3,
            images: ['kefirExponentaNormPro500'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Молоко Асаблівае А2 пастеризованное, 3.6%, 0.75 л',
            faces: 1,
            faceSpan: 1.25,
            images: ['milkAsablivayeA2Pasterizovannoe36075'],
          },
          {
            name: 'Кефир Асаблівы А2, 3.6%, 0.75 кг',
            faces: 1,
            faceSpan: 1.25,
            images: ['kefirAsablivyA236075'],
          },
          {
            name: 'Молоко #Можно безлактозное пастеризованное, 3.2%, 0.93 л',
            faces: 1,
            faceSpan: 1.25,
            images: ['milkMozhnoBezlaktoznoePasterizovannoe32093'],
          },
          {
            name: 'Кефир #Можно безлактозный, 3.2%, 0.93 кг',
            faces: 1,
            faceSpan: 1.25,
            images: ['kefirMozhnoBezlaktoznyy32093'],
          },
          {
            name: 'Кефирный продукт БиоFit 2.5%, 0.95 кг',
            faces: 1,
            faceSpan: 1.25,
            images: ['kefirnyyProduktBioFit25095'],
          },
          {
            name: 'Кефирный продукт БиоFit 2.5%, 0.48 кг',
            faces: 1,
            images: ['kefirnyyProduktBioFit25048'],
          },
          {
            name: 'Сметана безлактозная «Молочные горки» в стакане 20%, 300 г.',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['smetanaBezlaktoznayaMolochnyeGorki20300'],
          },
          {
            name: 'Сметана 1М Молочный безлактозная, 20%, 380 г',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['smetana1MMolochnyyBezlaktoznaya20380'],
          },
          {
            name: 'Сыртвердый Active life безлактозный, 45%, 200 г',
            faces: 1,
            height: 2,
            images: ['syrTverdyyActiveLifeBezlaktoznyy45200'],
          },
          {
            name: 'Сыр сверхтвердый Danke Пармезан, 6 месяцев созревания, треугольник, 40%, 180 г',
            faces: 1,
            height: 2,
            images: ['syrSverkhtverdyyDankeParmesan180'],
          },
          {
            name: 'Сыр DANKE «Пармезан» 6 месяцев созревания, сверхтвердый 40%, 180 г.',
            faces: 1,
            height: 2,
            images: ['syrDankeParmesan180'],
          },
          {
            name: 'EXPONENTA FITNESS CHEESE без лактозы',
            faces: 2,
            height: 2,
            images: ['exponentaFitnessCheeseBezLaktozy'],
          },
          {
            name: 'Напиток кисломолочный Exponenta 250 г',
            faces: 5,
            height: 2,
            images: ['napitokKisloMolochyyExponenta250'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Молоко #Можно безлактозное стерилизованное, 3.2%, 1 л',
            faces: 1,
            faceSpan: 1.25,
            images: ['milkMozhnoBezlaktoznoeSterilizovannoe321'],
          },
          {
            name: 'Молоко стерилизованное "Молочный Мир" безлактозное 3.2% 1л',
            faces: 1,
            faceSpan: 1.25,
            images: ['milkSterilizovannyyMolochnyyMirBezlaktoznyy321'],
          },
          {
            name: 'Напиток молочный Parmalat Protein безлактозный ультрапастеризованный 1.8%  1л',
            faces: 3,
            faceSpan: 3.75,
            images: ['napitokMolochnyyParmalatProteinBezlaktoznyy181'],
          },
          {
            name: 'Молоко Parmalat Protein безлактозное, 1.8%, 0.5 л',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['milkParmalatProteinBezlaktoznoe1805'],
          },
          {
            name: 'Сливки Рогачевъ питьевые, безлактозные, стерилизованные, 11%, 0.2 л',
            faces: 1,
            height: 2,
            images: ['slivkiRogachevPitievyeBezlaktoznye1102'],
          },
          {
            name: 'Сырок творожный Active Protein 5%, 80 г',
            faces: 2,
            height: 2,
            images: ['syrokTvorozhnyyActiveProtein580'],
          },
          {
            name: 'Сырок творожный глаз без сахара 18% 45г Бабушкина',
            faces: 1,
            height: 4,
            images: ['syrokTvorozhnyyGlazBezSakhara1845Babushkina'],
          },
          {
            name: 'Сырок глазированный Минская марка без сахара 45 г',
            faces: 1,
            height: 2,
            images: ['syrokGlazirovannyyMinskayaMarkaBezSakhara45'],
          },
          {
            name: 'Йогурт Exponenta Greek обезжиренный, без сахара, 150 г',
            faces: 3,
            height: 3,
            images: ['yogurtExponentaGreekObezzhirennyyBezSakhara150'],
          },
          {
            name: 'EXPONENTA HIGH-PRO 160г',
            faces: 2,
            height: 3,
            images: ['exponentaHighPro160'],
          },
          {
            name: 'EXPONENTA Экспотоник 500мл бут',
            faces: 3,
            images: ['kefirExponentaExpotonik500'],
          },
        ],
      },
      {
        products: [
          {
            name: 'Planto Barista/Nemoloko 1л ТБА',
            faces: 5,
            faceSpan: 5,
            images: ['plantoBarista1lTba', 'nemoloko1lTba'],
          },
          {
            name: 'Молоко сгущенное безлактозное РОГАЧЕВЪ, 380г',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['milkSgushchennoeBezlaktoznoeRogachev380'],
          },
          {
            name: 'Масло сладкосливоч безлактозное 1М Молочный 82.5%/Масло сладкосливочное несоленое А2',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: [
              'masloSladkoslivochBezlaktoznoe1MMolochnyy825',
              'masloSladkoslivochnoeNesolenoeA2',
            ],
          },
          {
            name: 'Творог мягкий Савушкин Нежный обезжир 125г пл.ст',
            faces: 1,
            faceSpan: 1.25,
            height: 4,
            images: ['tvorogMyagkiySavushkinNezhnyyObezhir125'],
          },
          {
            name: 'Йогурт МОЛОЧНЫЙ МИР Греческий 2%, без змж, 280г/Йогурт греческий Молочный Мир 2%, 500 г',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: [
              'yogurtMolochnyyMirGreek2BezZmzh280',
              'yogurtGreekMolochnyyMir2500',
            ],
          },
          {
            name: 'Творог безлактозный ActiVe life 5% ТМ Молочный мир (220 г)',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['tvorogBezlaktoznyyActiveLife5MolochnyyMir220'],
          },
          {
            name: 'Творог безлактозные «Молочные горки» 5%, 180 г.',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['tvorogBezlaktoznyeMolochnyeGorki5180'],
          },
          {
            name: 'Творог Молочные горки безлактоз 5% 350г пакет/Творог 1М безлактоз 5% 350г пакет',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: [
              'tvorogMolochnyeGorkiBezlaktoz5350',
              'tvorog1MBezlaktoz5350',
            ],
          },
          {
            name: 'Творог зерненый Ясь Белоус вясковы, обезжиренный, 200 г',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['tvorogZernennyyYasBelousVyaskovyObezzhirennyy200'],
          },
          {
            name: 'Творог А2 массовая доля жира 7%',
            faces: 1,
            faceSpan: 1.25,
            height: 2,
            images: ['tvorogA2MassovayaDolyaZhira7'],
          },
          {
            name: 'Exponenta творожная',
            faces: 3,
            height: 3,
            images: ['exponentaTvorozhnaya'],
          },
        ],
      },
    ],
  },
  {
    id: 'baby',
    title: 'Детское питание',
    color: '#c2185b',
    background: '#fce8ef',
    shelves: [],
  },
]

export function groupStyle(group: Group): CSSProperties {
  return {
    '--group-color': group.color,
    '--group-bg': group.background,
  } as CSSProperties
}
