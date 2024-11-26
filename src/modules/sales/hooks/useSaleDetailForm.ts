import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { formSchemaSaleDetail } from "../utils/formSchemaSaleDetail";

import { useGetAllClients } from "@/modules/clients/hooks/queries/useGetAllClients";
import { useGetAllHarvestsStock } from "@/modules/harvests/hooks/useGetAllHarvestsStock";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";

const defaultValuesSaleDetail = {
  client: {
    id: undefined,
    first_name: undefined,
  },
  crop: {
    id: undefined,
    name: undefined,
  },
  total: undefined,
  quantity: undefined,
};

export const useSaleDetailForm = () => {
  const details: any = useAppSelector((state: any) => state.sale.details);

  const { query: queryClients } = useGetAllClients("");
  const { query: queryHarvestStock } = useGetAllHarvestsStock("");

  const formSaleDetail = useCreateForm({
    schema: formSchemaSaleDetail,
    defaultValues: defaultValuesSaleDetail,
  });

  const [openPopoverHarvestStock, setOpenPopoverHarvestStock] = useState(false);
  const [openPopoverClient, setOpenPopoverClient] = useState(false);
  return {
    formSaleDetail,
    details,
    queryClients,
    queryHarvestStock,
    openPopoverClient,
    setOpenPopoverClient,
    openPopoverHarvestStock,
    setOpenPopoverHarvestStock,
  };
};
