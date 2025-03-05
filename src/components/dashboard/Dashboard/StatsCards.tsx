
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, DollarSign, Target, Trophy } from 'lucide-react';

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Customers */}
      <Card className="border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm dark:bg-gray-800">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700">
              <Users className="h-5 w-5 text-black dark:text-white" />
            </div>
            <span className="text-green-500 font-medium">+12%</span>
          </div>
          <h3 className="text-gray-600 dark:text-gray-300 font-medium mb-1">Total Customers</h3>
          <p className="text-3xl font-bold dark:text-white">1,234</p>
        </CardContent>
      </Card>
      
      {/* Revenue */}
      <Card className="border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm dark:bg-gray-800">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700">
              <DollarSign className="h-5 w-5 text-black dark:text-white" />
            </div>
            <span className="text-green-500 font-medium">+8%</span>
          </div>
          <h3 className="text-gray-600 dark:text-gray-300 font-medium mb-1">Revenue</h3>
          <p className="text-3xl font-bold dark:text-white">$50,234</p>
        </CardContent>
      </Card>
      
      {/* Active Deals */}
      <Card className="border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm dark:bg-gray-800">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700">
              <Target className="h-5 w-5 text-black dark:text-white" />
            </div>
            <span className="text-red-500 font-medium">-5%</span>
          </div>
          <h3 className="text-gray-600 dark:text-gray-300 font-medium mb-1">Active Deals</h3>
          <p className="text-3xl font-bold dark:text-white">45</p>
        </CardContent>
      </Card>
      
      {/* Win Rate */}
      <Card className="border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm dark:bg-gray-800">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700">
              <Trophy className="h-5 w-5 text-black dark:text-white" />
            </div>
            <span className="text-green-500 font-medium">+3%</span>
          </div>
          <h3 className="text-gray-600 dark:text-gray-300 font-medium mb-1">Win Rate</h3>
          <p className="text-3xl font-bold dark:text-white">68%</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
