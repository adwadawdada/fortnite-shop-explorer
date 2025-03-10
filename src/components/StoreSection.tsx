
import React, { useState } from 'react';
import { FortniteShopSection, FortniteItem } from '@/utils/types';
import StoreItem from './StoreItem';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getAnimationDelay } from '@/utils/animationUtils';

interface StoreSectionProps {
  section: FortniteShopSection;
  onItemClick: (item: FortniteItem) => void;
}

const StoreSection = ({ section, onItemClick }: StoreSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const toggleSection = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="mb-6 section-enter">
      <div 
        className="fortnite-section-header"
        onClick={toggleSection}
      >
        <h2 className="flex-1">{section.name}</h2>
        
        <span className="flex items-center justify-center">
          {isOpen ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </span>
      </div>
      
      {isOpen && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
          {section.items.map((item, index) => (
            <div 
              key={item.mainId + item.offerId} 
              className={getAnimationDelay(index)}
            >
              <StoreItem 
                item={item} 
                index={index}
                onClick={onItemClick} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreSection;
