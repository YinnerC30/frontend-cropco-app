import { ScrollArea } from '@/components';
import { FormUserProps } from '../../interfaces/form/FormUserProps';
import { FormUserButtons } from './FormUserButtons';
import { FormUserProvider } from './FormUserContext';
import { FormUserFields } from './FormUserFields';
import { FormUserFieldsPermissions } from './FormUserFieldsPermissions';

export const FormUser: React.FC<FormUserProps> = (props) => {
  return (
    <FormUserProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2">
          <FormUserFields />
          <FormUserFieldsPermissions />
        </ScrollArea>
        <FormUserButtons />
      </div>
    </FormUserProvider>
  );
};

export default FormUser;
