import { z } from "zod";

export const formSchemaClient = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "El nombre debe tener al menos 2 caracteres",
    })
    .max(100, { message: `El nombre no debe exceder los 100 caracteres` }),
  last_name: z
    .string()
    .min(4, {
      message: "El apellido debe tener al menos 4 caracteres",
    })
    .max(100, { message: `El apellido no debe exceder los 100 caracteres` }),
  email: z
    .string({ required_error: `El correo electrónico es requerido` })
    .email("El correo electrónico es incorrecto")
    .max(100, {
      message: `El correo electrónico no debe superar los 100 caracteres`,
    }),
  cell_phone_number: z.string().refine(
    (data) => {
      return /^3\d{9}$/.test(data);
    },
    {
      message: "El número de teléfono es incorrecto.",
    }
  ),

  address: z
    .string()
    .min(6, {
      message: "La dirección debe tener mínimo 6 caracteres",
    })
    .max(200, { message: `La dirección debe tener máximo 200 caracteres` }),
});
