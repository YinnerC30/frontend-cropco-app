import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { formSchemaHarvestDetail } from "../utils/formSchemaHarvestDetail";
import { useGetAllEmployees } from "@/modules/employees/hooks/useGetAllEmployees";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";
import { HarvestDetail } from "../interfaces/HarvestDetail";

const defaultValuesHarvestDetail = {
  employee: {
    id: "",
    first_name: "",
  },
  total: undefined,
  value_pay: undefined,
};

export const useHarvestDetailForm = () => {
  const details: HarvestDetail[] = useAppSelector(
    (state: any) => state.harvest.details
  );

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
