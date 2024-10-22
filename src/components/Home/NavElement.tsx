import { Route } from '@/routes/RoutesNavBar';
import { NavLink } from 'react-router-dom';

interface Props {
  route: Route;
  className?: string;
  onClick?: React.Dispatch<React.SetStateAction<boolean>> | any;
}

export const NavElement = ({ route, className, onClick }: Props) => {
  const { label, Icon, path } = route;

  return (
    <div key={path} className={className} onClick={onClick}>
      <NavLink to={path} className={({ isActive }) => `flex gap-1 p-1 `}>
        <span>{Icon}</span>
        <span>{label}</span>
      </NavLink>
    </div>
  );
};
