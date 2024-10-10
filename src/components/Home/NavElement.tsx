import { Route } from '@/routes/RoutesNavBar';
import { NavLink } from 'react-router-dom';

interface Props {
  route: Route;
  className: string;
}

export const NavElement = ({ route, className }: Props) => {
  const { label, Icon, path } = route;

  return (
    <div key={path} className={className}>
      <NavLink to={path} className={({ isActive }) => `flex gap-1 p-1 `}>
        <span>{Icon}</span>
        <span>{label}</span>
      </NavLink>
    </div>
  );
};
