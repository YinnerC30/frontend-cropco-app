import { UserTable } from './UserTable';
import { Link } from 'react-router-dom';

export const UsersModule = () => {
  return (
    <>
      <Link to="create">Crear usuario</Link>
      <UserTable />
    </>
  );
};

export default UsersModule;
