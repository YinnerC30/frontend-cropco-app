import { useContext } from "react";
import { FormSupplyContext } from "../../components";

export const useFormSupplyContext = () => {
  const context = useContext(FormSupplyContext);
  if (!context) {
    throw new Error(
      'useFormSupplyContext must be used within a FormSupplyProvider'
    );
  }
  return context;
};