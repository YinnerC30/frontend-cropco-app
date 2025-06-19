import { ScrollArea } from '@/components';
import { FormTenantButtons } from './FormTenantButtons';
import { FormTenantProps, FormTenantProvider } from './FormTenantContext';
import { FormTenantFields } from './FormTenantFields';

export const FormTenant: React.FC<FormTenantProps> = (props) => {
  return (
    <FormTenantProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2">
          <FormTenantFields />
        </ScrollArea>
        <FormTenantButtons />
      </div>
    </FormTenantProvider>
  );
};

export default FormTenant;
