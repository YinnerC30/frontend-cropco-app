import { Button } from '@/components';
import { ReloadIcon } from '@radix-ui/react-icons';
import { ButtonCancelRegister } from './ButtonCancelRegister';

interface Props {
  isPending: boolean;
  formId: string;
  className: string;
  actionToCancel: () => void;
}

export const ButtonsForm: React.FC<Props> = ({
  isPending = false,
  formId,
  className,
  actionToCancel,
}) => {
  return (
    <div className={className} data-testid="form-buttons">
      <ButtonCancelRegister action={actionToCancel} />
      <Button type="submit" form={formId} disabled={isPending} data-testid="form-submit-button">
        {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
        Guardar
      </Button>
    </div>
  );
};
