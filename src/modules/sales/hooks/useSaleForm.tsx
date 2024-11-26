import { useGetAllClients } from "@/modules/clients/hooks/queries/useGetAllClients";
import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useGetAllCrops } from "@/modules/crops/hooks/useGetAllCrops";
import { formSchemaSale } from "../utils";
import { useState } from "react";
import { useAppSelector } from "@/redux/store";

export const defaultValuesSale = {
  date: undefined,
  quantity: 0,
  total: 0,
  is_receivable: false,
};

export const useSaleForm = () => {
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const [isOpenDialogModifyForm, setIsOpenDialogModifyForm] = useState(false);
  const [saleDetail, setSaleDetail] = useState({});
  const { query: queryClients } = useGetAllClients(""); //TODO: Obtener TODOS los clientes
  const { query: queryCrops } = useGetAllCrops({
    searchParameter: "",
    allRecords: true,
  }); //TODO: Obtener TODOS los clientes

  const formSale = useCreateForm({
    schema: formSchemaSale,
    defaultValues: defaultValuesSale,
  });

  const { details, total, quantity } = useAppSelector(
    (state: any) => state.sale
  );
  return {
    details,
    total,
    quantity,
    queryClients,
    queryCrops,
    formSale,
    isOpenDialogForm,
    setIsOpenDialogForm,
    isOpenDialogModifyForm,
    setIsOpenDialogModifyForm,
    saleDetail,
    setSaleDetail,
  };
};
