import { Link, Outlet } from "react-router-dom";

export const LandingPage = () => {
  return (
    <>
      <div className="text-green-700">Cropco LandingPage</div>
      <Link to={"app"}>App</Link>
      <Outlet />
    </>
  );
};

export default { LandingPage };
