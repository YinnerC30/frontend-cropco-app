import { ScrollArea } from '@/components';
import React from 'react';
import { FormSupplyButtons } from './FormSupplyButtons';
import { FormSupplyProps, FormSupplyProvider } from './FormSupplyContext';
import { FormSupplyFields } from './FormSupplyFields';

export const FormSupply: React.FC<FormSupplyProps> = (props) => {
  return (
    <FormSupplyProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2">
          <FormSupplyFields />
        </ScrollArea>
        <FormSupplyButtons />
      </div>
    </FormSupplyProvider>
  );
};

export default FormSupply;
