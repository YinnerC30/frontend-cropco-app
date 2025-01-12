import { useAuthContext } from '@/auth';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responsess/UseGetOneRecordReturn';
import { useGetHarvest } from '@/modules/harvests/hooks';
import { Harvest, HarvestProcessed } from '@/modules/harvests/interfaces';
import React, { createContext, useContext, useMemo, useState } from 'react';

export interface HarvestProcessedContextValues {
  queryOneHarvest: UseGetOneRecordReturn<Harvest>;
  actionsHarvestsModule: Record<string, boolean>;
  harvestProcessed: HarvestProcessed;
  setHarvestProcessed: React.Dispatch<React.SetStateAction<HarvestProcessed>>;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
export const HarvestProcessedContext = createContext<
  HarvestProcessedContextValues | undefined
>(undefined);

export const HarvestProcessedProvider: React.FC<{
  id: string;
  children: React.ReactNode;
}> = ({ id, children }) => {
  const queryOneHarvest = useGetHarvest(id!);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [harvestProcessed, setHarvestProcessed] = useState<HarvestProcessed>({
    id: undefined,
    date: undefined,
    total: 0,
  });

  const { getActionsModule } = useAuthContext();

  const actionsHarvestsModule = useMemo(() => getActionsModule('harvests'), []);

  const contextValue: HarvestProcessedContextValues = {
    queryOneHarvest,
    harvestProcessed,
    setHarvestProcessed,
    openDialog,
    setOpenDialog,
    actionsHarvestsModule,
  };

  return (
    <HarvestProcessedContext.Provider value={contextValue}>
      {children}
    </HarvestProcessedContext.Provider>
  );
};

export const useHarvestProcessedContext = (): HarvestProcessedContextValues => {
  const context = useContext(HarvestProcessedContext);
  if (!context) {
    throw new Error(
      'useHarvestProcessedContext must be used within HarvestProcessedProvider'
    );
  }
  return context;
};
