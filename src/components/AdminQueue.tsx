import React from 'react';
import { Check, X, Coffee } from 'lucide-react';
import { useQueue } from '../context/QueueContext';
import { useTheme } from '../context/ThemeContext';

const AdminQueue: React.FC = () => {
  const { queue, updateCustomerStatus, removeFromQueue } = useQueue();
  const { theme } = useTheme();

  const waitingCustomers = queue.filter((customer) => customer.status === 'waiting');

  return (
    <div className="w-full max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6" style={{ backgroundColor: theme.primary }}>
          <h2 className="text-2xl font-bold text-white">Queue Management</h2>
          <p className="text-white opacity-80">
            {waitingCustomers.length} customers waiting
          </p>
        </div>

        <div className="divide-y">
          {waitingCustomers.map((customer, index) => (
            <div
              key={customer.id}
              className="p-6 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-bold text-2xl mr-4" style={{ color: theme.primary }}>
                    #{index + 1}
                  </span>
                  <div>
                    <h3 className="font-medium text-lg">{customer.fullName}</h3>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <span>Party of {customer.partySize}</span>
                      <span>•</span>
                      <span>{customer.phoneNumber}</span>
                      <span>•</span>
                      <span>
                        Waiting: {Math.floor((Date.now() - customer.joinedAt.getTime()) / 60000)}m
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => updateCustomerStatus(customer.id, 'seated')}
                  className="p-2 rounded-full hover:bg-green-100"
                  title="Seat Customer"
                >
                  <Check className="text-green-600" size={24} />
                </button>
                <button
                  onClick={() => removeFromQueue(customer.id)}
                  className="p-2 rounded-full hover:bg-red-100"
                  title="Remove from Queue"
                >
                  <X className="text-red-600" size={24} />
                </button>
              </div>
            </div>
          ))}

          {waitingCustomers.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <Coffee className="mx-auto mb-4" size={48} />
              <p className="text-xl">No customers waiting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminQueue;