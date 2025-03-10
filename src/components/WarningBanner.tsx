
import React from 'react';

const WarningBanner = () => {
  return (
    <div className="glass-panel p-4 mb-6 animate-fade-in">
      <p className="text-center font-display text-sm sm:text-base">
        Before making any purchase, make sure you have all the following accounts added on your epic games: 
        <span className="font-bold text-fortnite-purple px-1">zbucks12</span>, 
        <span className="font-bold text-fortnite-purple px-1">zbucks23</span>, 
        <span className="font-bold text-fortnite-purple px-1">zbucks99</span>, 
        <span className="font-bold text-fortnite-purple px-1">zbucks22</span>
      </p>
    </div>
  );
};

export default WarningBanner;
