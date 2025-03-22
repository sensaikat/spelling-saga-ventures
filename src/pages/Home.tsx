
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import QuickNav from '../components/navigation/QuickNav';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full flex justify-end mb-6 max-w-4xl">
        <QuickNav />
      </div>
    
      <h1 className="text-4xl font-bold mb-6 text-center text-primary">Welcome to Language Adventure</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link to="/adventure" className="w-full">
            <Button variant="default" size="lg" className="w-full h-24 text-xl">
              Start Adventure
            </Button>
          </Link>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link to="/game" className="w-full">
            <Button variant="default" size="lg" className="w-full h-24 text-xl">
              Play Games
            </Button>
          </Link>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link to="/settings" className="w-full">
            <Button variant="outline" size="lg" className="w-full h-24 text-xl">
              Settings
            </Button>
          </Link>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link to="/subscription" className="w-full">
            <Button variant="outline" size="lg" className="w-full h-24 text-xl">
              Subscription
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
