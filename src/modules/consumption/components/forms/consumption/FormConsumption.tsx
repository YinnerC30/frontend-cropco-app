import { ScrollArea } from '@/components';
import { FormConsumptionButtons } from './FormConsumptionButtons';
import { FormConsumptionProps, FormConsumptionProvider } from './FormConsumptionContext';
import { FormConsumptionFields } from './FormConsumptionFields';

export const FormConsumption: React.FC<FormConsumptionProps> = (props: FormConsumptionProps) => {
  return (
    <FormConsumptionProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2">
          <FormConsumptionFields />
        </ScrollArea>
        <FormConsumptionButtons />
      </div>
    </FormConsumptionProvider>
  );
};

export default FormConsumption;
