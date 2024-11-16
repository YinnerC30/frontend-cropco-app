import { Pencil2Icon } from '@radix-ui/react-icons';
import { ActionNavigate } from './ActionNavigate';

interface Props {
  id: string;
  disabled?: boolean;
  path?: string;
}

export const ActionModifyRecord = ({
  id,
  disabled = false,
  path = `../update/one/${id}`,
}: Props) => {
  return (
    <ActionNavigate
      path={path}
      Icon={Pencil2Icon}
      name={'Modificar'}
      disabled={disabled}
    />
  );
};
