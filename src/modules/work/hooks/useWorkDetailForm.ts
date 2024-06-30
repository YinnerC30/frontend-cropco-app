import { useCreateForm } from "@/modules/core/hooks/useCreateForm";

import { useGetAllEmployees } from "@/modules/employees/hooks/useGetAllEmployees";
import { RootState, useAppSelector } from "@/redux/store";
import { formSchemaWorkDetails } from "../utils/formSchemaWorkDetails";

const defaultValuesWorkDetail = {
  employee: {
    id: undefined,
    first_name: undefined,
  },
  value_pay: 0,
  payment_is_pending: false,
};

export const useWorkDetailForm = () => {
  const details: any = useAppSelector((state: RootState) => state.work.details);

  const { query: queryEmployees } = useGetAllEmployees({
    searchParameter: "",
    allRecords: true,
  });

  const formWorkDetail = useCreateForm({
    schema: formSchemaWorkDetails,
    defaultValues: defaultValuesWorkDetail,
  });
  return {
    formWorkDetail,
    details,
    queryEmployees,
  };
};
