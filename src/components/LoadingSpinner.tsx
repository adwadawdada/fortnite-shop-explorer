
import React from 'react';
import { getLoadingPulse } from '@/utils/animationUtils';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64 w-full">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i}
            className={`h-4 w-4 rounded-full bg-fortnite-purple ${getLoadingPulse(i)}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
