
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { MessageSquare, Search, Send } from 'lucide-react';

const CustomerQueriesPanel = () => {
  // Mock data - in a real app this would come from an API
  const [queries, setQueries] = useState([
    { id: 1, customer: 'John Doe', email: 'john@example.com', subject: 'Language Pronunciation Help', priority: 'High', status: 'Open', date: '2023-08-10' },
    { id: 2, customer: 'Jane Smith', email: 'jane@example.com', subject: 'Payment Issue', priority: 'Medium', status: 'Closed', date: '2023-08-08' },
    { id: 3, customer: 'Mike Johnson', email: 'mike@example.com', subject: 'Account Access', priority: 'Low', status: 'Open', date: '2023-08-05' },
    { id: 4, customer: 'Sarah Williams', email: 'sarah@example.com', subject: 'Feature Request', priority: 'Medium', status: 'In Progress', date: '2023-08-01' },
  ]);

  const [selectedQuery, setSelectedQuery] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');

  const handleOpenQuery = (query) => {
    setSelectedQuery(query);
  };

  const handleCloseQuery = () => {
    setSelectedQuery(null);
    setReplyText('');
  };

  const handleSendReply = () => {
    // In a real app, this would send the reply to the customer
    // and update the query status
    if (replyText.trim() === '') return;
    
    // Update the query status to show it's been responded to
    const updatedQueries = queries.map(q => 
      q.id === selectedQuery.id ? {...q, status: 'In Progress'} : q
    );
    
    setQueries(updatedQueries);
    setReplyText('');
    
    // Show a success message or notification here
    alert('Reply sent to customer!');
  };

  const filteredQueries = queries.filter(query => 
    query.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    query.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    query.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mock conversation for the selected query
  const mockConversation = [
    { sender: 'customer', message: 'Hi, I need help with pronouncing certain words in Bengali. The audio doesn\'t seem to be working correctly.', time: '10:30 AM' },
    { sender: 'admin', message: 'Hello! I understand you\'re having issues with Bengali pronunciation audio. Could you tell me which specific words or lessons are affected?', time: '11:15 AM' },
    { sender: 'customer', message: 'It\'s happening with words that have special characters. For example, words with "ṭ" or "ḍ" sounds.', time: '11:22 AM' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Customer Queries</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search queries..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredQueries.length > 0 ? (
            filteredQueries.map((query) => (
              <TableRow key={query.id}>
                <TableCell className="font-medium">
                  {query.customer}
                  <div className="text-xs text-muted-foreground">{query.email}</div>
                </TableCell>
                <TableCell>{query.subject}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    query.priority === 'High' ? 'bg-red-100 text-red-800' : 
                    query.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {query.priority}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    query.status === 'Open' ? 'bg-blue-100 text-blue-800' : 
                    query.status === 'In Progress' ? 'bg-purple-100 text-purple-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {query.status}
                  </span>
                </TableCell>
                <TableCell>{query.date}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleOpenQuery(query)}
                    className="flex items-center gap-1"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    Reply
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                No queries found matching your search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {/* Query Detail Sheet */}
      <Sheet open={!!selectedQuery} onOpenChange={(open) => !open && handleCloseQuery()}>
        <SheetContent className="w-full sm:max-w-xl flex flex-col h-full p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle>{selectedQuery?.subject}</SheetTitle>
            <SheetDescription>
              <div className="flex flex-col space-y-1">
                <span>From: {selectedQuery?.customer} ({selectedQuery?.email})</span>
                <div className="flex gap-3 text-xs">
                  <span className={`px-2 py-1 rounded-full ${
                    selectedQuery?.priority === 'High' ? 'bg-red-100 text-red-800' : 
                    selectedQuery?.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedQuery?.priority} Priority
                  </span>
                  <span className={`px-2 py-1 rounded-full ${
                    selectedQuery?.status === 'Open' ? 'bg-blue-100 text-blue-800' : 
                    selectedQuery?.status === 'In Progress' ? 'bg-purple-100 text-purple-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedQuery?.status}
                  </span>
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-auto p-6 space-y-4">
            {mockConversation.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'admin' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  <p>{msg.message}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'admin' 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                  }`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t mt-auto">
            <div className="flex gap-2">
              <Input 
                placeholder="Type your reply..." 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
              />
              <Button onClick={handleSendReply} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CustomerQueriesPanel;
