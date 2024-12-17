import { ScrollArea } from '@/components';
import { FormProps } from '@/modules/core/interfaces';
import { FormPaymentButtons } from './FormPaymentButtons';
import { FormPaymentProvider } from './FormPaymentContext';
import { FormPaymentFields } from './FormPaymentFields';

export const FormPayment = ({
  defaultValues,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: FormProps) => {
  return (
    <FormPaymentProvider
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <ScrollArea className={`h-[72vh] w-full pr-2`}>
          <FormPaymentFields />
        </ScrollArea>
        <FormPaymentButtons />
      </div>
    </FormPaymentProvider>
  );
};

export default FormPayment;
