import { ScrollArea } from '@/components';
import { FormCropButtons } from './FormCropButtons';
import { FormCropProps, FormCropProvider } from './FormCropContext';
import { FormCropFields } from './FormCropFields';
import { PropsWithChildren } from 'react';

interface Props extends FormCropProps, PropsWithChildren {}

export const FormCrop: React.FC<Props> = ({ children, ...props }) => {
  return (
    <FormCropProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2 sm:pr-6">
          <FormCropFields />
          <div className="flex flex-col lg:justify-center">{children}</div>
        </ScrollArea>
        <FormCropButtons />
      </div>
    </FormCropProvider>
  );
};

export default FormCrop;
