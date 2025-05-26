import { PATH_LOGIN } from '@/config';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="shadow-sm ">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <Link to="/" className="text-2xl font-bold text-black-600">
          CropCo
        </Link>
        <nav>
          <Link
            className="px-4 py-2 font-bold bg-gray-200 border rounded-md text-black-300 hover:bg-gray-400"
            to={PATH_LOGIN}
          >
            Ingresar
          </Link>
        </nav>
      </div>
    </header>
  );
}
