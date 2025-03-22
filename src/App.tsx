import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Home from './pages/Home';
import Adventure from './pages/Adventure';
import AdventureScenePage from './pages/AdventureScene';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Subscription from './pages/Subscription';
import NotFound from './pages/NotFound';
import { useSubscriptionStore } from './utils/subscription';
import { ThemeAudioProvider } from './contexts/theme/ThemeContext';

function App() {
  const queryClient = new QueryClient();
  const { updateLimits } = useSubscriptionStore();
  
  // Update subscription limits on app load
  useEffect(() => {
    updateLimits();
  }, [updateLimits]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeAudioProvider>
        <div className="h-screen overflow-hidden">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/adventure" element={<Adventure />} />
              <Route path="/adventure/:locationId" element={<AdventureScenePage />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/game" element={<Game />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      </ThemeAudioProvider>
    </QueryClientProvider>
  );
}

export default App;
