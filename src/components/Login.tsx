export const Login = () => {
  return (
    <>
      <h1>Iniciar sesión</h1>
      <form noValidate>
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" name="email" id="" />
        <label htmlFor="password">Contraseña</label>
        <input type="text" name="password" />
        <button type="submit">Ingresar</button>
      </form>
    </>
  );
};
