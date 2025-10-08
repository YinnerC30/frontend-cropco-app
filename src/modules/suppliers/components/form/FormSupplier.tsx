import { ScrollArea } from '@/components';
import { FormSupplierButtons } from './FormSupplierButtons';
import { FormSupplierProps, FormSupplierProvider } from './FormSupplierContext';
import { FormSupplierFields } from './FormSupplierFields';
import { PropsWithChildren } from 'react';

interface Props extends FormSupplierProps, PropsWithChildren {}

export const FormSupplier: React.FC<Props> = ({ children, ...props }) => {
  return (
    <FormSupplierProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2 pr-2">
          <FormSupplierFields />
          <div className="flex flex-col lg:justify-center">{children}</div>
        </ScrollArea>

        <FormSupplierButtons />
      </div>
    </FormSupplierProvider>
  );
};

export default FormSupplier;
