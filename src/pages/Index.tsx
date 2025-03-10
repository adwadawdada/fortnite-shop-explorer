
import React, { useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import Header from '@/components/Header';
import StoreSection from '@/components/StoreSection';
import ItemModal from '@/components/ItemModal';
import WarningBanner from '@/components/WarningBanner';
import LocaleSelector from '@/components/LocaleSelector';
import useFortniteStore from '@/hooks/useFortniteStore';
import { FortniteItem } from '@/utils/types';

const Index = () => {
  const { sections, isLoading, error, lastUpdated } = useFortniteStore();
  const [selectedItem, setSelectedItem] = useState<FortniteItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item: FortniteItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-panel p-8 text-center max-w-md">
          <h1 className="text-2xl font-display mb-4">Something went wrong</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            className="btn-fortnite" 
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <Header lastUpdated={lastUpdated} />
      
      <LocaleSelector />
      
      <WarningBanner />
      
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-8">
          {sections.map((section) => (
            <StoreSection 
              key={section.name} 
              section={section} 
              onItemClick={handleItemClick}
            />
          ))}
        </div>
      )}
      
      {selectedItem && (
        <ItemModal 
          item={selectedItem} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default Index;
