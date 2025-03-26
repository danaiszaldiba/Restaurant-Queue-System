import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer, MenuItem } from '../types';

interface QueueContextType {
  queue: Customer[];
  menu: MenuItem[];
  addToQueue: (customer: Omit<Customer, 'id' | 'joinedAt' | 'status'>) => string;
  updateCustomerStatus: (customerId: string, status: Customer['status']) => void;
  removeFromQueue: (customerId: string) => void;
}

const defaultMenu: MenuItem[] = [
  // Starters
  {
    id: 's1',
    name: 'Coconut Shrimp',
    description: 'Crispy shrimp coated in coconut flakes, served with sweet chili sauce',
    price: 14.99,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=2000',
    isSpecial: true
  },
  {
    id: 's2',
    name: 'Mango Tuna Poke',
    description: 'Fresh tuna, mango, avocado, and seaweed salad with sesame dressing',
    price: 16.99,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 's3',
    name: 'Caribbean Crab Cakes',
    description: 'Lump crab meat with island spices, served with remoulade sauce',
    price: 18.99,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 's4',
    name: 'Tropical Bruschetta',
    description: 'Grilled bread topped with mango salsa and avocado',
    price: 12.99,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true
  },
  {
    id: 's5',
    name: 'Spicy Plantain Chips',
    description: 'Crispy plantains with Caribbean spice blend and mango-habanero dip',
    price: 9.99,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1599492816933-c6c920c2984c?auto=format&fit=crop&q=80&w=2000',
    spicyLevel: 2,
    isVegetarian: true
  },
  {
    id: 's6',
    name: 'Island Seafood Soup',
    description: 'Rich coconut broth with shrimp, fish, and island vegetables',
    price: 15.99,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 's7',
    name: 'Jerk Chicken Wings',
    description: 'Crispy wings marinated in jerk spices with tropical ranch',
    price: 13.99,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=2000',
    spicyLevel: 3
  },
  {
    id: 's8',
    name: 'Tropical Garden Salad',
    description: 'Mixed greens with papaya, mango, and passion fruit vinaigrette',
    price: 11.99,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true
  },
  {
    id: 's9',
    name: 'Conch Fritters',
    description: 'Traditional Bahamian fritters with spicy remoulade',
    price: 14.99,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 's10',
    name: 'Guacamole & Chips',
    description: 'Fresh guacamole with plantain and taro chips',
    price: 10.99,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true
  },

  // Mains
  {
    id: 'm1',
    name: 'Grilled Mahi Mahi',
    description: 'Fresh mahi mahi with tropical salsa and coconut rice',
    price: 28.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'm2',
    name: 'Jerk Chicken',
    description: 'Spicy jerk-marinated chicken with plantains and rice',
    price: 24.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&q=80&w=2000',
    spicyLevel: 3
  },
  {
    id: 'm3',
    name: 'Caribbean Lobster Tail',
    description: 'Grilled spiny lobster with drawn butter and island vegetables',
    price: 42.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1599021456807-1d9e90fa480e?auto=format&fit=crop&q=80&w=2000',
    isSpecial: true
  },
  {
    id: 'm4',
    name: 'Coconut Curry Vegetables',
    description: 'Mixed tropical vegetables in coconut curry sauce with jasmine rice',
    price: 19.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true,
    spicyLevel: 2
  },
  {
    id: 'm5',
    name: 'Island Paella',
    description: 'Saffron rice with mixed seafood, chorizo, and island spices',
    price: 34.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'm6',
    name: 'Rum Glazed Pork',
    description: 'Slow-roasted pork with rum glaze and sweet potato mash',
    price: 27.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'm7',
    name: 'Grilled Snapper',
    description: 'Whole red snapper with herbs and citrus',
    price: 32.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'm8',
    name: 'Tropical Stir Fry',
    description: 'Rice noodles with tofu and tropical vegetables',
    price: 20.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true
  },
  {
    id: 'm9',
    name: 'Seafood Boil',
    description: 'Mixed seafood with corn, potatoes, and Caribbean spices',
    price: 38.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&q=80&w=2000',
    spicyLevel: 2
  },
  {
    id: 'm10',
    name: 'Coconut Shrimp Curry',
    description: 'Tiger shrimp in coconut curry sauce with jasmine rice',
    price: 29.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=2000',
    spicyLevel: 2
  },

  // Desserts
  {
    id: 'd1',
    name: 'Passion Fruit Cheesecake',
    description: 'Creamy cheesecake with passion fruit coulis',
    price: 9.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true
  },
  {
    id: 'd2',
    name: 'Coconut Flan',
    description: 'Traditional flan with coconut and caramel sauce',
    price: 8.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1528252941458-3d917742f37a?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true
  },
  {
    id: 'd3',
    name: 'Rum Cake',
    description: 'Classic Caribbean rum cake with vanilla ice cream',
    price: 10.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true
  },
  {
    id: 'd4',
    name: 'Tropical Fruit Plate',
    description: 'Assorted fresh tropical fruits with honey-lime dip',
    price: 11.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true
  },
  {
    id: 'd5',
    name: 'Mango Sorbet',
    description: 'Refreshing mango sorbet with fresh mint',
    price: 7.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true
  },
  {
    id: 'd6',
    name: 'Banana Foster',
    description: 'Caramelized bananas with rum sauce and vanilla ice cream',
    price: 12.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true
  },
  {
    id: 'd7',
    name: 'Coconut Ice Cream',
    description: 'Homemade coconut ice cream with toasted coconut flakes',
    price: 8.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true
  },
  {
    id: 'd8',
    name: 'Pineapple Upside Down Cake',
    description: 'Warm pineapple cake with cherry and vanilla sauce',
    price: 9.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true
  },
  {
    id: 'd9',
    name: 'Key Lime Pie',
    description: 'Traditional key lime pie with whipped cream',
    price: 8.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true
  },
  {
    id: 'd10',
    name: 'Chocolate Rum Truffles',
    description: 'Dark chocolate truffles infused with Caribbean rum',
    price: 10.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1548907040-4d42b3018e16?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true
  },

  // Drinks
  {
    id: 'dr1',
    name: 'Piña Colada',
    description: 'Classic tropical cocktail with rum, coconut, and pineapple',
    price: 12.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1500630967344-3b1f546423ce?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'dr2',
    name: 'Tropical Mojito',
    description: 'Rum, mint, lime, and passion fruit',
    price: 11.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'dr3',
    name: 'Mango Daiquiri',
    description: 'Frozen daiquiri with fresh mango and rum',
    price: 11.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'dr4',
    name: 'Island Punch',
    description: 'Tropical fruit juices with Caribbean rum',
    price: 13.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'dr5',
    name: 'Coconut Water',
    description: 'Fresh coconut water served in the shell',
    price: 7.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1544252890-c3e95e867798?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true
  },
  {
    id: 'dr6',
    name: 'Guava Smoothie',
    description: 'Fresh guava blended with coconut milk',
    price: 8.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true
  },
  {
    id: 'dr7',
    name: 'Caribbean Beer Flight',
    description: 'Selection of four local Caribbean beers',
    price: 14.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1518099074172-2e47ee6cfdc0?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'dr8',
    name: 'Passion Fruit Margarita',
    description: 'Tequila with passion fruit and lime',
    price: 12.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1556855810-ac404aa91e85?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'dr9',
    name: 'Tropical Iced Tea',
    description: 'House-made tea with tropical fruits',
    price: 5.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=2000',
    isVegetarian: true
  },
  {
    id: 'dr10',
    name: 'Rum Flight',
    description: 'Selection of premium Caribbean rums',
    price: 18.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000'
  }
];

const QueueContext = createContext<QueueContextType>({
  queue: [],
  menu: defaultMenu,
  addToQueue: () => '',
  updateCustomerStatus: () => {},
  removeFromQueue: () => {},
});

const generateTableCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queue, setQueue] = useState<Customer[]>([]);
  const [menu] = useState<MenuItem[]>(defaultMenu);

  useEffect(() => {
    // Simulate table becoming ready after 15 seconds for demonstration
    const timer = setTimeout(() => {
      const waitingCustomers = queue.filter(c => c.status === 'waiting');
      if (waitingCustomers.length > 0) {
        const firstCustomer = waitingCustomers[0];
        updateCustomerStatus(firstCustomer.id, 'seated');
        setQueue(prev => prev.map(customer => 
          customer.id === firstCustomer.id 
            ? { ...customer, tableCode: generateTableCode() }
            : customer
        ));
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [queue]);

  const addToQueue = (customerData: Omit<Customer, 'id' | 'joinedAt' | 'status'>) => {
    const id = Math.random().toString(36).substring(7);
    const newCustomer: Customer = {
      ...customerData,
      id,
      joinedAt: new Date(),
      status: 'waiting',
      estimatedWaitTime: queue.length * 15, // Rough estimate: 15 minutes per group
    };
    setQueue((prev) => [...prev, newCustomer]);
    return id;
  };

  const updateCustomerStatus = (customerId: string, status: Customer['status']) => {
    setQueue((prev) =>
      prev.map((customer) =>
        customer.id === customerId ? { ...customer, status } : customer
      )
    );
  };

  const removeFromQueue = (customerId: string) => {
    setQueue((prev) => prev.filter((customer) => customer.id !== customerId));
  };

  return (
    <QueueContext.Provider
      value={{ queue, menu, addToQueue, updateCustomerStatus, removeFromQueue }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => useContext(QueueContext);