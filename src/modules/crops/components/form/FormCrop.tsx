import { ScrollArea } from '@/components';
import { FormCropButtons } from './FormCropButtons';
import { FormCropProps, FormCropProvider } from './FormCropContext';
import { FormCropFields } from './FormCropFields';

export const FormCrop: React.FC<FormCropProps> = (props) => {
  return (
    <FormCropProvider {...props}>
      <div className="flex flex-col items-center">
        <ScrollArea className="h-[80vh] w-full pb-2">
          <FormCropFields />
        </ScrollArea>
        <FormCropButtons />
      </div>
    </FormCropProvider>
  );
};

export default FormCrop;
