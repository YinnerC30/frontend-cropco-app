import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  defaultValuesHarvestDetail,
  formSchemaHarvestDetail,
} from "../utils/ElementsHarvestDetailForm";

export const useHarvestDetailForm = () => {
  const formHarvestDetail = useForm<z.infer<typeof formSchemaHarvestDetail>>({
    resolver: zodResolver(formSchemaHarvestDetail),
    defaultValues: defaultValuesHarvestDetail,
  });
  return {
    formHarvestDetail,
  };
};
