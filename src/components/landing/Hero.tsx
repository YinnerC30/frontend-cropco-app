import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-black-200">
      <div className="container px-4 mx-auto text-center">
        <h1 className="mb-6 text-4xl font-bold md:text-5xl text-slate-900">
          Administra tus cultivos con CropCo
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          La solución integral para gestionar la información de tus cultivos
          agrícolas de manera eficiente y efectiva.
        </p>
        <Link
          to={'/app/authentication/login'}
          className="px-8 py-3 text-lg text-black underline rounded-lg bg-black-600 hover:bg-black-700"
        >
          Comienza ahora
        </Link>
      </div>
    </section>
  );
}
