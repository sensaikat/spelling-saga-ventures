
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import GameMode from './pages/GameMode';
import SpellingGame from './pages/SpellingGame';
import NotFound from './pages/NotFound';
import MultiLanguageGamePage from './pages/MultiLanguageGamePage';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import LearningDashboard from './pages/LearningDashboard';
import AdventureMap from './pages/AdventureMap';
import AdventureScene from './pages/AdventureScene';
import Subscription from './pages/Subscription';
import { AdventureProvider } from './contexts/adventure';
import './App.css';

// Check and reset daily game count if it's a new day
const lastPlayedDate = localStorage.getItem('last-played-date');
const today = new Date().toISOString().split('T')[0];

if (lastPlayedDate !== today) {
  localStorage.setItem('last-played-date', today);
  // Reset daily game count will happen in the subscription store
}

function App() {
  return (
    <Router>
      <AdventureProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/game-mode" element={<GameMode />} />
          <Route path="/game" element={<SpellingGame />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/multi-language" element={<MultiLanguageGamePage />} />
          <Route path="/learning-dashboard" element={<LearningDashboard />} />
          <Route path="/adventure" element={<AdventureMap />} />
          <Route path="/adventure/:locationId" element={<AdventureScene />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AdventureProvider>
    </Router>
  );
}

export default App;
