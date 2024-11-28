import { FormClientAlert } from './FormClientAlert';
import { FormClientButtons } from './FormClientButtons';
import { FormClientProvider } from './FormClientContext';
import { FormClientDetails } from './FormClientDetails';
import { FormClientScrollArea } from './FormClientScrollArea';

export const FormClient = ({
  defaultValues,
  hiddenPassword = false,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: any) => {
  console.log(defaultValues);
  return (
    <FormClientProvider
      defaultValues={defaultValues}
      
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <FormClientScrollArea>
          <FormClientAlert />
          <FormClientDetails />
        </FormClientScrollArea>
        <FormClientButtons />
      </div>
    </FormClientProvider>
  );
};

export default FormClient;
