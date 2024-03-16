import { useSelector } from 'react-redux';

export const UsersModule = () => {
  const users = useSelector((state: any) => state.users);
  console.log(users);
  return (
    <>
      <h2>Módulo de Usuarios</h2>
      <button>Crear</button>
      <button>Modificar</button>
      <button>Eliminar</button>
    </>
  );
};
