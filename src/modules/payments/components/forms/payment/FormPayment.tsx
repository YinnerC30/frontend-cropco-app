import { ScrollArea } from '@/components';
import { FormPaymentProps, FormPaymentProvider } from './FormPaymentContext';
import { FormPaymentButtons } from './FormPaymentButtons';
import { FormPaymentFields } from './FormPaymentFields';

export const FormPayment: React.FC<FormPaymentProps> = (
  props: FormPaymentProps
) => {
  return (
    <FormPaymentProvider {...props}>
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
