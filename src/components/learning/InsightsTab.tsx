
import React from 'react';
import { motion } from 'framer-motion';
import { LearningInsight } from '../../services/analytics/learningAnalytics';
import { Word } from '../../utils/game/types';
import InsightsContainer from './insights/InsightsContainer';
import RecommendedWordsCard from './insights/RecommendedWordsCard';

interface InsightsTabProps {
  insights: LearningInsight[];
  recommendedWords: Word[];
}

const InsightsTab: React.FC<InsightsTabProps> = ({ insights, recommendedWords }) => {
  return (
    <>
      {/* Learning Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <InsightsContainer insights={insights} />
      </motion.div>
      
      {/* Recommended Words Section */}
      {recommendedWords.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <RecommendedWordsCard words={recommendedWords} />
        </motion.div>
      )}
    </>
  );
};

export default InsightsTab;
