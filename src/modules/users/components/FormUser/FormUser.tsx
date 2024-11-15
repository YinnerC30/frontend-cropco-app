// path: /components/FormUser.tsx

import { FormUserProps } from '../../interfaces/FormUserProps';
import { FormUserAlert } from './FormUserAlert';
import { FormUserButtons } from './FormUserButtons';
import { FormUserDetails } from './FormUserDetails';
import { FormUserPermissions } from './FormUserPermissions';
import { FormUserScrollArea } from './FormUserScrollArea';

import { FormUserProvider } from './FormUserContext';

export const FormUser = ({
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
          <FormUserAlert />
          <FormUserDetails />
          <FormUserPermissions />
        </FormUserScrollArea>
        <FormUserButtons />
      </div>
    </FormUserProvider>
  );
};

export default FormUser;
