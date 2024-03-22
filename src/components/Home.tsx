import { NavLink, Outlet } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';

export const Home = () => {
  return (
    <>
      <ModeToggle />
      <nav>
        <h1>CropcoApp</h1>

        <ul>
          <li>
            <NavLink to="users">Usuarios</NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
};
