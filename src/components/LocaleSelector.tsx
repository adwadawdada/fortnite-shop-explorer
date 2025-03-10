
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrencyFromLocale } from '@/utils/currencyUtils';

const LocaleSelector = () => {
  const navigate = useNavigate();
  
  const locales = [
    { code: 'pt-BR', name: 'BRL' },
    { code: 'en-US', name: 'USD' },
    { code: 'en-GB', name: 'GBP' },
    { code: 'es-AR', name: 'ARS' },
    { code: 'tr-TR', name: 'TRY' },
    { code: 'de-DE', name: 'EUR' },
    { code: 'ja-JP', name: 'JPY' },
    { code: 'ko-KR', name: 'KRW' },
    { code: 'zh-CN', name: 'CNY' }
  ];
  
  const handleLocaleChange = (locale: string) => {
    navigate(`/${locale}`);
  };
  
  return (
    <div className="flex justify-center mb-4">
      <div className="glass-panel py-2 px-4 inline-flex gap-2 flex-wrap justify-center">
        {locales.map(locale => (
          <button
            key={locale.code}
            className="px-3 py-1 rounded-full text-sm bg-fortnite-purple/20 hover:bg-fortnite-purple/40 transition-colors"
            onClick={() => handleLocaleChange(locale.code)}
          >
            {locale.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocaleSelector;
