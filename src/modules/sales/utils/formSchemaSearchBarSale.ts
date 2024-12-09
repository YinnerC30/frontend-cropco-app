import { TypeFilterDate } from "@/modules/core/interfaces/general/TypeFilterDate";
import { TypeFilterNumber } from "@/modules/core/interfaces/general/TypeFilterNumber";
import { YesORNotSelection } from "@/modules/core/interfaces/general/YesORNotSelection";
import { z } from "zod";

export const formSchemaSearchBarSale = z.object({
  crop: z
    .object({
      id: z.string().optional(),
    })
    .optional(),
  filter_by_date: z.boolean().default(false).optional(),
  date: z.date().optional(),
  date_time_selection: z
    .nativeEnum(TypeFilterDate, {
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
    .nativeEnum(TypeFilterNumber, {
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
  filter_by_quantity: z.boolean().default(false).optional(),
  quantity: z.coerce.number().optional(),
  minor_or_major_quantity_selection: z
    .nativeEnum(TypeFilterNumber, {
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
  filter_by_is_receivable: z.boolean().default(false).optional(),
  is_receivable: z
    .nativeEnum(YesORNotSelection, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case "invalid_type":
            return { message: "Debe seleccionar una opción." };
          case "invalid_enum_value":
            return { message: "Debe seleccionar SI o NO." };
          default:
            return { message: "Error en la selección de tipo." };
        }
      },
    })
    .optional(),
});
