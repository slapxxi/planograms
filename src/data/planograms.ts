import type { CSSProperties } from 'react'
import type { ProductImageKey } from './productImages'

export type Product = {
  name: string
  faces: number
  faceSpan?: number
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
            images: ['rogachev200'],
          },
          {
            name: 'Сливки Беллакт 10-20% 200г',
            faces: 1,
            images: ['bellakt'],
          },
          {
            name: 'Крем для взбивания Беллакт 33% 200г',
            faces: 1,
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
            images: ['sgushchennoeGlubokoe85'],
          },
          {
            name: 'Сгущ. молоко 8.5% Рогачевъ',
            faces: 1,
            images: ['sgushchennoeRogachev85'],
          },
          {
            name: 'Сгущ. молоко вар. Лакомка/Егорка',
            faces: 1,
            images: ['sgushchennoeLakomka', 'sgushchennoeEgorka'],
          },
          {
            name: 'Молоко сгущ. с какао Рогачев/Глубокое',
            faces: 1,
            images: ['sgushchennoeKakaoRogachev', 'sgushchennoeKakaoGlubokoe'],
          },
          {
            name: 'Молоко сгущ. 5% Глубокое',
            faces: 1,
            images: ['sgushchennoeGlubokoe5'],
          },
          {
            name: 'Молоко сгущ. с ставней Глубокое',
            faces: 1,
            images: ['sgushchennoeGlubokoeStavney'],
          },
          {
            name: 'Молоко сгущ с фруктозой Глубокое',
            faces: 1,
            images: ['sgushchennoeGlubokoeFructose'],
          },
          {
            name: 'Молоко конц. 8.6% Глубокое',
            faces: 1,
            images: ['milkConcentratedGlubokoe86'],
          },
          {
            name: 'Сливки сгущ. Глубокое/Рогачевъ',
            faces: 1,
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
            faceSpan: 4,
            images: ['milkDepi250'],
          },
          {
            name: 'Молоко Бабушкина крынка 200мл',
            faces: 3,
            faceSpan: 2.5,
            images: ['milkBabushkinaKrynka200'],
          },
          {
            name: 'Молоко Рогачевъ 200мл',
            faces: 3,
            faceSpan: 2.5,
            images: ['milkRogachev200ml'],
          },
          {
            name: 'Молоко Беллакт 200мл',
            faces: 3,
            faceSpan: 2.5,
            images: ['milkBellakt200ml'],
          },
          {
            name: 'Молоко козье Беллакт 200мл',
            faces: 2,
            faceSpan: 1,
            images: ['milkGoatBellakt200ml'],
          },
          {
            name: 'Молочный мир асс. 280г бут',
            faces: 3,
            images: ['molochnyyMirAssorti280'],
          },
          {
            name: 'Чудо коктейль мол 200мл',
            faces: 5,
            faceSpan: 2.5,
            images: ['chudoKokteylMol200'],
          },
          {
            name: 'Чудо коктейль мол 960г',
            faces: 3,
            faceSpan: 4,
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
            name: 'Кефир Савушкин 415г бут',
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
            images: ['kefirRogachevProtein210'],
          },
          {
            name: 'Напиток Exponenta пюр-пак',
            faces: 6,
            faceSpan: 5,
            images: ['kefirExponenta'],
          },
          {
            name: 'Напиток Экспонента НОРМ-ПРО 250г бут',
            faces: 3,
            faceSpan: 2,
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
        ],
      },
    ],
  },
  {
    id: 'tvorog',
    title: 'Сметана и творог',
    color: '#2e7d32',
    background: '#e8f6e9',
    shelves: [],
  },
  {
    id: 'yogurt',
    title: 'Йогурты',
    color: '#e65100',
    background: '#fff1e3',
    shelves: [],
  },
  {
    id: 'health',
    title: 'ЗОЖ (здоровое питание)',
    color: '#827717',
    background: '#f6f4dc',
    shelves: [],
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
