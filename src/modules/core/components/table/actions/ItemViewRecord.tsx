import { EyeOpenIcon } from '@radix-ui/react-icons';
import { ItemNavigate } from './ItemNavigate';

interface Props {
  id: string;
  disabled?: boolean;
  path?: string;
}
export const ItemViewRecord = ({
  id,
  disabled = false,
  path = `../view/one/${id}`,
}: Props) => {
  return (
    <ItemNavigate
      path={path}
      Icon={EyeOpenIcon}
      name={'Ver'}
      disabled={disabled}
    />
  );
};
