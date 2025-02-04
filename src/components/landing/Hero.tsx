import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="py-20 bg-green-50 dark:bg-green-200">
      <div className="container px-4 mx-auto text-center">
        <h1 className="mb-6 text-4xl font-bold text-green-800 md:text-5xl">
          Administra tus cultivos con CropCo
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          La solución integral para gestionar la información de tus cultivos
          agrícolas de manera eficiente y efectiva.
        </p>
        <Link
          to={'/app/authentication/login'}
          className="px-8 py-3 text-lg text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          Comienza ahora
        </Link>
      </div>
    </section>
  );
}
