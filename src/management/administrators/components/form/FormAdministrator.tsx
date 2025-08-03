import { ScrollArea } from '@/components';
import { FormAdministratorProps } from '../../interfaces/form/FormAdministratorProps';
import { FormAdministratorButtons } from './FormAdministratorButtons';
import { FormAdministratorProvider } from './FormAdministratorContext';
import { FormAdministratorFields } from './FormAdministratorFields';

export const FormAdministrator: React.FC<FormAdministratorProps> = (props) => {
  return (
    <FormAdministratorProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2">
          <FormAdministratorFields />
        </ScrollArea>
        <FormAdministratorButtons />
      </div>
    </FormAdministratorProvider>
  );
};

export default FormAdministrator;
