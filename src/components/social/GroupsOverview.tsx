
import React from 'react';
import { useSocialGroups, SocialGroup } from '../../contexts/SocialGroupsContext';
import { motion } from 'framer-motion';
import { Users, Plus, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const GroupsOverview: React.FC = () => {
  const { groups } = useSocialGroups();
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Users className="text-game-purple" />
          My Groups
        </h2>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate('/social/discover')}
            className="flex items-center gap-2"
          >
            <Globe size={16} />
            <span>Discover</span>
          </Button>
          
          <Button
            onClick={() => navigate('/social/create')}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            <span>New Group</span>
          </Button>
        </div>
      </div>
      
      {groups.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center p-8 border border-dashed rounded-lg"
        >
          <h3 className="text-xl font-medium mb-2">No Groups Yet</h3>
          <p className="text-gray-600 mb-4">
            Create a group or join existing ones to get started
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/social/discover')}
            >
              Join a Group
            </Button>
            <Button onClick={() => navigate('/social/create')}>
              Create New Group
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

interface GroupCardProps {
  group: SocialGroup;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const navigate = useNavigate();
  
  const typeColorMap: Record<SocialGroup['type'], string> = {
    family: 'bg-amber-100 text-amber-800',
    friends: 'bg-purple-100 text-purple-800',
    school: 'bg-blue-100 text-blue-800',
    local: 'bg-green-100 text-green-800',
    regional: 'bg-teal-100 text-teal-800',
    global: 'bg-red-100 text-red-800',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{group.name}</CardTitle>
            <span className={`text-xs px-2 py-1 rounded-full ${typeColorMap[group.type]}`}>
              {group.type}
            </span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-gray-600 text-sm mb-3">{group.description}</p>
          <div className="flex items-center mt-4 text-sm text-gray-500">
            <Users size={14} className="mr-1" />
            <span>{group.members.length} members</span>
          </div>
        </CardContent>
        <CardFooter className="pt-2 border-t">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/social/group/${group.id}`)}
            className="w-full"
          >
            View Group
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default GroupsOverview;
