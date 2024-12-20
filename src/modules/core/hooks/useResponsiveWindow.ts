import { useWindowSize } from 'react-use';

export const useResponsiveWindow = (): { isSmallScreen: boolean } => {
  const { width } = useWindowSize();
  const isSmallScreen = width < 1024;
  return {
    isSmallScreen,
  };
};
