import { Outlet, Link } from "react-router-dom";

export const Layout = () => {
  console.log("Paso primero por el layout");

  return (
    <>
      <h1 className="text-blue-800">Layout</h1>
      <Link to={"authentication/login"}>Login</Link>
      <br />
      <Link to={"home"}>Home</Link>
      <Outlet />
    </>
  );
};
export default { Layout };
