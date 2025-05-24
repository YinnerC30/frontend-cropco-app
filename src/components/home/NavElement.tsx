import { useFormChange } from '@/modules/core/components/form/FormChangeContext';
import { useToastDiscardChanges } from '@/modules/core/hooks/useToastDiscardChanges';

import { Route } from '@/routes/components/RoutesNavBar';
import { NavLink, useNavigate } from 'react-router-dom';

interface Props {
  route: Route;
  className?: string;
  onClick?: React.Dispatch<React.SetStateAction<boolean>> | any;
}

export const NavElement = ({ route, className, onClick }: Props) => {
  const { label, Icon, path } = route;

  const { hasUnsavedChanges } = useFormChange();
  const { showToast } = useToastDiscardChanges();

  const navigate = useNavigate();

  const handleClick = (e: any) => {
    e.preventDefault(); // Evita la navegación automática de NavLink

    if (hasUnsavedChanges) {
      showToast({ route: path, skipRedirection: false }); // Muestra el mensaje de advertencia
    } else {
      navigate(path); // Navega manualmente si no hay cambios pendientes
    }
  };

  return (
    <div key={path} className={className} onClick={onClick}>
      <NavLink
        onClick={handleClick}
        to={path}
        className={({ isActive }) => `flex gap-1 p-1 ${isActive ? '' : ''}`}
      >
        <span>{Icon}</span>
        <span>{label}</span>
      </NavLink>
    </div>
  );
};
