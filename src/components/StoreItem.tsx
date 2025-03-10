
import React, { useState } from 'react';
import { FortniteItem } from '@/utils/types';
import PriceDisplay from './PriceDisplay';
import { getRarityColors } from '@/utils/animationUtils';

interface StoreItemProps {
  item: FortniteItem;
  index: number;
  onClick: (item: FortniteItem) => void;
}

const StoreItem = ({ item, index, onClick }: StoreItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Get display image
  const getDisplayImage = () => {
    if (item.displayAssets && item.displayAssets.length > 0) {
      return item.displayAssets[0].background;
    }
    
    if (item.granted && item.granted[0] && item.granted[0].images) {
      return item.granted[0].images.icon || item.granted[0].images.background;
    }
    
    return 'https://media.fortniteapi.io/images/placeholder.png';
  };
  
  // Get rarity colors for the border
  const rarityColors = getRarityColors(item.rarity.id);
  
  // Get item's display icon
  const itemIcon = item.granted && item.granted[0] ? 
    item.granted[0].images.icon : null;
  
  // Set CSS variable for rarity color
  const rarityStyle = {
    '--rarity-color-1': rarityColors[0],
    '--rarity-color-2': rarityColors[1]
  } as React.CSSProperties;
  
  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      className={`fortnite-card rarity-border item-enter ${imageLoaded ? '' : 'opacity-0'}`}
      style={rarityStyle}
      onClick={() => onClick(item)}
    >
      <div className="relative aspect-square overflow-hidden">
        {/* Image placeholder while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-secondary animate-pulse" />
        )}
        
        {/* Main item image */}
        <img
          src={getDisplayImage()}
          alt={item.displayName}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
        />
        
        {/* Series badge if available */}
        {item.series && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-xs font-medium">
            {item.series.name}
          </div>
        )}
      </div>
      
      <div className="px-3 py-2">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-white text-sm truncate" title={item.displayName}>
              {item.displayName}
            </h3>
            <p className="text-gray-300 text-xs truncate">
              {item.displayType}
            </p>
          </div>
          
          <PriceDisplay price={item.price} />
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
