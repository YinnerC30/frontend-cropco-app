import { Button } from '@/components';
import { useNavigate } from 'react-router-dom';
import { ToolTipTemplate } from './ToolTipTemplate';

interface Props {
  route: any;
  className: string;
  disabled?: boolean;
}

export const ButtonCreateRecord = ({
  route,
  className,
  disabled = false,
}: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <ToolTipTemplate content={'Crear'}>
        <Button
          className={`${className}`}
          onClick={() => navigate(route, { relative: 'route' })}
          disabled={disabled}
        >
          Crear
        </Button>
      </ToolTipTemplate>
    </>
  );
};
