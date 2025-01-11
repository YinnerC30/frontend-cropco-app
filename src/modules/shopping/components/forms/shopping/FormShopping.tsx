import { ScrollArea } from '@/components';
import { FormShoppingButtons } from './FormShoppingButtons';
import { FormShoppingProps, FormShoppingProvider } from './FormShoppingContext';
import { FormShoppingFields } from './FormShoppingFields';

export const FormShopping: React.FC<FormShoppingProps> = (
  props: FormShoppingProps
) => {
  return (
    <FormShoppingProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2">
          <FormShoppingFields />
        </ScrollArea>
        <FormShoppingButtons />
      </div>
    </FormShoppingProvider>
  );
};

export default FormShopping;
