import { ScrollArea } from '@/components';
import { FormTenantButtons } from './FormTenantButtons';
import { FormTenantProps, FormTenantProvider } from './FormTenantContext';
import { FormTenantFields } from './FormTenantFields';
import { cn } from '@/lib/utils';

interface FormTenantPropsExtend extends FormTenantProps {
  hiddenButtons?: boolean;
  children?: React.ReactNode;
}

export const FormTenant: React.FC<FormTenantPropsExtend> = ({
  hiddenButtons = false,
  children,
  ...props
}) => {
  return (
    <FormTenantProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2">
          <div className={cn('flex flex-col lg:flex-row', !!children ? 'justify-evenly' : '')}>
            <FormTenantFields />
            <div className="my-4 lg:my-0">{children}</div>
          </div>
        </ScrollArea>
        {!hiddenButtons && <FormTenantButtons />}
      </div>
    </FormTenantProvider>
  );
};

export default FormTenant;
