
import React, { useState } from 'react';
import { useSocialGroups, SocialGroup } from '../../contexts/SocialGroupsContext';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const DiscoverGroups: React.FC = () => {
  const { discoveryGroups, joinPublicGroup } = useSocialGroups();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredGroups = discoveryGroups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (group.location && group.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/social')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          <span>Back to Groups</span>
        </Button>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Discover Public Groups</h2>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search groups by name, description or location"
          className="pl-10"
        />
      </div>
      
      {filteredGroups.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <p className="text-gray-600">No groups found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGroups.map((group) => (
            <GroupCard 
              key={group.id} 
              group={group} 
              onJoin={() => joinPublicGroup(group.id)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

interface GroupCardProps {
  group: SocialGroup;
  onJoin: () => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, onJoin }) => {
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
          
          {group.location && (
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <MapPin size={14} className="mr-1" />
              <span>{group.location}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-500">
            <Users size={14} className="mr-1" />
            <span>{group.members.length} members</span>
          </div>
        </CardContent>
        <CardFooter className="pt-2 border-t">
          <Button 
            onClick={onJoin}
            className="w-full"
          >
            Join Group
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DiscoverGroups;
