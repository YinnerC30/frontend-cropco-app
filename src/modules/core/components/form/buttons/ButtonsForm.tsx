import { Button } from '@/components';
import { ReloadIcon } from '@radix-ui/react-icons';
import { ButtonCancelRegister } from './ButtonCancelRegister';


interface Props {
  isPending: boolean;
  formId: string;
  className: string;
  actionToCancel?: any;
}

export const ButtonsForm = ({
  isPending,
  formId,
  className,
  actionToCancel,
}: Props) => {
  return (
    <div className={className}>
      <ButtonCancelRegister action={actionToCancel} />
      <Button type="submit" form={formId} disabled={isPending}>
        {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
        Guardar
      </Button>
    </div>
  );
};
