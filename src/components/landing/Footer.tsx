import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-8 bg-gray-100">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full mb-4 text-center md:w-auto md:text-left md:mb-0">
            <Link to="/" className="text-xl font-bold text-green-600">
              CropCo
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              © 2023 CropCo. Todos los derechos reservados.
            </p>
          </div>
          <nav className="w-full md:w-auto">
            <ul className="flex justify-center space-x-6 md:justify-end">
              <li>
                <Link to="#" className="text-gray-600 hover:text-green-600">
                  Acerca de
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-green-600">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-green-600">
                  Términos
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-green-600">
                  Privacidad
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
