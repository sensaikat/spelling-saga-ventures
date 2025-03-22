
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useGameGuide = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [guideMessage, setGuideMessage] = useState("");
  const [autoHintTimer, setAutoHintTimer] = useState<NodeJS.Timeout | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  
  // Initialize guide visibility based on user's path
  useEffect(() => {
    // Show the guide with a welcome message when user enters a new route
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const currentRoute = pathSegments[0];
      const subRoute = pathSegments.length > 1 ? pathSegments[1] : null;
      
      let routeMessage = "";
      
      switch (currentRoute) {
        case 'adventure':
          routeMessage = subRoute 
            ? `Welcome to the ${subRoute} adventure! / ¡Bienvenido a la aventura de ${subRoute}!` 
            : "Choose a location for your adventure! / ¡Elige un lugar para tu aventura!";
          break;
        case 'game':
          routeMessage = "Ready to improve your spelling? / ¿Listo para mejorar tu ortografía?";
          break;
        case 'progress':
          routeMessage = "Check how much you've learned! / ¡Comprueba cuánto has aprendido!";
          break;
        case 'settings':
          routeMessage = "Customize your experience here! / ¡Personaliza tu experiencia aquí!";
          break;
        default:
          routeMessage = "Welcome to Language Adventure! / ¡Bienvenido a Aventura de Idiomas!";
      }
      
      setGuideMessage(routeMessage);
      setShowGuide(true);
      
      // Hide after initial display
      const timer = setTimeout(() => {
        setShowGuide(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);
  
  // Automatically show guide after a period of inactivity with contextual hints
  useEffect(() => {
    if (!showGuide) {
      // Different inactivity messages based on current route
      const getInactivityMessages = () => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const currentRoute = pathSegments[0];
        
        switch (currentRoute) {
          case 'adventure':
            return [
              "Explore different terrains for unique challenges! / ¡Explora diferentes terrenos para desafíos únicos!",
              "Each location has special vocabulary to learn! / ¡Cada ubicación tiene vocabulario especial para aprender!",
              "Complete challenges to unlock new areas! / ¡Completa desafíos para desbloquear nuevas áreas!",
              "Click on locations to start an adventure! / ¡Haz clic en ubicaciones para comenzar una aventura!"
            ];
          case 'game':
            return [
              "Need a hint? I'm here to help! / ¿Necesitas una pista? ¡Estoy aquí para ayudar!",
              "Listen to pronunciations by clicking the speaker! / ¡Escucha pronunciaciones haciendo clic en el altavoz!",
              "Take your time and think about each word! / ¡Tómate tu tiempo y piensa en cada palabra!",
              "Try using the alphabet helper if you're stuck! / ¡Intenta usar el ayudante de alfabeto si estás atascado!"
            ];
          default:
            return [
              "Need help navigating? Just ask me! / ¿Necesitas ayuda para navegar? ¡Solo pregúntame!",
              "Try different game modes to practice! / ¡Prueba diferentes modos de juego para practicar!",
              "Check your progress to see improvement! / ¡Verifica tu progreso para ver mejoras!",
              "Settings can be changed anytime! / ¡La configuración puede cambiarse en cualquier momento!"
            ];
        }
      };
      
      const inactivityMessages = getInactivityMessages();
      
      // Clear any existing timer
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      
      // Set a new timer
      const timer = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * inactivityMessages.length);
        setGuideMessage(inactivityMessages[randomIndex]);
        setShowGuide(true);
      }, 25000); // Show after 25 seconds of inactivity
      
      setAutoHintTimer(timer);
      inactivityTimerRef.current = timer;
      
      return () => {
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
        }
      };
    }
  }, [showGuide, location.pathname]);
  
  const showGuideWithMessage = (message: string) => {
    // Clear any pending auto-hint timer
    if (autoHintTimer) {
      clearTimeout(autoHintTimer);
      setAutoHintTimer(null);
    }
    
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
    
    setShowGuide(true);
    setGuideMessage(message);
  };
  
  const hideGuide = () => {
    setShowGuide(false);
    
    // Reset the auto-hint timer when guide is manually hidden
    resetInactivityTimer();
  };
  
  // Reset the timer on user activity
  const resetInactivityTimer = () => {
    if (autoHintTimer) {
      clearTimeout(autoHintTimer);
    }
    
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    // Different inactivity messages based on current route
    const getInactivityMessages = () => {
      const pathSegments = location.pathname.split('/').filter(Boolean);
      const currentRoute = pathSegments[0];
      
      switch (currentRoute) {
        case 'adventure':
          return [
            "Explore different terrains for unique challenges! / ¡Explora diferentes terrenos para desafíos únicos!",
            "Each location has special vocabulary to learn! / ¡Cada ubicación tiene vocabulario especial para aprender!",
            "Complete challenges to unlock new areas! / ¡Completa desafíos para desbloquear nuevas áreas!",
            "Click on locations to start an adventure! / ¡Haz clic en ubicaciones para comenzar una aventura!"
          ];
        case 'game':
          return [
            "Need a hint? I'm here to help! / ¿Necesitas una pista? ¡Estoy aquí para ayudar!",
            "Listen to pronunciations by clicking the speaker! / ¡Escucha pronunciaciones haciendo clic en el altavoz!",
            "Take your time and think about each word! / ¡Tómate tu tiempo y piensa en cada palabra!",
            "Try using the alphabet helper if you're stuck! / ¡Intenta usar el ayudante de alfabeto si estás atascado!"
          ];
        default:
          return [
            "Need help navigating? Just ask me! / ¿Necesitas ayuda para navegar? ¡Solo pregúntame!",
            "Try different game modes to practice! / ¡Prueba diferentes modos de juego para practicar!",
            "Check your progress to see improvement! / ¡Verifica tu progreso para ver mejoras!",
            "Settings can be changed anytime! / ¡La configuración puede cambiarse en cualquier momento!"
          ];
      }
    };
    
    const inactivityMessages = getInactivityMessages();
    
    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * inactivityMessages.length);
      setGuideMessage(inactivityMessages[randomIndex]);
      setShowGuide(true);
    }, 30000); // Show after 30 seconds of inactivity
    
    setAutoHintTimer(timer);
    inactivityTimerRef.current = timer;
  };
  
  return {
    showGuide,
    guideMessage,
    showGuideWithMessage,
    hideGuide,
    resetInactivityTimer
  };
};
