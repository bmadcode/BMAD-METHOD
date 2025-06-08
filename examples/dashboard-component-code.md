# Dashboard Component Code Implementation

This file contains the complete code implementation for the dashboard component example.

## Initial Implementation

```tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Activity, DollarSign, BarChart, ArrowUp, ArrowDown, Bell, Settings } from 'lucide-react';

interface DashboardProps {
  metrics: {
    totalUsers: number;
    activeUsers: number;
    revenue: number;
    conversionRate: number;
  };
  recentActivity: Array<{
    id: string;
    user: {
      name: string;
      avatar?: string;
    };
    action: string;
    timestamp: string;
  }>;
  userData: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
}

export function Dashboard({ metrics, recentActivity, userData }: DashboardProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Welcome back, {userData.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full bg-white text-slate-700 hover:bg-slate-100">
            <Bell size={20} />
          </button>
          <button className="p-2 rounded-full bg-white text-slate-700 hover:bg-slate-100">
            <Settings size={20} />
          </button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {userData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Users" 
          value={metrics.totalUsers.toLocaleString()} 
          icon={<Users className="h-5 w-5" />}
          trend={5.2}
          color="blue"
        />
        <MetricCard 
          title="Active Users" 
          value={metrics.activeUsers.toLocaleString()} 
          icon={<Activity className="h-5 w-5" />}
          trend={2.4}
          color="emerald"
        />
        <MetricCard 
          title="Revenue" 
          value={`$${metrics.revenue.toLocaleString()}`} 
          icon={<DollarSign className="h-5 w-5" />}
          trend={8.7}
          color="blue"
        />
        <MetricCard 
          title="Conversion Rate" 
          value={`${metrics.conversionRate}%`} 
          icon={<BarChart className="h-5 w-5" />}
          trend={-1.5}
          color="slate"
        />
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                    <AvatarFallback className="bg-slate-100 text-slate-600">
                      {activity.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.user.name}</p>
                    <p className="text-sm text-slate-500">{activity.action}</p>
                  </div>
                  <p className="text-xs text-slate-400">{activity.timestamp}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="font-medium text-lg">{userData.name}</h3>
                <p className="text-slate-500">{userData.email}</p>
                <p className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full mt-2 inline-block">
                  {userData.role}
                </p>
              </div>
              <div className="w-full border-t border-slate-200 pt-4 mt-2">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
                  Edit Profile
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: number;
  color: 'blue' | 'emerald' | 'slate';
}

function MetricCard({ title, value, icon, trend, color }: MetricCardProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      icon: 'bg-blue-100 text-blue-600',
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      icon: 'bg-emerald-100 text-emerald-600',
    },
    slate: {
      bg: 'bg-slate-50',
      text: 'text-slate-600',
      icon: 'bg-slate-100 text-slate-600',
    },
  };

  return (
    <Card className={`${colorClasses[color].bg} border-none`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className={`text-2xl font-bold ${colorClasses[color].text} mt-1`}>{value}</p>
          </div>
          <div className={`p-2 rounded-full ${colorClasses[color].icon}`}>
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center">
          {trend >= 0 ? (
            <ArrowUp className="h-4 w-4 text-emerald-500" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500" />
          )}
          <span className={trend >= 0 ? 'text-emerald-500' : 'text-red-500'}>
            {Math.abs(trend)}%
          </span>
          <span className="text-slate-400 text-xs ml-1">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Final Refined Implementation

```tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Activity, DollarSign, BarChart, ArrowUp, ArrowDown, Bell, Settings, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardProps {
  metrics: {
    totalUsers: number;
    activeUsers: number;
    revenue: number;
    conversionRate: number;
  };
  recentActivity: Array<{
    id: string;
    user: {
      name: string;
      avatar?: string;
    };
    action: string;
    timestamp: string;
  }>;
  userData: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  isLoading?: boolean;
}

export function Dashboard({ 
  metrics, 
  recentActivity, 
  userData,
  isLoading = false
}: DashboardProps) {
  const [dateRange, setDateRange] = useState('last-30-days');

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Welcome back, {userData.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-md px-3 py-1">
            <Calendar className="h-4 w-4 text-slate-500 mr-2" />
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="border-0 p-0 h-auto w-[140px] text-sm">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="this-month">This month</SelectItem>
                <SelectItem value="last-month">Last month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button 
            className="p-2 rounded-full bg-white text-slate-700 hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>
          <button 
            className="p-2 rounded-full bg-white text-slate-700 hover:bg-slate-100"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {userData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="region" aria-label="Key metrics">
        <MetricCard 
          title="Total Users" 
          value={metrics.totalUsers.toLocaleString()} 
          icon={<Users className="h-5 w-5" />}
          trend={5.2}
          color="blue"
          ariaLabel="Total users metric"
        />
        <MetricCard 
          title="Active Users" 
          value={metrics.activeUsers.toLocaleString()} 
          icon={<Activity className="h-5 w-5" />}
          trend={2.4}
          color="emerald"
          ariaLabel="Active users metric"
        />
        <MetricCard 
          title="Revenue" 
          value={`$${metrics.revenue.toLocaleString()}`} 
          icon={<DollarSign className="h-5 w-5" />}
          trend={8.7}
          color="blue"
          ariaLabel="Revenue metric"
        />
        <MetricCard 
          title="Conversion Rate" 
          value={`${metrics.conversionRate}%`} 
          icon={<BarChart className="h-5 w-5" />}
          trend={-1.5}
          color="slate"
          ariaLabel="Conversion rate metric"
        />
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2" role="log" aria-label="Recent activity log">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                      <AvatarFallback className="bg-slate-100 text-slate-600">
                        {activity.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.user.name}</p>
                      <p className="text-sm text-slate-500">{activity.action}</p>
                    </div>
                    <p className="text-xs text-slate-400">{activity.timestamp}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-500 py-6">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* User Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="font-medium text-lg">{userData.name}</h3>
                <p className="text-slate-500">{userData.email}</p>
                <p className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full mt-2 inline-block">
                  {userData.role}
                </p>
              </div>
              <div className="w-full border-t border-slate-200 pt-4 mt-2">
                <button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Edit your profile"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: number;
  color: 'blue' | 'emerald' | 'slate';
  ariaLabel: string;
}

function MetricCard({ title, value, icon, trend, color, ariaLabel }: MetricCardProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      icon: 'bg-blue-100 text-blue-600',
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      icon: 'bg-emerald-100 text-emerald-600',
    },
    slate: {
      bg: 'bg-slate-50',
      text: 'text-slate-600',
      icon: 'bg-slate-100 text-slate-600',
    },
  };

  const trendText = `${Math.abs(trend)}% ${trend >= 0 ? 'increase' : 'decrease'} compared to last month`;

  return (
    <Card className={`${colorClasses[color].bg} border-none`} aria-label={ariaLabel}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className={`text-2xl font-bold ${colorClasses[color].text} mt-1`}>{value}</p>
          </div>
          <div className={`p-2 rounded-full ${colorClasses[color].icon}`} aria-hidden="true">
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center" aria-label={trendText}>
          {trend >= 0 ? (
            <ArrowUp className="h-4 w-4 text-emerald-500" aria-hidden="true" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500" aria-hidden="true" />
          )}
          <span className={trend >= 0 ? 'text-emerald-500' : 'text-red-500'}>
            {Math.abs(trend)}%
          </span>
          <span className="text-slate-400 text-xs ml-1">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32 mt-2" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      {/* Metrics Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-slate-50 border-none">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="w-full">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-20 mt-2" />
                  <Skeleton className="h-4 w-32 mt-4" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Area Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-48 mt-2" />
                  </div>
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="text-center w-full">
                <Skeleton className="h-5 w-32 mx-auto" />
                <Skeleton className="h-4 w-48 mx-auto mt-2" />
                <Skeleton className="h-6 w-16 mx-auto mt-2 rounded-full" />
              </div>
              <div className="w-full border-t border-slate-200 pt-4 mt-2">
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

## Example Usage

```tsx
// Example usage
import { Dashboard } from './components/Dashboard';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    metrics: {
      totalUsers: 0,
      activeUsers: 0,
      revenue: 0,
      conversionRate: 0
    },
    recentActivity: [],
    userData: {
      name: '',
      email: '',
      role: ''
    }
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDashboardData({
        metrics: {
          totalUsers: 12487,
          activeUsers: 8761,
          revenue: 48395,
          conversionRate: 12.8
        },
        recentActivity: [
          {
            id: '1',
            user: {
              name: 'John Smith',
              avatar: '/avatars/john.jpg'
            },
            action: 'Created a new project "Q4 Marketing Campaign"',
            timestamp: '2 minutes ago'
          },
          {
            id: '2',
            user: {
              name: 'Sarah Johnson',
              avatar: '/avatars/sarah.jpg'
            },
            action: 'Updated the analytics dashboard settings',
            timestamp: '1 hour ago'
          },
          {
            id: '3',
            user: {
              name: 'Michael Brown',
              avatar: '/avatars/michael.jpg'
            },
            action: 'Invited 3 new team members',
            timestamp: '3 hours ago'
          },
          {
            id: '4',
            user: {
              name: 'Emily Davis',
              avatar: '/avatars/emily.jpg'
            },
            action: 'Completed the quarterly report',
            timestamp: 'Yesterday'
          }
        ],
        userData: {
          name: 'Alex Morgan',
          email: 'alex.morgan@example.com',
          avatar: '/avatars/alex.jpg',
          role: 'Admin'
        }
      });
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <Dashboard 
        metrics={dashboardData.metrics}
        recentActivity={dashboardData.recentActivity}
        userData={dashboardData.userData}
        isLoading={isLoading}
      />
    </div>
  );
}
