import { TypeFilterDate, TypeFilterNumber } from '@/modules/core/interfaces';
import { z } from 'zod';

export const schemaForDate = z.object({
  date: z.date().optional(),
  type_filter_date: z
    .nativeEnum(TypeFilterDate, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case 'invalid_type':
            return { message: 'Debe seleccionar una opción.' };
          case 'invalid_enum_value':
            return { message: 'Debe seleccionar AFTER o BEFORE.' };
          default:
            return { message: 'Error en la selección de tiempo.' };
        }
      },
    })
    .optional(),
});

export const schemaForTotal = z.object({
  total: z.coerce.number().optional(),
  type_filter_total: z
    .nativeEnum(TypeFilterNumber, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case 'invalid_type':
            return { message: 'Debe seleccionar una opción.' };
          case 'invalid_enum_value':
            return { message: 'Debe seleccionar MENOR o MAYOR.' };
          default:
            return { message: 'Error en la selección de tipo.' };
        }
      },
    })
    .optional(),
});

export const schemaForValuePay = z.object({
  value_pay: z.coerce.number().optional(),
  type_filter_value_pay: z
    .nativeEnum(TypeFilterNumber, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case 'invalid_type':
            return { message: 'Debe seleccionar una opción.' };
          case 'invalid_enum_value':
            return { message: 'Debe seleccionar MENOR o MAYOR.' };
          default:
            return { message: 'Error en la selección de tipo.' };
        }
      },
    })
    .optional(),
});

export const formSchemaSearchBarHarvest = z.object({
  crop: z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
    })
    .optional(),

  filter_by_date: schemaForDate
    .refine(
      ({ date }: any) => {
        if (!date) {
          return false;
        }
        return true;
      },
      {
        message: 'Debes ingresar una fecha',
        path: ['date'],
      }
    )
    .refine(
      ({ type_filter_date }: any) => {
        if (!type_filter_date) {
          return false;
        }
        return true;
      },
      {
        message: 'Debes seleccionar una opción',
        path: ['type_filter_date'],
      }
    ),

  filter_by_total: schemaForTotal
    .refine(
      ({ total }: any) => {
        if (total === undefined) {
          return false;
        }
        return true;
      },
      {
        message: 'Debes ingresar un valor',
        path: ['total'],
      }
    )
    .refine(
      ({ type_filter_total }: any) => {
        if (!type_filter_total) {
          return false;
        }
        return true;
      },
      {
        message: 'Debes seleccionar una opción',
        path: ['type_filter_total'],
      }
    ),

  filter_by_value_pay: schemaForValuePay
    .refine(
      ({ value_pay }: any) => {
        if (value_pay === undefined) {
          return false;
        }
        return true;
      },
      {
        message: 'Debes ingresar un valor',
        path: ['value_pay'],
      }
    )
    .refine(
      ({ type_filter_value_pay }: any) => {
        if (!type_filter_value_pay) {
          return false;
        }
        return true;
      },
      {
        message: 'Debes seleccionar una opción',
        path: ['type_filter_value_pay'],
      }
    ),
});
