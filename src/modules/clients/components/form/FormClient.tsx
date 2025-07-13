import { ScrollArea } from '@/components';
import { FormClientButtons } from './FormClientButtons';
import { FormClientProps, FormClientProvider } from './FormClientContext';
import { FormClientFields } from './FormClientFields';
import { PropsWithChildren } from 'react';

interface Props extends FormClientProps, PropsWithChildren {}

export const FormClient: React.FC<Props> = ({ children, ...props }) => {
  return (
    <FormClientProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2 pr-6">
          <FormClientFields />
          <div className="flex flex-col lg:justify-center">{children}</div>
        </ScrollArea>
        <FormClientButtons />
      </div>
    </FormClientProvider>
  );
};

export default FormClient;
