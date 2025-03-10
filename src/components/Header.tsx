
import React from 'react';

interface HeaderProps {
  lastUpdated: string;
}

const Header = ({ lastUpdated }: HeaderProps) => {
  // Format the date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Loading...';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <header className="mb-6 animate-fade-in">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-white">
          Item Shop
        </h1>
        
        <div className="flex items-center gap-2 mt-2">
          <div className="h-2 w-2 bg-fortnite-purple rounded-full animate-pulse-light" />
          <p className="text-sm text-gray-300">
            Last Updated: {formatDate(lastUpdated)}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
