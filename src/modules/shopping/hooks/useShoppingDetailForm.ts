import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { formSchemaShoppingDetail } from "../utils/formSchemaShoppingDetail";
import { useGetAllSupplies } from "@/modules/supplies/hooks/useGetAllSupplies";
import { useGetAllSuppliers } from "@/modules/suppliers/hooks/queries/useGetAllSuppliers";
import { RootState, useAppSelector } from "@/redux/store";
import { useState } from "react";

export const useShoppingDetailForm = () => {
  const formShoppingDetail = useCreateForm({
    schema: formSchemaShoppingDetail,
    defaultValues: {
      supply: {
        id: undefined,
      },
      supplier: {
        id: undefined,
      },
      total: undefined,
      amount: undefined,
    },
  });

  const { query: querySupplies } = useGetAllSupplies({
    searchParameter: "",
    allRecords: true,
  });
  const { query: querySuppliers } = useGetAllSuppliers("");

  const { details } = useAppSelector((state: RootState) => state.shopping);

  const [openPopoverSupply, setOpenPopoverSupply] = useState(false);
  const [openPopoverSupplier, setOpenPopoverSupplier] = useState(false);
  return {
    formShoppingDetail,
    querySupplies,
    querySuppliers,
    details,
    openPopoverSupply,
    setOpenPopoverSupply,
    openPopoverSupplier,
    setOpenPopoverSupplier,
  };
};
