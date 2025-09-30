import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Plantation, Credit } from '@/data/mockData';
import { TrendingUp, PieChartIcon } from 'lucide-react';

interface AnalyticsChartsProps {
  plantations: Plantation[];
  credits: Credit[];
}

const AnalyticsCharts = ({ plantations, credits }: AnalyticsChartsProps) => {
  // Time series data for CO2 sequestration
  const timeSeriesData = [
    { month: 'Jan', co2: 3.75, projects: 1 },
    { month: 'Feb', co2: 8.55, projects: 3 },
    { month: 'Mar', co2: 15.3, projects: 5 },
    { month: 'Apr', co2: 18.2, projects: 6 },
    { month: 'May', co2: 22.5, projects: 8 },
    { month: 'Jun', co2: 27.8, projects: 10 },
  ];

  // Revenue distribution data
  const revenueData = [
    { name: 'Community', value: 60, color: '#10B981' },
    { name: 'Panchayat', value: 20, color: '#0EA5E9' },
    { name: 'Platform', value: 15, color: '#14B8A6' },
    { name: 'Buffer', value: 5, color: '#F59E0B' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* CO2 Sequestration Over Time */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Carbon Sequestration Trend
          </CardTitle>
          <CardDescription>Total CO₂ captured over time (in tons)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeSeriesData}>
              <defs>
                <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="co2"
                stroke="#10B981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCo2)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Distribution */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-primary" />
            Revenue Distribution
          </CardTitle>
          <CardDescription>How carbon credit revenue is allocated</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {revenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {revenueData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">
                  {item.name}: <span className="font-semibold">{item.value}%</span>
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;
