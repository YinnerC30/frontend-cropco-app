import { z } from "zod";

export const formSchemaLogin = z.object({
  email: z
    .string({ required_error: "El correo electrónico es obligatorio" })
    .email("El correo electrónico no es valido")
    .max(100, {
      message: `El correo electrónico no debe superar los 100 caracteres`,
    }),

  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(1, "Debes ingresar la contraseña")
    .max(100, {
      message: `La contraseña debe tener máximo 100 caracteres`,
    }),
});
