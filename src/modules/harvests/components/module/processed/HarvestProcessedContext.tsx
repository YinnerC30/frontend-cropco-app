import { useGetHarvest } from '@/modules/harvests/hooks';
import React, { createContext, useContext } from 'react';

export const HarvestProcessedContext = createContext<any>(null);

export const HarvestProcessedProvider = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const queryOneHarvest = useGetHarvest(id!);

  const contextValue = {
    ...queryOneHarvest,
  };

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
