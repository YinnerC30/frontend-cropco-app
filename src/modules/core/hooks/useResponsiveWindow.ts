import { useWindowSize } from 'react-use';

export const useResponsiveWindow = () => {
  const { width } = useWindowSize();
  const isSmallScreen = width < 1024;
  return {
    isSmallScreen,
  };
};
