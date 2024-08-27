import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export async function renewToken(token: string): Promise<any> {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.authentication}/renew-token`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Aquí se añade el token en el encabezado
      },
    }
  );
  return data;
}
