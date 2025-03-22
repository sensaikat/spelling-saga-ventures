
import React from 'react';
import { BookOpen } from 'lucide-react';

const EmptyInsightsState: React.FC = () => {
  return (
    <div className="text-center py-8 text-gray-500">
      <BookOpen className="mx-auto mb-3 h-12 w-12 opacity-50" />
      <p>Keep practicing to receive personalized insights and recommendations.</p>
    </div>
  );
};

export default EmptyInsightsState;
