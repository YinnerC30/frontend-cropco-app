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
            <NavLink to="harvest">Cosecha</NavLink>
          </li>
          <li>
            <a href="clients">Clientes</a>
          </li>
          <li>
            <NavLink to="crops">Cultivos</NavLink>
          </li>
          <li>
            <NavLink to="employees">Empleados</NavLink>
          </li>
          <li>
            <NavLink to="payments">Pagos</NavLink>
          </li>
          <li>
            <NavLink to="sales">Ventas</NavLink>
          </li>
          <li>
            <NavLink to="suppliers">Proveedores</NavLink>
          </li>
          <li>
            <NavLink to="supplies">Insumos</NavLink>
          </li>
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
