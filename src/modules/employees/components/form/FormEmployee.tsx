import { ScrollArea } from '@/components';
import { FormEmployeeButtons } from './FormEmployeeButtons';
import { FormEmployeeProps, FormEmployeeProvider } from './FormEmployeeContext';
import { FormEmployeeFields } from './FormEmployeeFields';

export const FormEmployee: React.FC<FormEmployeeProps> = (props) => {
  return (
    <FormEmployeeProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2">
          <FormEmployeeFields />
        </ScrollArea>
        <FormEmployeeButtons />
      </div>
    </FormEmployeeProvider>
  );
};

export default FormEmployee;
