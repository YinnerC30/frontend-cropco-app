import { ScrollArea } from '@/components';
import { FormHarvestButtons } from './FormHarvestButtons';
import { FormHarvestProps, FormHarvestProvider } from './FormHarvestContext';
import { FormHarvestFields } from './FormHarvestFields';

export const FormHarvest: React.FC<FormHarvestProps> = (props) => {
  return (
    <FormHarvestProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2">
          <FormHarvestFields />
        </ScrollArea>
        <FormHarvestButtons />
      </div>
    </FormHarvestProvider>
  );
};

export default FormHarvest;
