
import { useState, useEffect } from 'react';
import { FortniteShopData, FortniteItem, FortniteShopSection } from '../utils/types';
import { toast } from '@/components/ui/use-toast';

const API_URL = 'https://fortniteapi.io/v2/shop?lang=en&includeRenderData=true&includeHiddenTabs=false';
const API_KEY = '9e637bd5-9888c3ae-e79b5010-9326b31d';

const useFortniteStore = () => {
  const [shopData, setShopData] = useState<FortniteShopData | null>(null);
  const [sections, setSections] = useState<FortniteShopSection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchShopData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL, {
          headers: {
            'Accept': 'application/json',
            'Authorization': API_KEY
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch store data: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.result) {
          throw new Error('Invalid response format');
        }

        setShopData(data);
        setLastUpdated(data.lastUpdate?.date || '');
        organizeIntoSections(data.shop);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching Fortnite shop data:', err);
        setError('Failed to load the item shop. Please try again later.');
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Failed to load the Fortnite item shop. Please try again later.",
          variant: "destructive"
        });
      }
    };

    const organizeIntoSections = (items: FortniteItem[]) => {
      // Group items by section name
      const sectionMap: Record<string, FortniteItem[]> = {};
      
      items.forEach(item => {
        const sectionName = item.section?.name || 'Featured';
        
        if (!sectionMap[sectionName]) {
          sectionMap[sectionName] = [];
        }
        
        sectionMap[sectionName].push(item);
      });
      
      // Convert to array of sections
      const sectionArray: FortniteShopSection[] = Object.keys(sectionMap).map(name => ({
        name,
        items: sectionMap[name]
      }));
      
      // Sort sections (Featured first, then alphabetically)
      sectionArray.sort((a, b) => {
        if (a.name === 'Featured') return -1;
        if (b.name === 'Featured') return 1;
        return a.name.localeCompare(b.name);
      });
      
      setSections(sectionArray);
    };

    fetchShopData();
  }, []);

  return { shopData, sections, isLoading, error, lastUpdated };
};

export default useFortniteStore;
