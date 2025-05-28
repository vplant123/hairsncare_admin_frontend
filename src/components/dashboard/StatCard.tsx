
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string | number;
    positive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, className }) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h4 className="text-2xl font-bold mt-2 mb-1">{value}</h4>
            {trend && (
              <div className="flex items-center text-xs">
                <span className={trend.positive ? 'text-green-600' : 'text-red-600'}>
                  {trend.positive ? '↑' : '↓'} {trend.value}
                </span>
                <span className="text-muted-foreground ml-1">vs last period</span>
              </div>
            )}
          </div>
          <div className="bg-primary/10 p-3 rounded-full text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
