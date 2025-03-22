
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdventureProvider } from './contexts/adventure';
import './App.css';

// Pages
import Index from './pages/Index';
import GameMode from './pages/GameMode';
import SpellingGame from './pages/SpellingGame';
import Settings from './pages/Settings';
import Progress from './pages/Progress';
import NotFound from './pages/NotFound';
import AdventureMap from './pages/AdventureMap';
import AdventureScene from './pages/AdventureScene';
import LearningDashboard from './pages/LearningDashboard';
import MultiLanguageGamePage from './pages/MultiLanguageGamePage';
import { MultiLanguageGame } from './components/multi-language';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdventureProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/game-mode" element={<GameMode />} />
            <Route path="/game/:gameId" element={<SpellingGame />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/adventure" element={<AdventureMap />} />
            <Route path="/adventure/:locationId" element={<AdventureScene />} />
            <Route path="/learning" element={<LearningDashboard />} />
            
            {/* New Multi-Language Routes */}
            <Route path="/multi-language" element={<MultiLanguageGame />} />
            <Route path="/multi-language-game" element={<MultiLanguageGamePage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AdventureProvider>
    </QueryClientProvider>
  );
}

export default App;
