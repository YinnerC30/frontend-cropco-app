import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { formSchemaHarvestDetail } from "../utils/formSchemaHarvestDetail";
import { useGetAllEmployees } from "@/modules/employees/hooks/useGetAllEmployees";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";

const defaultValuesHarvestDetail = {
  employee: {
    id: undefined,
    first_name: undefined,
  },
  total: 0,
  value_pay: 0,
};

export const useHarvestDetailForm = () => {
  const details: any = useAppSelector((state: any) => state.harvest.details);

  const { query: queryEmployees } = useGetAllEmployees({
    searchParameter: "",
    allRecords: true,
  });

  const formHarvestDetail = useCreateForm({
    schema: formSchemaHarvestDetail,
    defaultValues: defaultValuesHarvestDetail,
  });

  const [openPopoverEmployee, setOpenPopoverEmployee] = useState(false);
  return {
    formHarvestDetail,
    details,
    queryEmployees,
    openPopoverEmployee,
    setOpenPopoverEmployee,
  };
};
