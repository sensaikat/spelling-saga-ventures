
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@radix-ui/react-progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Activity, User, Globe, Server } from 'lucide-react';

const SystemMonitoring = () => {
  // Mock data - in a real app this would come from an API
  const stats = [
    { 
      name: 'Active Users', 
      value: 487, 
      change: '+12%', 
      icon: <User className="h-4 w-4" />,
      color: 'text-blue-500'
    },
    { 
      name: 'Languages Used', 
      value: 18, 
      change: '+3', 
      icon: <Globe className="h-4 w-4" />,
      color: 'text-green-500'
    },
    { 
      name: 'System Uptime', 
      value: '99.8%', 
      change: '-0.1%', 
      icon: <Server className="h-4 w-4" />,
      color: 'text-amber-500'
    },
    { 
      name: 'API Health', 
      value: 'Good', 
      change: 'Stable', 
      icon: <Activity className="h-4 w-4" />,
      color: 'text-purple-500'
    },
  ];

  const recentActivities = [
    { id: 1, type: 'User Registration', count: 15, time: '30 minutes ago' },
    { id: 2, type: 'Premium Upgrade', count: 3, time: '2 hours ago' },
    { id: 3, type: 'API Error', count: 1, time: '1 day ago' },
    { id: 4, type: 'New Language Added', count: 1, time: '3 days ago' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">System Status</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <div className={`${stat.color} bg-muted p-1 rounded-full`}>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} since last week</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-8">Resource Usage</h2>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">CPU Usage</span>
                <span className="text-sm text-muted-foreground">42%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Memory Usage</span>
                <span className="text-sm text-muted-foreground">68%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Storage Usage</span>
                <span className="text-sm text-muted-foreground">23%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '23%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mt-8">Recent Activities</h2>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity Type</TableHead>
                <TableHead className="text-right">Count</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.type}</TableCell>
                  <TableCell className="text-right">{activity.count}</TableCell>
                  <TableCell className="text-right">{activity.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemMonitoring;
