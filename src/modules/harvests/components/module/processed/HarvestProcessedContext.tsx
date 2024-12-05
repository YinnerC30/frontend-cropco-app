import { createContext, useContext } from 'react';

export const HarvestProcessedContext = createContext<any>(null);

export const HarvestProcessedProvider = ({ children }: any) => {
  const contextValue = {};

  return (
    <HarvestProcessedContext.Provider value={contextValue}>
      {children}
    </HarvestProcessedContext.Provider>
  );
};

export const useHarvestProcessedContext = () => {
  const context = useContext(HarvestProcessedContext);
  if (!context) {
    throw new Error(
      'useHarvestProcessedContext must be used within HarvestProcessedProvider'
    );
  }
  return context;
};
