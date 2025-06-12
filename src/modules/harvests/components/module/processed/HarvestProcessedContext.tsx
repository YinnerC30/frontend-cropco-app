import { useAuthContext } from '@/auth';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useGetHarvest } from '@/modules/harvests/hooks';
import { Harvest, HarvestProcessed } from '@/modules/harvests/interfaces';
import {
  MassUnitOfMeasure,
  UnitOfMeasure,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import React, { createContext, useContext, useMemo, useState } from 'react';

export interface HarvestProcessedContextValues {
  queryOneHarvest: UseGetOneRecordReturn<Harvest>;
  actionsHarvestsModule: Record<string, boolean>;
  harvestProcessed: HarvestProcessed;
  setHarvestProcessed: React.Dispatch<React.SetStateAction<HarvestProcessed>>;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  unitTypeToShowAmount: MassUnitOfMeasure;
  setUnitTypeToShowAmount: React.Dispatch<
    React.SetStateAction<MassUnitOfMeasure>
  >;
  unitTypeToShowProcessedAmount: MassUnitOfMeasure;
  setUnitTypeToShowProcessedAmount: React.Dispatch<
    React.SetStateAction<MassUnitOfMeasure>
  >;
  amountConverted: number;
  amountProcessedConverted: number;
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
    unit_of_measure: undefined,
    amount: 0,
  });

  const { getActionsModule } = useAuthContext();

  const actionsHarvestsModule = useMemo(() => getActionsModule('harvests'), []);

  const [unitTypeToShowAmount, setUnitTypeToShowAmount] =
    useState<MassUnitOfMeasure>(MassUnitOfMeasure.KILOGRAMOS);

  const [unitTypeToShowProcessedAmount, setUnitTypeToShowProcessedAmount] =
    useState<MassUnitOfMeasure>(MassUnitOfMeasure.KILOGRAMOS);

  const { convert } = useUnitConverter();

  const amountConverted: number = queryOneHarvest.isSuccess
    ? convert(
        queryOneHarvest.data.amount,
        'GRAMOS' as UnitOfMeasure,
        unitTypeToShowAmount
      )
    : 0;

  const amountProcessedConverted: number = queryOneHarvest.isSuccess
    ? convert(
        queryOneHarvest.data.total_amount_processed!,
        'GRAMOS' as UnitOfMeasure,
        unitTypeToShowProcessedAmount
      )
    : 0;

  console.log(queryOneHarvest.data);
  console.log('🚀 ~ amountProcessedConverted:', amountProcessedConverted);

  const contextValue: HarvestProcessedContextValues = {
    queryOneHarvest,
    harvestProcessed,
    setHarvestProcessed,
    openDialog,
    setOpenDialog,
    actionsHarvestsModule,
    unitTypeToShowAmount,
    setUnitTypeToShowAmount,
    unitTypeToShowProcessedAmount,
    setUnitTypeToShowProcessedAmount,
    amountConverted,
    amountProcessedConverted,
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
