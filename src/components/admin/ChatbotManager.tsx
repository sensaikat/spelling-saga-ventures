
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Plus, Trash2, Save, Edit2, MessageSquare } from 'lucide-react';

const ChatbotManager = () => {
  // Mock data - in a real app this would come from an API
  const [chatbotResponses, setChatbotResponses] = useState([
    { id: 1, trigger: 'payment issue', response: 'I\'m sorry you\'re having payment problems. Could you specify if it\'s related to subscription charges or payment method issues?', category: 'Billing' },
    { id: 2, trigger: 'how to change language', response: 'To change your learning language, go to Settings and select "Language Settings". You can choose from our available languages there.', category: 'Settings' },
    { id: 3, trigger: 'forgot password', response: 'You can reset your password by clicking on the "Forgot Password" link on the login page. We\'ll send you an email with reset instructions.', category: 'Account' },
    { id: 4, trigger: 'languages available', response: 'We currently offer 26 languages including English, Spanish, French, Bengali, Tamil, Polish, Arabic, Filipino, and many more!', category: 'Languages' },
  ]);

  const [chatSimulation, setChatSimulation] = useState([
    { sender: 'user', message: 'Hello, I need some help.', time: '10:30 AM' },
    { sender: 'bot', message: 'Hi there! I\'m your language learning assistant. How can I help you today?', time: '10:30 AM' },
  ]);
  
  const [userInput, setUserInput] = useState('');
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [isAddingResponse, setIsAddingResponse] = useState(false);
  const [newResponse, setNewResponse] = useState({
    trigger: '',
    response: '',
    category: '',
  });

  const categories = ['Account', 'Billing', 'Languages', 'Settings', 'Technical', 'Other'];

  const handleAddResponse = () => {
    if(!newResponse.trigger || !newResponse.response || !newResponse.category) return;
    
    const response = {
      id: chatbotResponses.length + 1,
      ...newResponse
    };
    
    setChatbotResponses([...chatbotResponses, response]);
    setNewResponse({ trigger: '', response: '', category: '' });
    setIsAddingResponse(false);
  };

  const handleEditResponse = () => {
    if(!selectedResponse) return;
    
    const updatedResponses = chatbotResponses.map(r => 
      r.id === selectedResponse.id ? selectedResponse : r
    );
    
    setChatbotResponses(updatedResponses);
    setSelectedResponse(null);
  };

  const handleDeleteResponse = (id) => {
    setChatbotResponses(chatbotResponses.filter(r => r.id !== id));
  };

  const handleChatInput = () => {
    if(userInput.trim() === '') return;
    
    // Add user message to chat
    const newUserMessage = {
      sender: 'user',
      message: userInput,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setChatSimulation([...chatSimulation, newUserMessage]);
    
    // Find a matching bot response
    const matchingResponse = chatbotResponses.find(r => 
      userInput.toLowerCase().includes(r.trigger.toLowerCase())
    );
    
    // Add bot response after a short delay
    setTimeout(() => {
      const botResponse = {
        sender: 'bot',
        message: matchingResponse 
          ? matchingResponse.response 
          : "I'm sorry, I don't have specific information about that. Would you like me to connect you with a human agent?",
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      setChatSimulation(current => [...current, botResponse]);
    }, 1000);
    
    setUserInput('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-8/12 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Chatbot Responses</h2>
            <Drawer open={isAddingResponse} onOpenChange={setIsAddingResponse}>
              <DrawerTrigger asChild>
                <Button size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Response
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Add Chatbot Response</DrawerTitle>
                  <DrawerDescription>
                    Create a new automated response for the chatbot.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="px-4 py-2 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="trigger">Trigger Phrase</Label>
                    <Input 
                      id="trigger" 
                      value={newResponse.trigger} 
                      onChange={(e) => setNewResponse({...newResponse, trigger: e.target.value})} 
                      placeholder="e.g., 'how to reset password'"
                    />
                    <p className="text-xs text-muted-foreground">
                      This is what the user might ask that will trigger this response
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="response">Bot Response</Label>
                    <Input 
                      id="response" 
                      value={newResponse.response} 
                      onChange={(e) => setNewResponse({...newResponse, response: e.target.value})} 
                      placeholder="Enter the chatbot's response"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select 
                      id="category"
                      value={newResponse.category}
                      onChange={(e) => setNewResponse({...newResponse, category: e.target.value})}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <DrawerFooter>
                  <Button onClick={handleAddResponse}>Save Response</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trigger Phrase</TableHead>
                <TableHead>Response</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chatbotResponses.map((response) => (
                <TableRow key={response.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {response.trigger}
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {response.response}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-secondary">
                      {response.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Drawer onOpenChange={(open) => !open && setSelectedResponse(null)}>
                      <DrawerTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setSelectedResponse({...response})}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>Edit Chatbot Response</DrawerTitle>
                        </DrawerHeader>
                        {selectedResponse && (
                          <div className="px-4 py-2 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-trigger">Trigger Phrase</Label>
                              <Input 
                                id="edit-trigger" 
                                value={selectedResponse.trigger} 
                                onChange={(e) => setSelectedResponse({
                                  ...selectedResponse, 
                                  trigger: e.target.value
                                })} 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="edit-response">Bot Response</Label>
                              <Input 
                                id="edit-response" 
                                value={selectedResponse.response} 
                                onChange={(e) => setSelectedResponse({
                                  ...selectedResponse, 
                                  response: e.target.value
                                })} 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="edit-category">Category</Label>
                              <select 
                                id="edit-category"
                                value={selectedResponse.category}
                                onChange={(e) => setSelectedResponse({
                                  ...selectedResponse, 
                                  category: e.target.value
                                })}
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                              >
                                {categories.map(category => (
                                  <option key={category} value={category}>{category}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                        <DrawerFooter>
                          <Button onClick={handleEditResponse}>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteResponse(response.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="w-full md:w-4/12">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="h-5 w-5" />
                Chatbot Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col h-[400px]">
              <div className="flex-1 overflow-auto mb-4 space-y-3">
                {chatSimulation.map((msg, idx) => (
                  <div 
                    key={idx}
                    className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === 'bot' 
                        ? 'bg-muted' 
                        : 'bg-primary text-primary-foreground'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'bot' 
                          ? 'text-muted-foreground' 
                          : 'text-primary-foreground/70'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto border-t pt-3">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Test the chatbot responses..." 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleChatInput()}
                  />
                  <Button size="icon" onClick={handleChatInput}>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Try typing keywords from your response triggers above to test the bot.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatbotManager;
