
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminHeader from '../components/admin/AdminHeader';
import CustomerQueriesPanel from '../components/admin/CustomerQueriesPanel';
import MaintenanceScheduler from '../components/admin/MaintenanceScheduler';
import SystemMonitoring from '../components/admin/SystemMonitoring';
import ChatbotManager from '../components/admin/ChatbotManager';
import { useSubscriptionStore } from '../utils/subscription';

const Admin = () => {
  // Only allow admin access for premium users - fixed property access
  const { isPremium } = useSubscriptionStore();
  
  // Redirect non-premium users
  if (!isPremium()) {
    return <Navigate to="/subscription" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminHeader />
      
      <Tabs defaultValue="monitoring" className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="monitoring">System Monitoring</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="queries">Customer Queries</TabsTrigger>
          <TabsTrigger value="chatbot">Chatbot Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monitoring" className="mt-6">
          <Card className="p-6">
            <SystemMonitoring />
          </Card>
        </TabsContent>
        
        <TabsContent value="maintenance" className="mt-6">
          <Card className="p-6">
            <MaintenanceScheduler />
          </Card>
        </TabsContent>
        
        <TabsContent value="queries" className="mt-6">
          <Card className="p-6">
            <CustomerQueriesPanel />
          </Card>
        </TabsContent>
        
        <TabsContent value="chatbot" className="mt-6">
          <Card className="p-6">
            <ChatbotManager />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
