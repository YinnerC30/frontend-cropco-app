import { Pencil2Icon } from '@radix-ui/react-icons';
import { ItemNavigate } from './ItemNavigate';

interface Props {
  id: string;
  disabled?: boolean;
}

export const ItemModifyRecord = ({ id, disabled = false }: Props) => {
  return (
    <ItemNavigate
      path={`../modify/${id}`}
      Icon={Pencil2Icon}
      name={'Modificar'}
      disabled={disabled}
    />
  );
};
