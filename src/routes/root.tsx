import { Link, Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={`/home`}>Home</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  );
}
