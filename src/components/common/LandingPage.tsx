import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <>
      <div className="text-green-700">Cropco LandingPage</div>
      <Link to={'/'}>Ir a landing</Link>
      <br />
      <Link to={'app'}>Ingresar a a la aplicación</Link>
      <br />
      <Link to={'app/authentication'}>Login</Link>
      <br />
      <Link to={'app/home'}>Home</Link>
    </>
  );
};

export default { LandingPage };
