import { FormCropAlert } from './FormCropAlert';
import { FormCropButtons } from './FormCropButtons';
import { FormCropProvider } from './FormCropContext';
import { FormCropDetails } from './FormCropDetails';
import { FormCropScrollArea } from './FormCropScrollArea';

export const FormCrop = ({
  defaultValues,
  
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: any) => {
  console.log(defaultValues);
  return (
    <FormCropProvider
      defaultValues={defaultValues}
      
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <FormCropScrollArea>
          <FormCropAlert />
          <FormCropDetails />
        </FormCropScrollArea>
        <FormCropButtons />
      </div>
    </FormCropProvider>
  );
};

export default FormCrop;
