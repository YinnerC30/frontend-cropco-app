import React, { createContext, useMemo } from "react";

import { useCreateForm } from "@/modules/core/hooks";
import { FormContextProps, FormProps } from "@/modules/core/interfaces";
import { Employee } from "../../interfaces/Employee";
import { formSchemaEmployee } from "../../utils";
import { z } from "zod";
import { toast } from "sonner";

// Definición de los valores por defecto a nivel de módulo
// El usuario deberá ajustar estos campos según la estructura de Employee/formSchemaEmployee
export const moduleDefaultValues: Partial<z.infer<typeof formSchemaEmployee>> =
  {
    first_name: "",
    last_name: "",
    email: "",
    cell_phone_number: "",
    address: "",
    // Asegúrate de que todos los campos de formSchemaEmployee estén aquí
    // con un valor inicial definido (ej. '', 0, false, [], etc.)
  };

export type FormEmployeeProps = FormProps<
  z.infer<typeof formSchemaEmployee>,
  Employee
>;

interface FormEmployeeContextProps extends FormContextProps {
  onSubmit: (values: z.infer<typeof formSchemaEmployee>) => void;
}

export const FormEmployeeContext = createContext<
  FormEmployeeContextProps | undefined
>(undefined);

export const FormEmployeeProvider: React.FC<
  FormEmployeeProps & {
    children: React.ReactNode;
  }
> = ({
  children,
  defaultValues: propsDefaultValues, // Renombrado para claridad
  isSubmitting = false,
  onSubmit = (values) => {},
  readOnly = false,
}) => {
  const combinedDefaultValues = useMemo(
    () => ({
      ...moduleDefaultValues, // Usar los defaultValues del módulo como base
      ...(propsDefaultValues || {}), // Sobrescribir con los de las props si existen
    }),
    [propsDefaultValues]
  );

  const form = useCreateForm({
    schema: formSchemaEmployee,
    defaultValues: combinedDefaultValues, // Usar los valores combinados
  });

  const handleOnSubmit = (values: z.infer<typeof formSchemaEmployee>) => {
    if (!form.formState.isDirty) {
      return toast.info("No se han realizado cambios");
    }
    onSubmit(values);
  };

  return (
    <FormEmployeeContext.Provider
      value={{
        form,
        isSubmitting,
        readOnly,
        onSubmit: handleOnSubmit,
      }}
    >
      {children}
    </FormEmployeeContext.Provider>
  );
};
