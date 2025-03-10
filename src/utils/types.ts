
export interface FortniteItemImage {
  icon: string;
  featured: string | null;
  background: string;
  icon_background: string;
  full_background: string;
}

export interface FortniteItemType {
  id: string;
  name: string;
}

export interface FortniteItemRarity {
  id: string;
  name: string;
}

export interface FortniteItemSeries {
  id: string;
  name: string;
}

export interface FortniteItemSet {
  id: string;
  name: string;
  partOf: string;
}

export interface FortniteGrantedItem {
  id: string;
  type: FortniteItemType;
  name: string;
  description: string;
  rarity: FortniteItemRarity;
  series: FortniteItemSeries | null;
  images: FortniteItemImage;
  gameplayTags: string[];
  set: FortniteItemSet | null;
}

export interface FortniteItemPrice {
  regularPrice: number;
  finalPrice: number;
  floorPrice: number;
}

export interface FortniteDisplayAsset {
  url: string;
  background: string;
  full_background: string;
}

export interface FortniteItem {
  mainId: string;
  displayName: string;
  displayDescription: string;
  displayType: string;
  mainType: string;
  offerId: string;
  displayAssets: FortniteDisplayAsset[];
  firstReleaseDate: string;
  previousReleaseDate: string;
  giftAllowed: boolean;
  buyAllowed: boolean;
  price: FortniteItemPrice;
  rarity: FortniteItemRarity;
  series: FortniteItemSeries | null;
  granted: FortniteGrantedItem[];
  section: {
    id: string;
    name: string;
  };
}

export interface FortniteShopSection {
  name: string;
  items: FortniteItem[];
}

export interface FortniteShopData {
  lastUpdate: {
    date: string;
  };
  shop: FortniteItem[];
}

export interface CurrencyRates {
  [key: string]: number;
}

export interface CurrencyResponse {
  base_code: string;
  rates: CurrencyRates;
}
