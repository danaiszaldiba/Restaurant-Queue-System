import React, { useState } from 'react';
import { Clock, Users, CheckCircle, Flame, Leaf } from 'lucide-react';
import { useQueue } from '../context/QueueContext';
import { useTheme } from '../context/ThemeContext';
import { MenuItem } from '../types';
import TableReadyNotification from './TableReadyNotification';

const QueueStatus: React.FC<{ customerId?: string }> = ({ customerId }) => {
  const { queue, menu } = useQueue();
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<MenuItem['category']>('starters');

  const customer = customerId 
    ? queue.find((c) => c.id === customerId)
    : null;

  const position = customer && customer.status === 'waiting'
    ? queue.filter((c) => c.status === 'waiting' && c.joinedAt < customer.joinedAt).length + 1
    : null;

  const categories: MenuItem['category'][] = ['starters', 'mains', 'desserts', 'drinks'];

  const filteredMenu = menu.filter(item => item.category === selectedCategory);

  if (!customer) {
    return (
      <div className="text-center p-6">
        <p className="text-gray-600">No customer found</p>
      </div>
    );
  }

  if (customer.status === 'seated' && customer.tableCode) {
    return <TableReadyNotification customer={customer} />;
  }

  return (
    <div className="space-y-6 w-full">
      <div className="text-center">
        <CheckCircle 
          size={48} 
          className="mx-auto mb-4"
          style={{ color: theme.primary }} 
        />
        <h2 className="text-2xl font-bold mb-2" style={{ color: theme.primary }}>
          You're in Queue!
        </h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-lg border"
             style={{ borderColor: theme.accent }}>
          <div className="flex items-center">
            <Users className="mr-2" style={{ color: theme.secondary }} size={20} />
            <span className="font-medium">Position in Queue:</span>
          </div>
          <span className="text-xl font-bold" style={{ color: theme.primary }}>
            #{position}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-lg border"
             style={{ borderColor: theme.accent }}>
          <div className="flex items-center">
            <Clock className="mr-2" style={{ color: theme.secondary }} size={20} />
            <span className="font-medium">Estimated Wait Time:</span>
          </div>
          <span className="text-xl font-bold" style={{ color: theme.primary }}>
            {customer.estimatedWaitTime} mins
          </span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg border"
           style={{ borderColor: theme.accent }}>
        <h3 className="font-medium mb-3" style={{ color: theme.secondary }}>Party Details:</h3>
        <div className="space-y-2 text-gray-700">
          <p><span className="font-medium">Name:</span> {customer.fullName}</p>
          <p><span className="font-medium">Party Size:</span> {customer.partySize}</p>
          <p><span className="font-medium">Phone:</span> {customer.phoneNumber}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-6" style={{ color: theme.primary }}>
          Browse Our Menu
        </h3>
        
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={{
                backgroundColor: selectedCategory === category ? theme.primary : 'transparent',
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="bg-white/80 backdrop-blur-sm rounded-lg border overflow-hidden"
              style={{ borderColor: theme.accent }}
            >
              <div className="flex">
                <div className="w-1/3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold" style={{ color: theme.primary }}>
                      {item.name}
                    </h4>
                    <div className="flex items-center space-x-2">
                      {item.spicyLevel && (
                        <div className="flex">
                          {[...Array(item.spicyLevel)].map((_, i) => (
                            <Flame
                              key={i}
                              size={16}
                              className="text-red-500"
                            />
                          ))}
                        </div>
                      )}
                      {item.isVegetarian && (
                        <Leaf size={16} className="text-green-500" />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">${item.price}</span>
                    {item.isSpecial && (
                      <span className="text-sm px-2 py-1 bg-red-100 text-red-600 rounded-full">
                        Chef's Special
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QueueStatus;