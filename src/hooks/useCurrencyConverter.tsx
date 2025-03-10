
import { useState, useEffect } from 'react';
import { CurrencyRates, CurrencyResponse } from '../utils/types';
import { getCurrentLocale, getCurrencyFromLocale } from '../utils/currencyUtils';

const useCurrencyConverter = () => {
  const [rates, setRates] = useState<CurrencyRates>({});
  const [currency, setCurrency] = useState<string>('USD');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/BRL');
        
        if (!response.ok) {
          throw new Error('Failed to fetch currency rates');
        }
        
        const data: CurrencyResponse = await response.json();
        setRates(data.rates);
        
        // Get current locale and set currency
        const locale = getCurrentLocale();
        const currentCurrency = getCurrencyFromLocale(locale);
        setCurrency(currentCurrency);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching currency rates:', err);
        setError('Failed to load currency rates');
        setIsLoading(false);
        
        // Set fallback rates for common currencies
        setRates({
          BRL: 1,
          USD: 0.2,
          EUR: 0.18,
          GBP: 0.15,
          ARS: 26.5,
          TRY: 6.35
        });
      }
    };

    fetchRates();
  }, []);

  return { rates, currency, isLoading, error };
};

export default useCurrencyConverter;
