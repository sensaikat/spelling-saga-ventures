
import { useLocation } from 'react-router-dom';

/**
 * Hook that provides contextual guide messages based on the current route
 */
export const useGuideMessages = () => {
  const location = useLocation();
  
  // Get welcome message based on the current route
  const getRouteWelcomeMessage = (): string => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) return "Welcome to Language Adventure! / ¡Bienvenido a Aventura de Idiomas!";
    
    const currentRoute = pathSegments[0];
    const subRoute = pathSegments.length > 1 ? pathSegments[1] : null;
    
    switch (currentRoute) {
      case 'adventure':
        return subRoute 
          ? `Welcome to the ${subRoute} adventure! / ¡Bienvenido a la aventura de ${subRoute}!` 
          : "Choose a location for your adventure! / ¡Elige un lugar para tu aventura!";
      case 'game':
        return "Ready to improve your spelling? / ¿Listo para mejorar tu ortografía?";
      case 'progress':
        return "Check how much you've learned! / ¡Comprueba cuánto has aprendido!";
      case 'settings':
        return "Customize your experience here! / ¡Personaliza tu experiencia aquí!";
      default:
        return "Welcome to Language Adventure! / ¡Bienvenido a Aventura de Idiomas!";
    }
  };
  
  // Get inactivity messages based on the current route
  const getInactivityMessages = (): string[] => {
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
  
  // Get a random inactivity message
  const getRandomInactivityMessage = (): string => {
    const messages = getInactivityMessages();
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };
  
  return {
    getRouteWelcomeMessage,
    getInactivityMessages,
    getRandomInactivityMessage
  };
};
