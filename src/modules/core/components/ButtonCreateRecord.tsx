import { Button } from '@/components';
import { useNavigate } from 'react-router-dom';
import { ToolTipTemplate } from './ToolTipTemplate';

export const ButtonCreateRecord = ({ route, className }: any) => {
  const navigate = useNavigate();
  return (
    <>
      <ToolTipTemplate content={'Crear'}>
        <Button className={`${className}`} onClick={() => navigate(route)}>
          Crear
        </Button>
      </ToolTipTemplate>
    </>
  );
};
