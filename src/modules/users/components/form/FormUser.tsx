import { ScrollArea } from '@/components';
import { FormUserProps } from '../../interfaces/FormUserProps';
import { FormUserButtons } from './FormUserButtons';
import { FormUserProvider } from './FormUserContext';
import { FormUserFields } from './FormUserFields';
import { FormUserFieldsPermissions } from './FormUserFieldsPermissions';

export const FormUser: React.FC<FormUserProps> = ({
  defaultValues,
  hiddenPassword = false,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: FormUserProps) => {
  return (
    <FormUserProvider
      defaultValues={defaultValues}
      hiddenPassword={hiddenPassword}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[72vh] w-full pb-2">
          <FormUserFields />
          <FormUserFieldsPermissions />
        </ScrollArea>
        <FormUserButtons />
      </div>
    </FormUserProvider>
  );
};

export default FormUser;
