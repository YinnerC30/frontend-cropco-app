import { Pencil2Icon } from '@radix-ui/react-icons';
import { ItemNavigate } from './ItemNavigate';

interface Props {
  id: string;
  disabled?: boolean;
  path?: string;
}

export const ItemModifyRecord = ({
  id,
  disabled = false,
  path = `../modify/${id}`,
}: Props) => {
  return (
    <ItemNavigate
      path={path}
      Icon={Pencil2Icon}
      name={'Modificar'}
      disabled={disabled}
    />
  );
};
