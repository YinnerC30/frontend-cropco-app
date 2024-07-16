import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { formSchemaPurchaseDetail } from "../utils/formSchemaPurchaseDetail";
import { useGetAllSupplies } from "@/modules/supplies/hooks/useGetAllSupplies";
import { useGetAllSuppliers } from "@/modules/suppliers/hooks/useGetAllSuppliers";
import { RootState, useAppSelector } from "@/redux/store";

export const usePurchaseDetailForm = () => {
  const formPurchaseDetail = useCreateForm({
    schema: formSchemaPurchaseDetail,
    defaultValues: {
      supply: {
        id: undefined,
      },
      supplier: {
        id: undefined,
      },
      total: 0,
      amount: 0,
    },
  });

  const { query: querySupplies } = useGetAllSupplies("");
  const { query: querySuppliers } = useGetAllSuppliers("");

  const { details } = useAppSelector((state: RootState) => state.purchase);
  return {
    formPurchaseDetail,
    querySupplies,
    querySuppliers,
    details,
  };
};
