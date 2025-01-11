import { ScrollArea } from '@/components';
import { FormClientButtons } from './FormClientButtons';
import { FormClientProps, FormClientProvider } from './FormClientContext';
import { FormClientFields } from './FormClientFields';

export const FormClient: React.FC<FormClientProps> = (
  props: FormClientProps
) => {
  return (
    <FormClientProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2">
          <FormClientFields />
        </ScrollArea>
        <FormClientButtons />
      </div>
    </FormClientProvider>
  );
};

export default FormClient;
