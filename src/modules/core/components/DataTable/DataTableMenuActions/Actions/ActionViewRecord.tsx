import { EyeOpenIcon } from '@radix-ui/react-icons';
import { ActionNavigate } from './ActionNavigate';

interface Props {
  id: string;
  disabled?: boolean;
  path?: string;
}
export const ActionViewRecord = ({
  id,
  disabled = false,
  path = `../view/one/${id}`,
}: Props) => {
  return (
    <ActionNavigate
      path={path}
      Icon={EyeOpenIcon}
      name={'Ver'}
      disabled={disabled}
    />
  );
};
