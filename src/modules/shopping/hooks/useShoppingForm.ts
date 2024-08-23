import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useAppSelector, RootState, useAppDispatch } from "@/redux/store";
import { useState } from "react";
import { formSchemaShopping } from "../utils/formSchemaShopping";
import { usePostShopping } from "./usePostShopping";

export const useShoppingForm = () => {
  const formShopping = useCreateForm({
    schema: formSchemaShopping,
    defaultValues: { date: undefined, total: 0 },
  });

  const { details } = useAppSelector((state: RootState) => state.shopping);

  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const [isOpenDialogModifyForm, setIsOpenDialogModifyForm] = useState(false);

  const { total } = useAppSelector((state: RootState) => state.shopping);

  const dispatch = useAppDispatch();

  const [shoppingDetail, setShoppingDetail] = useState({});

  const { mutate, isSuccess, isPending } = usePostShopping();
  return {
    formShopping,
    details,
    isOpenDialogForm,
    setIsOpenDialogForm,
    isOpenDialogModifyForm,
    setIsOpenDialogModifyForm,
    total,
    dispatch,
    shoppingDetail,
    setShoppingDetail,
    mutate,
    isSuccess,
    isPending,
  };
};
