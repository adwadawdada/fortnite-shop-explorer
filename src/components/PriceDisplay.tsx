
import React from 'react';
import { FortniteItemPrice } from '@/utils/types';
import { 
  formatCurrency, 
  getSellingPrice 
} from '@/utils/currencyUtils';
import useCurrencyConverter from '@/hooks/useCurrencyConverter';

interface PriceDisplayProps {
  price: FortniteItemPrice;
  showSellPrice?: boolean;
}

const PriceDisplay = ({ price, showSellPrice = true }: PriceDisplayProps) => {
  const { rates, currency, isLoading } = useCurrencyConverter();
  
  const renderVBucksPrice = () => {
    const { regularPrice, finalPrice } = price;
    const hasDiscount = finalPrice < regularPrice;
    
    return (
      <div className="flex items-center gap-1">
        <span className="vbucks-icon" />
        
        <div className="flex items-center gap-1.5">
          {hasDiscount && (
            <span className="text-gray-400 line-through text-sm">
              {regularPrice.toLocaleString()}
            </span>
          )}
          
          <span className="font-semibold">
            {finalPrice.toLocaleString()}
          </span>
        </div>
      </div>
    );
  };
  
  const renderSellPrice = () => {
    if (isLoading || !showSellPrice) return null;
    
    const sellPrice = getSellingPrice(price.finalPrice, currency, rates);
    
    return (
      <div className="text-xs text-gray-300 mt-1">
        {formatCurrency(sellPrice, currency)}
      </div>
    );
  };
  
  return (
    <div className="flex flex-col">
      {renderVBucksPrice()}
      {renderSellPrice()}
    </div>
  );
};

export default PriceDisplay;
