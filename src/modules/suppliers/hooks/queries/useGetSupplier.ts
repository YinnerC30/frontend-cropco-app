import { useQuery } from "@tanstack/react-query";

import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { useAuthContext } from "@/auth/hooks";
import { PromiseReturnRecord } from "@/auth/interfaces/PromiseReturnRecord";
import { UseGetOneRecordReturn } from "@/modules/core/interfaces/responses/UseGetOneRecordReturn";
import { useEffect } from "react";
import { toast } from "sonner";
import { Supplier } from "../../interfaces/Supplier";

export const getSupplierById = async (
  id: string
): PromiseReturnRecord<Supplier> => {
  return await cropcoAPI.get(`${pathsCropco.suppliers}/one/${id}`);
};

export const useGetSupplier = (id: string): UseGetOneRecordReturn<Supplier> => {
  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission("suppliers", "find_one_supplier");

  const query: UseGetOneRecordReturn<Supplier> = useQuery({
    queryKey: ["supplier", id],
    queryFn: () => getSupplierById(id),
    select: ({ data }) => ({ ...data, company_name: undefined }),
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        "Requieres del permiso de lectura para obtener la información del usuario solicitado"
      );
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        messagesStatusError: {},
      });
    }
  }, [query.isError, query.error]);
  return query;
};
