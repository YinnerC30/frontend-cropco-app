import { useGetHarvest } from '@/modules/harvests/hooks';
import React, { createContext, useContext, useState } from 'react';

export const HarvestProcessedContext = createContext<any>(null);

export const HarvestProcessedProvider = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const queryOneHarvest = useGetHarvest(id!);

  const [openDialog, setOpenDialog] = useState(false);

  const [harvestProcessed, setHarvestProcessed] = useState({
    date: undefined,
    total: 0,
  });

  

  const contextValue = {
    ...queryOneHarvest,
    harvestProcessed,
    setHarvestProcessed,
    openDialog,
    setOpenDialog,
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
