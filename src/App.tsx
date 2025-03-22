
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from './pages/Index';
import GameMode from './pages/GameMode';
import SpellingGame from './pages/SpellingGame';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Progress from './pages/Progress';
import AdventureMap from './pages/AdventureMap';
import AdventureScene from './pages/AdventureScene';
import LearningDashboard from './pages/LearningDashboard';
import { AdventureProvider } from './contexts/adventure/AdventureContext';
import './App.css';

function App() {
  return (
    <Router>
      <AdventureProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/game-mode" element={<GameMode />} />
          <Route path="/game/:gameId" element={<SpellingGame />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/learning-dashboard" element={<LearningDashboard />} />
          <Route path="/adventure" element={<AdventureMap />} />
          <Route path="/adventure/:locationId" element={<AdventureScene />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <Toaster />
      </AdventureProvider>
    </Router>
  );
}

export default App;
