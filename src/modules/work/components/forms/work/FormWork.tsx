import { ScrollArea } from '@/components';
import { FormWorkButtons } from './FormWorkButtons';
import { FormWorkProps, FormWorkProvider } from './FormWorkContext';
import { FormWorkFields } from './FormWorkFields';

export const FormWork: React.FC<FormWorkProps> = (props) => {
  return (
    <FormWorkProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2">
          <FormWorkFields />
        </ScrollArea>
        <FormWorkButtons />
      </div>
    </FormWorkProvider>
  );
};

export default FormWork;
