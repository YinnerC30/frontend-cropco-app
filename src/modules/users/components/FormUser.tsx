// path: /components/FormUser.tsx

import { FormUserProps } from '../interfaces/FormUserProps';
import {
  FormUserAlert,
  FormUserButtons,
  FormUserDetails,
  FormUserPermissions,
  FormUserScrollArea,
} from './FormUserComponents';
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
