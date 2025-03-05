
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Sample data
const salesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

const quarterlyData = [
  { name: 'Q1', deals: 40, revenue: 140 },
  { name: 'Q2', deals: 35, revenue: 130 },
  { name: 'Q3', deals: 55, revenue: 190 },
  { name: 'Q4', deals: 50, revenue: 170 },
];

interface ChartsProps {
  isDarkTheme: boolean;
}

const DashboardCharts = ({ isDarkTheme }: ChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sales Overview */}
      <Card className="border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm h-80 dark:bg-gray-800">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4 dark:text-white">Sales Overview</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkTheme ? "#374151" : "#E5E7EB"} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} stroke={isDarkTheme ? "#9CA3AF" : "#6B7280"} />
              <YAxis dataKey="value" tickLine={false} axisLine={false} stroke={isDarkTheme ? "#9CA3AF" : "#6B7280"} />
              <Tooltip contentStyle={isDarkTheme ? { backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F9FAFB' } : {}} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#4F46E5" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Quarterly Performance */}
      <Card className="border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm h-80 dark:bg-gray-800">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4 dark:text-white">Quarterly Performance</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={quarterlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkTheme ? "#374151" : "#E5E7EB"} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} stroke={isDarkTheme ? "#9CA3AF" : "#6B7280"} />
              <YAxis dataKey="revenue" tickLine={false} axisLine={false} stroke={isDarkTheme ? "#9CA3AF" : "#6B7280"} />
              <Tooltip contentStyle={isDarkTheme ? { backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F9FAFB' } : {}} />
              <Legend wrapperStyle={isDarkTheme ? { color: '#F9FAFB' } : {}} />
              <Bar dataKey="deals" fill="#1F2937" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" fill={isDarkTheme ? "#6B7280" : "#94A3B8"} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
