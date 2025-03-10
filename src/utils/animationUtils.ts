
// Get the rarity colors based on the rarity id
export const getRarityColors = (rarityId: string): [string, string] => {
  switch (rarityId.toLowerCase()) {
    case 'common':
      return ['#9b9b9b', '#636363'];
    case 'uncommon':
      return ['#35d03d', '#1f7a25'];
    case 'rare':
      return ['#3fc0ff', '#0078e2'];
    case 'epic':
      return ['#d900ff', '#8400a8'];
    case 'legendary':
      return ['#ffa538', '#a36214'];
    default:
      return ['#9b9b9b', '#636363'];
  }
};

// Calculate delay for staggered animations
export const getAnimationDelay = (index: number): string => {
  const delay = Math.min(index % 5, 4);
  return `item-enter-delay-${delay + 1}`;
};

// Create dynamic loading effect
export const getLoadingPulse = (index: number): string => {
  return `animate-pulse-light [animation-delay:${index * 0.15}s]`;
};
