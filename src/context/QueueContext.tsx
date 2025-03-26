import React, { createContext, useContext, useState } from 'react';
import { Customer } from '../types';

interface QueueContextType {
  queue: Customer[];
  addToQueue: (customer: Omit<Customer, 'id' | 'joinedAt' | 'status'>) => string;
  updateCustomerStatus: (customerId: string, status: Customer['status']) => void;
  removeFromQueue: (customerId: string) => void;
}

const QueueContext = createContext<QueueContextType>({
  queue: [],
  addToQueue: () => '',
  updateCustomerStatus: () => {},
  removeFromQueue: () => {},
});

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queue, setQueue] = useState<Customer[]>([]);

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
      value={{ queue, addToQueue, updateCustomerStatus, removeFromQueue }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => useContext(QueueContext);