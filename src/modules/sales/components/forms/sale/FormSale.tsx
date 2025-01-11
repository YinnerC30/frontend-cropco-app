import { ScrollArea } from '@/components';
import React from 'react';
import { FormSaleButtons } from './FormSaleButtons';
import { FormSaleProps, FormSaleProvider } from './FormSaleContext';
import { FormSaleFields } from './FormSaleFields';

export const FormSale: React.FC<FormSaleProps> = (props) => {
  return (
    <FormSaleProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2">
          <FormSaleFields />
        </ScrollArea>
        <FormSaleButtons />
      </div>
    </FormSaleProvider>
  );
};

export default FormSale;
