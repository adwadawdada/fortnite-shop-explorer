
import React, { useState } from 'react';
import { FortniteItem } from '@/utils/types';
import { X } from 'lucide-react';
import PriceDisplay from './PriceDisplay';
import { getRarityColors } from '@/utils/animationUtils';

interface ItemModalProps {
  item: FortniteItem;
  onClose: () => void;
  isOpen: boolean;
}

const ItemModal = ({ item, onClose, isOpen }: ItemModalProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  if (!isOpen || !item) return null;
  
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Get rarity colors
  const rarityColors = getRarityColors(item.rarity.id);
  
  // Set CSS variable for rarity color
  const rarityStyle = {
    '--rarity-color-1': rarityColors[0],
    '--rarity-color-2': rarityColors[1]
  } as React.CSSProperties;
  
  // Get display image
  const getFullDisplayImage = () => {
    if (item.displayAssets && item.displayAssets.length > 0) {
      return item.displayAssets[0].full_background;
    }
    
    if (item.granted && item.granted[0] && item.granted[0].images) {
      return item.granted[0].images.full_background;
    }
    
    return 'https://media.fortniteapi.io/images/placeholder.png';
  };
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  // Extract additional items
  const additionalItems = item.granted ? item.granted.slice(1) : [];
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
      onClick={handleBackdropClick}
    >
      <div 
        className="w-full max-w-3xl bg-card rounded-lg overflow-hidden shadow-2xl relative rarity-border modal-enter"
        style={rarityStyle}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="flex flex-col md:flex-row">
          {/* Image section */}
          <div className="w-full md:w-1/2 relative">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-secondary animate-pulse" />
            )}
            
            <img 
              src={getFullDisplayImage()}
              alt={item.displayName}
              className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
              onLoad={handleImageLoad}
            />
          </div>
          
          {/* Info section */}
          <div className="w-full md:w-1/2 p-6 flex flex-col">
            <div className="mb-4">
              {item.series && (
                <div className="inline-block px-3 py-1 rounded-full bg-black/30 text-sm font-medium mb-2">
                  {item.series.name}
                </div>
              )}
              
              <h2 className="text-2xl font-display text-white mb-1">
                {item.displayName}
              </h2>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-300">{item.displayType}</span>
                <span className="h-1 w-1 bg-gray-500 rounded-full"></span>
                <span className="text-sm font-medium" style={{color: rarityColors[0]}}>
                  {item.rarity.name}
                </span>
              </div>
              
              <p className="text-gray-300 mb-4">
                {item.displayDescription}
              </p>
            </div>
            
            {/* Additional items */}
            {additionalItems.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Bundle Includes:
                </h3>
                
                <div className="space-y-2">
                  {additionalItems.map(bundleItem => (
                    <div key={bundleItem.id} className="flex items-center gap-3">
                      <img 
                        src={bundleItem.images.icon}
                        alt={bundleItem.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium text-white">{bundleItem.name}</p>
                        <p className="text-xs text-gray-400">{bundleItem.type.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Set info */}
            {item.granted && item.granted[0]?.set && (
              <div className="text-sm text-gray-400 mb-4">
                {item.granted[0].set.partOf}
              </div>
            )}
            
            {/* Price */}
            <div className="mt-auto">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Price</div>
                  <PriceDisplay price={item.price} showSellPrice={true} />
                </div>
                
                <button className="btn-fortnite">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
