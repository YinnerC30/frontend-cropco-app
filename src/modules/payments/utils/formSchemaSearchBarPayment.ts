import { z } from "zod";
import { DateTimeSelection } from "../../core/interfaces/General/DateTimeSelection";
import { MinorOrMajorSelection } from "../../core/interfaces/General/MinorOrMajorSelection";
import { MethodOfPayment } from "../interfaces/MethodOfPayment";

export const formSchemaSearchBarPayment = z.object({
  employee: z
    .object({
      id: z.string().optional(),
    })
    .optional(),
  filter_by_date: z.boolean().default(false).optional(),
  date: z.date().optional(),
  date_time_selection: z
    .nativeEnum(DateTimeSelection, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case "invalid_type":
            return { message: "Debe seleccionar una opción." };
          case "invalid_enum_value":
            return { message: "Debe seleccionar AFTER o BEFORE." };
          default:
            return { message: "Error en la selección de tiempo." };
        }
      },
    })
    .optional(),
  filter_by_total: z.boolean().default(false).optional(),
  total: z.coerce.number().optional(),
  minor_or_major_selection: z
    .nativeEnum(MinorOrMajorSelection, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case "invalid_type":
            return { message: "Debe seleccionar una opción." };
          case "invalid_enum_value":
            return { message: "Debe seleccionar MENOR o MAYOR." };
          default:
            return { message: "Error en la selección de tipo." };
        }
      },
    })
    .optional(),
  filter_by_method_of_payment: z.boolean().default(false).optional(),
  method_of_payment: z
    .nativeEnum(MethodOfPayment, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case "invalid_type":
            return { message: "Debe seleccionar una opción." };
          case "invalid_enum_value":
            return {
              message:
                "Debe seleccionar EFECTIVO , INTERCAMBIO o TRANSFERENCIA.",
            };
          default:
            return { message: "Error en la selección de tipo." };
        }
      },
    })
    .optional(),
});
