import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useGetAllCrops } from "@/modules/crops/hooks/useGetAllCrops";
import { useGetAllSuppliesStock } from "@/modules/supplies/hooks/useGetAllSuppliesStock";
import { RootState, useAppSelector } from "@/redux/store";
import { useState } from "react";
import { formSchemaConsumptionDetail } from "../utils/formSchemaConsumptionDetail";

export const useConsumptionDetailForm = () => {
  const formConsumptionDetails = useCreateForm({
    schema: formSchemaConsumptionDetail,
    defaultValues: {
      supply: {
        id: undefined,
      },
      crop: {
        id: undefined,
      },
      amount: undefined,
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

  const [openPopoverCrop, setOpenPopoverCrop] = useState(false);
  const [openPopoverSupply, setOpenPopoverSupply] = useState(false);

  const { details } = useAppSelector((state: RootState) => state.consumption);
  return {
    formConsumptionDetails,
    querySupplies,
    queryCrops,
    details,
    openPopoverCrop,
    setOpenPopoverCrop,
    openPopoverSupply,
    setOpenPopoverSupply,
  };
};
