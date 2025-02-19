import { PATH_LOGIN } from '@/config';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="shadow-sm ">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <Link to="/" className="text-2xl font-bold text-green-600">
          CropCo
        </Link>
        <nav>
          <Link
            className="px-4 py-2 font-bold text-green-600 border-2 border-green-600 rounded-md hover:border-green-600"
            to={PATH_LOGIN}
          >
            Ingresar
          </Link>
        </nav>
      </div>
    </header>
  );
}
