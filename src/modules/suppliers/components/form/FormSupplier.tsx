import { ScrollArea } from '@/components';
import { FormSupplierButtons } from './FormSupplierButtons';
import { FormSupplierProps, FormSupplierProvider } from './FormSupplierContext';
import { FormSupplierFields } from './FormSupplierFields';

export const FormSupplier: React.FC<FormSupplierProps> = (props) => {
  return (
    <FormSupplierProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2">
          <FormSupplierFields />
        </ScrollArea>

        <FormSupplierButtons />
      </div>
    </FormSupplierProvider>
  );
};

export default FormSupplier;
