import { FormUserProps } from '../../interfaces/FormUserProps';
import { FormUserButtons } from './FormUserButtons';
import { FormUserProvider } from './FormUserContext';
import { FormUserFields } from './FormUserFields';
import { FormUserFieldsPermissions } from './FormUserFieldsPermissions';
import { FormUserScrollArea } from './FormUserScrollArea';

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
        <FormUserScrollArea>
          <FormUserFields />
          <FormUserFieldsPermissions />
        </FormUserScrollArea>
        <FormUserButtons />
      </div>
    </FormUserProvider>
  );
};

export default FormUser;
