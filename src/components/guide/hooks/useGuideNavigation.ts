
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuideState } from './useGuideState';

interface UseGuideNavigationProps {
  navigateTo?: (path: string) => void;
}

export const useGuideNavigation = ({ navigateTo }: UseGuideNavigationProps = {}) => {
  const navigate = useNavigate();
  const { hideMessage } = useGuideState();
  
  const handleNavigate = useCallback((path: string) => {
    hideMessage();
    if (navigateTo) {
      navigateTo(path);
    } else {
      navigate(path);
    }
  }, [navigate, navigateTo, hideMessage]);

  return {
    handleNavigate
  };
};
