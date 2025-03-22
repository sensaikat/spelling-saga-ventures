
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const MaintenanceScheduler = () => {
  // Mock data - in a real app this would come from an API
  const [maintenanceTasks, setMaintenanceTasks] = useState([
    { id: 1, title: 'Server Restart', description: 'Weekly server restart', date: new Date(2023, 7, 15), status: 'Scheduled' },
    { id: 2, title: 'Database Backup', description: 'Monthly database backup', date: new Date(2023, 7, 22), status: 'Completed' },
    { id: 3, title: 'Update Language Data', description: 'Add new words to language databases', date: new Date(2023, 8, 5), status: 'Scheduled' },
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    date: new Date(),
  });

  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAddTask = () => {
    const task = {
      id: maintenanceTasks.length + 1,
      ...newTask,
      status: 'Scheduled'
    };
    
    setMaintenanceTasks([...maintenanceTasks, task]);
    setNewTask({ title: '', description: '', date: new Date() });
    setIsAddingTask(false);
  };

  const handleDeleteTask = (id) => {
    setMaintenanceTasks(maintenanceTasks.filter(task => task.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Maintenance Schedule</h2>
        <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Maintenance Task</DialogTitle>
              <DialogDescription>
                Create a new maintenance task. This will be visible to administrators only.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={newTask.title} 
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  value={newTask.description} 
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label>Schedule Date</Label>
                <Calendar
                  mode="single"
                  selected={newTask.date}
                  onSelect={(date) => setNewTask({...newTask, date: date || new Date()})}
                  className="border rounded-md p-3"
                />
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddTask}>Save Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenanceTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{format(task.date, 'PPP')}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  task.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {task.status}
                </span>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="ghost" size="icon">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaintenanceScheduler;
