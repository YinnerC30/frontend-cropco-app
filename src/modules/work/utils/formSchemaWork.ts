import { z } from "zod";
import { formSchemaWorkDetails } from "./formSchemaWorkDetails";

export const formSchemaWork = z.object({
  date: z.date({ required_error: "La fecha es un campo obligatorio" }),
  description: z
    .string({
      required_error: 'La descripción del trabajo es requerida',
    })
    .min(15, "La descripción debe tener al menos 15 caracteres")
    .max(100, {
      message: "La descripción no puede tener más de 100 caracteres.",
    }),

  crop: z.object({
    id: z
      .string({
        required_error: "El cultivo es un campo obligatorio",
      })
      .uuid({
        message: "La opción seleccionada no es valida.",
      }),
  }),
  value_pay: z
    .number({
      invalid_type_error: "Debes introducir un valor numérico",
    })
    .refine((value) => value % 50 === 0, {
      message: "El valor a pagar debe ser un número que termine en 50 o 00.",
    }),
  details: z
    .array(formSchemaWorkDetails, {
      required_error:
        "Debes registrar los trabajos que han hecho los empleados",
    })
    .nonempty({
      message: "Debes registrar el trabajo de al menos 1 empleado",
    }),
});
