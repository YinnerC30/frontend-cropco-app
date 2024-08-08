import { z } from "zod";
import { formSchemaHarvestDetail } from "./formSchemaHarvestDetail";

export const formSchemaHarvest = z.object({
  date: z.date({ required_error: "La fecha es un campo obligatorio" }),
  crop: z.object({
    id: z
      .string({
        required_error: "El cultivo es un campo obligatorio",
      })
      .uuid({
        message: "La opción seleccionada no es valida.",
      }),
  }),
  total: z.number({
    invalid_type_error: "Debes introducir un valor numérico",
  }),
  value_pay: z
    .number({
      invalid_type_error: "Debes introducir un valor numérico",
    })
    .refine((value) => value % 50 === 0, {
      message: "El valor a pagar debe ser un número que termine en 50 o 00.",
    }),
  observation: z
    .string()
    .max(100, {
      message: "La observación no puede tener más de 100 caracteres.",
    })
    .optional(),
  details: z
    .array(formSchemaHarvestDetail, {
      required_error:
        "Debes registrar las cosechas que han hecho los empleados",
    })
    .nonempty({
      message: "Debes registrar la cosecha de al menos 1 empleado",
    }),
});
