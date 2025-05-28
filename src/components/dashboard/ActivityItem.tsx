
import React from 'react';
import { cn } from '@/lib/utils';

interface ActivityItemProps {
  avatar?: React.ReactNode;
  title: string;
  description: string;
  time: string;
  status?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ 
  avatar, 
  title, 
  description, 
  time, 
  status = 'info',
  className 
}) => {
  return (
    <div className={cn("flex items-start p-4 border-b border-border last:border-0", className)}>
      {avatar && (
        <div className="mr-4 flex-shrink-0">
          {avatar}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm font-medium truncate">{title}</p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      
      {status && (
        <div className={cn(
          "w-2 h-2 rounded-full ml-2 mt-1.5",
          status === 'success' && "bg-green-500",
          status === 'warning' && "bg-amber-500",
          status === 'error' && "bg-red-500",
          status === 'info' && "bg-blue-500",
        )} />
      )}
    </div>
  );
};

export default ActivityItem;
