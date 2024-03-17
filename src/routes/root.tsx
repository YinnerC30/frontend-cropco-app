import { Link } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={`/demo-table`}>Demo table</Link>
          </li>
          <li>
            <Link to={`/users`}>users</Link>
          </li>
          <li>
            <Link to={`/login`}>Iniciar sesión</Link>
          </li>
          <li>
            <Link to={`/home`}>Home</Link>
          </li>
          <li>
            <Link to={`/counter`}>Counter</Link>
          </li>
          <li>
            <Link to={`/pokemon`}>Pokemon</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
