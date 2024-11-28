import { FormUserProps } from '../../interfaces/FormUserProps';
import { FormUserAlert } from './FormUserAlert';
import { FormUserButtons } from './FormUserButtons';
import { FormUserFields } from './FormUserFields';
import { FormUserFieldsPermissions } from './FormUserFieldsPermissions';
import { FormUserScrollArea } from './FormUserScrollArea';

import { FormUserProvider } from './FormUserContext';

export const FormUser = ({
  defaultValues,
  hiddenPassword = false,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
  showAlert = false,
}: FormUserProps) => {
  return (
    <FormUserProvider
      defaultValues={defaultValues}
      hiddenPassword={hiddenPassword}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
      showAlert={showAlert}
    >
      <div className="flex flex-col items-center">
        <FormUserScrollArea>
          <FormUserAlert />
          <FormUserFields />
          <FormUserFieldsPermissions />
        </FormUserScrollArea>
        <FormUserButtons />
      </div>
    </FormUserProvider>
  );
};

export default FormUser;
