import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useGetAllCrops } from "@/modules/crops/hooks/useGetAllCrops";
import { formSchemaWork } from "../utils/formSchemaWork";
import { RootState, useAppSelector } from "@/redux/store";
import { useState } from "react";

const defaultValues = {
  date: undefined,
  description: "",
  crop: undefined,
  total: 0,
};

export const useWorkForm = () => {
  const { query: queryCrops } = useGetAllCrops({
    searchParameter: "",
    allRecords: true,
  });

  const formWork = useCreateForm({ schema: formSchemaWork, defaultValues });

  const { details, total } = useAppSelector((state: RootState) => state.work);

  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const [isOpenDialogModifyForm, setIsOpenDialogModifyForm] = useState(false);
  const [workDetail, setWorkDetail] = useState({});

  return {
    // Queries
    queryCrops,
    // Form
    formWork,
    // State
    details,
    total,
    // FormState
    isOpenDialogForm,
    setIsOpenDialogForm,
    isOpenDialogModifyForm,
    setIsOpenDialogModifyForm,
    workDetail,
    setWorkDetail,
  };
};
