import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useAppSelector, RootState, useAppDispatch } from "@/redux/store";
import { useState } from "react";
import { formSchemaPurchase } from "../utils/formSchemaPurchase";
import { usePostPurchase } from "./usePostPurchase";

export const usePurchaseForm = () => {
  const formPurchase = useCreateForm({
    schema: formSchemaPurchase,
    defaultValues: { date: undefined, total: 0 },
  });

  const { details } = useAppSelector((state: RootState) => state.purchase);

  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const [isOpenDialogModifyForm, setIsOpenDialogModifyForm] = useState(false);

  const { total } = useAppSelector((state: RootState) => state.purchase);

  const dispatch = useAppDispatch();

  const [purchaseDetail, setPurchaseDetail] = useState({});

  const { mutate, isSuccess, isPending } = usePostPurchase();
  return {
    formPurchase,
    details,
    isOpenDialogForm,
    setIsOpenDialogForm,
    isOpenDialogModifyForm,
    setIsOpenDialogModifyForm,
    total,
    dispatch,
    purchaseDetail,
    setPurchaseDetail,
    mutate,
    isSuccess,
    isPending,
  };
};
