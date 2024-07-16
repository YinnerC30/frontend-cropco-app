import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useGetAllCrops } from "@/modules/crops/hooks/useGetAllCrops";
import { useGetAllSuppliesStock } from "@/modules/supplies/hooks/useGetAllSuppliesStock";
import { RootState, useAppSelector } from "@/redux/store";
import { formSchemaConsumptionDetail } from "../utils/formSchemaConsumptionDetail";

export const useConsumptionDetailForm = () => {
  // TODO: Por implementar
  const formConsumptionDetails = useCreateForm({
    schema: formSchemaConsumptionDetail,
    defaultValues: {
      supply: {
        id: undefined,
      },
      crop: {
        id: undefined,
      },
      amount: 0,
    },
  });

  const { query: querySupplies } = useGetAllSuppliesStock({
    searchParameter: "",
    allRecords: true,
  });
  
  const { query: queryCrops } = useGetAllCrops({
    searchParameter: "",
    allRecords: true,
  });

  const { details } = useAppSelector((state: RootState) => state.purchase);
  return {
    formConsumptionDetails,
    querySupplies,
    queryCrops,
    details,
  };
};
