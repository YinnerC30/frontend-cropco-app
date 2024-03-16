import { NavLink, Outlet } from 'react-router-dom';

export const Home = () => {
  return (
    <>
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
