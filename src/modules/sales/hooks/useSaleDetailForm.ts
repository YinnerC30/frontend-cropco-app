import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { formSchemaSaleDetail } from "../utils/formSchemaSaleDetail";

import { useAppSelector } from "@/redux/store";
import { useGetAllClients } from "@/modules/clients/hooks/useGetAllClients";
import { useGetAllCrops } from "@/modules/crops/hooks/useGetAllCrops";

const defaultValuesSaleDetail = {
  client: {
    id: undefined,
    first_name: undefined,
  },
  crop: {
    id: undefined,
    name: undefined,
  },
  total: 0,
  quantity: 0,
};

export const useSaleDetailForm = () => {
  const details: any = useAppSelector((state: any) => state.sale.details);

  const { query: queryClients } = useGetAllClients("");
  const { query: queryCrops } = useGetAllCrops({
    searchParameter: "",
    allRecords: true,
  });

  const formSaleDetail = useCreateForm({
    schema: formSchemaSaleDetail,
    defaultValues: defaultValuesSaleDetail,
  });
  return {
    formSaleDetail,
    details,
    queryClients,
    queryCrops,
  };
};
