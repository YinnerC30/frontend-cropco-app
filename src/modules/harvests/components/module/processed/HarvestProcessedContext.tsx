import { useAuthContext } from '@/auth';
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
    id: undefined,
    date: undefined,
    total: 0,
  });

  const { validatePermissionsInModule } = useAuthContext();

  const permissionsHarvest = validatePermissionsInModule('harvests');

  const contextValue = {
    ...queryOneHarvest,
    harvestProcessed,
    setHarvestProcessed,
    openDialog,
    setOpenDialog,
    permissionsHarvest,
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
