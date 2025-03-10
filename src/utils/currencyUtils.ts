
import { CurrencyRates } from './types';

// Get the current locale from the URL
export const getCurrentLocale = (): string => {
  const pathSegments = window.location.pathname.split('/');
  for (const segment of pathSegments) {
    if (segment.includes('-')) {
      return segment;
    }
  }
  
  // Default to en-US if no locale found
  return 'en-US';
};

// Get currency code from locale
export const getCurrencyFromLocale = (locale: string): string => {
  const localeToCurrency: Record<string, string> = {
    'pt-BR': 'BRL',
    'en-US': 'USD',
    'en-GB': 'GBP',
    'es-AR': 'ARS',
    'tr-TR': 'TRY',
    'de-DE': 'EUR',
    'fr-FR': 'EUR',
    'it-IT': 'EUR',
    'es-ES': 'EUR',
    'ja-JP': 'JPY',
    'ko-KR': 'KRW',
    'zh-CN': 'CNY',
  };
  
  return localeToCurrency[locale] || 'USD';
};

// Check if currency has lower tax rate
export const hasLowerTaxRate = (currency: string): boolean => {
  const lowerTaxCurrencies = ['BRL', 'ARS', 'TRY'];
  return lowerTaxCurrencies.includes(currency);
};

// Format currency based on locale
export const formatCurrency = (amount: number, currencyCode: string): string => {
  const localeMap: Record<string, string> = {
    'USD': 'en-US',
    'BRL': 'pt-BR',
    'GBP': 'en-GB',
    'EUR': 'de-DE',
    'ARS': 'es-AR',
    'TRY': 'tr-TR',
    'JPY': 'ja-JP',
    'KRW': 'ko-KR',
    'CNY': 'zh-CN'
  };
  
  const locale = localeMap[currencyCode] || 'en-US';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 2
  }).format(amount);
};

// Calculate selling price in BRL
export const calculateSellingPriceBRL = (vbucksPrice: number): number => {
  const vbuckCostBRL = 0.023259;
  const taxRate = 0.25; // 25%
  
  return vbuckCostBRL * vbucksPrice * (1 + taxRate);
};

// Calculate selling price with higher tax
export const calculateSellingPriceOther = (vbucksPrice: number): number => {
  const vbuckCostBRL = 0.023259;
  const taxRate = 0.61; // 61%
  
  return vbuckCostBRL * vbucksPrice * (1 + taxRate);
};

// Convert price based on currency rates
export const convertPrice = (
  priceBRL: number, 
  targetCurrency: string, 
  rates: CurrencyRates
): number => {
  if (targetCurrency === 'BRL' || !rates[targetCurrency]) {
    return priceBRL;
  }
  
  return priceBRL * rates[targetCurrency];
};

// Get selling price in the target currency
export const getSellingPrice = (
  vbucksPrice: number, 
  currency: string, 
  rates: CurrencyRates
): number => {
  // First calculate the price in BRL
  const priceBRL = hasLowerTaxRate(currency) 
    ? calculateSellingPriceBRL(vbucksPrice)
    : calculateSellingPriceOther(vbucksPrice);
  
  // Then convert to target currency
  return convertPrice(priceBRL, currency, rates);
};
