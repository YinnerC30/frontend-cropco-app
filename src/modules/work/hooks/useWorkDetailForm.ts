import { useCreateForm } from "@/modules/core/hooks/useCreateForm";

import { useGetAllEmployees } from "@/modules/employees/hooks/useGetAllEmployees";
import { RootState, useAppSelector } from "@/redux/store";
import { formSchemaWorkDetails } from "../utils/formSchemaWorkDetails";
import { useState } from "react";

const defaultValuesWorkDetail = {
  employee: {
    id: "",
    first_name: "",
  },
  value_pay: undefined,
  payment_is_pending: true,
};

export const useWorkDetailForm = () => {
  const details: any = useAppSelector((state: RootState) => state.work.details);

  const { query: queryEmployees } = useGetAllEmployees({
    searchParameter: "",
    allRecords: true,
  });

  const [openPopoverCommand, setOpenPopoverCommand] = useState(false);

  const formWorkDetail = useCreateForm({
    schema: formSchemaWorkDetails,
    defaultValues: defaultValuesWorkDetail,
  });
  return {
    formWorkDetail,
    details,
    queryEmployees,
    openPopoverCommand,
    setOpenPopoverCommand,
  };
};
