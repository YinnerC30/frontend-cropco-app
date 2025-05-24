import { z } from "zod";
import { TypeFilterDate, TypeFilterNumber } from "../../interfaces";

export const schemaForDate = z
  .object({
    date: z.date().optional(),
    type_filter_date: z
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
  })
  .refine(
    ({ date }) => {
      if (!date) {
        return false;
      }
      return true;
    },
    {
      message: "Debes ingresar una fecha",
      path: ["date"],
    }
  )
  .refine(
    ({ type_filter_date }) => {
      if (!type_filter_date) {
        return false;
      }
      return true;
    },
    {
      message: "Debes seleccionar una opción",
      path: ["type_filter_date"],
    }
  );

export const schemaForAmount = z
  .object({
    amount: z.coerce.number().optional(),
    type_filter_amount: z
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
  })
  .refine(
    ({ amount }) => {
      if (amount === undefined) {
        return false;
      }
      return true;
    },
    {
      message: "Debes ingresar un valor",
      path: ["amount"],
    }
  )
  .refine(
    ({ type_filter_amount }) => {
      if (!type_filter_amount) {
        return false;
      }
      return true;
    },
    {
      message: "Debes seleccionar una opción",
      path: ["type_filter_amount"],
    }
  );

export const schemaForTotal = z
  .object({
    total: z.coerce.number().optional(),
    type_filter_total: z
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
  })
  .refine(
    ({ total }) => {
      if (total === undefined) {
        return false;
      }
      return true;
    },
    {
      message: "Debes ingresar un valor",
      path: ["total"],
    }
  )
  .refine(
    ({ type_filter_total }) => {
      if (!type_filter_total) {
        return false;
      }
      return true;
    },
    {
      message: "Debes seleccionar una opción",
      path: ["type_filter_total"],
    }
  );

export const schemaForValuePay = z
  .object({
    value_pay: z.coerce.number().optional(),
    type_filter_value_pay: z
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
  })
  .refine(
    ({ value_pay }) => {
      if (value_pay === undefined) {
        return false;
      }
      return true;
    },
    {
      message: "Debes ingresar un valor",
      path: ["value_pay"],
    }
  )
  .refine(
    ({ type_filter_value_pay }) => {
      if (!type_filter_value_pay) {
        return false;
      }
      return true;
    },
    {
      message: "Debes seleccionar una opción",
      path: ["type_filter_value_pay"],
    }
  );
