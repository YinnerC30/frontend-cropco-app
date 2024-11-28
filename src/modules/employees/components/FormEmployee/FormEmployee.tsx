import { FormEmployeeAlert } from './FormEmployeeAlert';
import { FormEmployeeButtons } from './FormEmployeeButtons';
import { FormEmployeeProvider } from './FormEmployeeContext';
import { FormEmployeeDetails } from './FormEmployeeDetails';
import { FormEmployeeScrollArea } from './FormEmployeeScrollArea';

export const FormEmployee = ({
  defaultValues,
  
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: any) => {
  console.log(defaultValues);
  return (
    <FormEmployeeProvider
      defaultValues={defaultValues}
      
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <FormEmployeeScrollArea>
          <FormEmployeeAlert />
          <FormEmployeeDetails />
        </FormEmployeeScrollArea>
        <FormEmployeeButtons />
      </div>
    </FormEmployeeProvider>
  );
};

export default FormEmployee;
