import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { formSchemaHarvestDetail } from "../utils/formSchemaHarvestDetail";

const defaultValuesHarvestDetail = {
  employee: {
    id: undefined,
    first_name: undefined,
  },
  total: 0,
  value_pay: 0,
};

export const useHarvestDetailForm = () => {
  const formHarvestDetail = useCreateForm({
    schema: formSchemaHarvestDetail,
    defaultValues: defaultValuesHarvestDetail,
  });
  return {
    formHarvestDetail,
  };
};
