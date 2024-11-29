import { useContext } from "react";
import { FormSupplierContext } from "../../components/form";

export const useFormSupplierContext = () => {
  const context = useContext(FormSupplierContext);
  if (!context) {
    throw new Error(
      'useFormSupplierContext must be used within a FormSupplierProvider'
    );
  }
  return context;
};
