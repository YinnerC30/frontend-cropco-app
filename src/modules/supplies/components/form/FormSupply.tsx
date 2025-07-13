import { ScrollArea } from '@/components';
import React, { PropsWithChildren } from 'react';
import { FormSupplyButtons } from './FormSupplyButtons';
import { FormSupplyProps, FormSupplyProvider } from './FormSupplyContext';
import { FormSupplyFields } from './FormSupplyFields';

interface Props extends FormSupplyProps, PropsWithChildren {}

export const FormSupply: React.FC<Props> = ({ children, ...props }) => {
  return (
    <FormSupplyProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2 pr-6">
          <FormSupplyFields />
          <div className="flex flex-col lg:justify-center">{children}</div>
        </ScrollArea>
        <FormSupplyButtons />
      </div>
    </FormSupplyProvider>
  );
};

export default FormSupply;
