import { FormProps } from '@/modules/core/interfaces';
import { FormCropButtons } from './FormCropButtons';
import { FormCropProvider } from './FormCropContext';
import { FormCropFields } from './FormCropFields';
import { FormCropScrollArea } from './FormCropScrollArea';

export const FormCrop = ({
  defaultValues,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: FormProps) => {
  return (
    <FormCropProvider
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <FormCropScrollArea>
          <FormCropFields />
        </FormCropScrollArea>
        <FormCropButtons />
      </div>
    </FormCropProvider>
  );
};

export default FormCrop;
