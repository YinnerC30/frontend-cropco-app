import { FormSupplyAlert } from './FormSupplyAlert';
import { FormSupplyButtons } from './FormSupplyButtons';
import { FormSupplyProvider } from './FormSupplyContext';
import { FormSupplyFields } from './FormSupplyFields';
import { FormSupplyScrollArea } from './FormSupplyScrollArea';

export const FormSupply = ({
  defaultValues,
  hiddenPassword = false,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: any) => {
  console.log(defaultValues);
  return (
    <FormSupplyProvider
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <FormSupplyScrollArea>
          <FormSupplyAlert />
          <FormSupplyFields />
        </FormSupplyScrollArea>
        <FormSupplyButtons />
      </div>
    </FormSupplyProvider>
  );
};

export default FormSupply;
