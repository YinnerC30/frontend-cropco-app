import { ScrollArea } from '@/components';
import { FormEmployeeButtons } from './FormEmployeeButtons';
import { FormEmployeeProps, FormEmployeeProvider } from './FormEmployeeContext';
import { FormEmployeeFields } from './FormEmployeeFields';
import { PropsWithChildren } from 'react';

interface Props extends FormEmployeeProps, PropsWithChildren {}

export const FormEmployee: React.FC<Props> = ({ children, ...props }) => {
  return (
    <FormEmployeeProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2 pr-6">
          <FormEmployeeFields />
          <div className="flex flex-col lg:justify-center">{children}</div>
        </ScrollArea>
        <FormEmployeeButtons />
      </div>
    </FormEmployeeProvider>
  );
};

export default FormEmployee;
