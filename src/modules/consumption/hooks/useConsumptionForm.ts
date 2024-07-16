import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useState } from "react";
import { formSchemaConsumption } from "../utils/formSchemaConsumption";
import { usePostConsumption } from "./usePostConsumption";

export const useConsumptionForm = () => {
  // TODO: Por implementar
  const formConsumption = useCreateForm({
    schema: formSchemaConsumption,
    defaultValues: { date: undefined },
  });

  const { details } = useAppSelector((state: RootState) => state.consumption);

  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const [isOpenDialogModifyForm, setIsOpenDialogModifyForm] = useState(false);

  const dispatch = useAppDispatch();

  const [consumptionDetail, setConsumptionDetail] = useState({});

  const { mutate, isSuccess, isPending } = usePostConsumption();
  return {
    formConsumption,
    details,
    isOpenDialogForm,
    setIsOpenDialogForm,
    isOpenDialogModifyForm,
    setIsOpenDialogModifyForm,
    dispatch,
    consumptionDetail,
    setConsumptionDetail,
    mutate,
    isSuccess,
    isPending,
  };
};
