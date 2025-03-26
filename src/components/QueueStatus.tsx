import React from 'react';
import { Clock, Users, CheckCircle } from 'lucide-react';
import { useQueue } from '../context/QueueContext';
import { useTheme } from '../context/ThemeContext';

const QueueStatus: React.FC<{ customerId?: string }> = ({ customerId }) => {
  const { queue } = useQueue();
  const { theme } = useTheme();

  const customer = customerId 
    ? queue.find((c) => c.id === customerId)
    : null;

  const position = customer
    ? queue.filter((c) => c.status === 'waiting' && c.joinedAt < customer.joinedAt).length + 1
    : null;

  if (!customer) {
    return (
      <div className="text-center p-6">
        <p className="text-gray-600">No customer found</p>
      </div>
    );
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
    </div>
  );
};

export default QueueStatus;