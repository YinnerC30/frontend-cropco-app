import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ErrorLoading, Loading } from "@/modules/core/components";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useGetSale, usePatchSale } from "../hooks";
import { useSaleForm } from "../hooks/useSaleForm";
import { SaleDetail } from "../interfaces";
import { formSchemaSale } from "../utils";
import { add, calculateTotal, reset } from "../utils/saleSlice";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { ConvertStringToDate } from "@/modules/core/helpers/ConvertStringToDate";
import { FormSale } from "./forms/FormSale";

export const ModifySale = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading, isError } = useGetSale(id!);
  const { mutate, isPending, isSuccess } = usePatchSale(id!);
  const { quantity, total, details, formSale } = useSaleForm();
  const navigate = useNavigate();

  // Reset state on component mount
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  // Populate form and store details when data is available
  useEffect(() => {
    if (data && details.length === 0) {
      formSale.reset({
        ...data,
        date: new Date(`${data.date}T00:00:00-05:00`),
      });
      dispatch(add(data.details));
      dispatch(calculateTotal());
    }
  }, [data, details.length, formSale, dispatch]);

  // Handle form submission
  const onSubmitSale = (values: z.infer<typeof formSchemaSale>) => {
    if (details.length === 0) {
      toast.error("Debes registrar al menos 1 venta");
      return;
    }

    mutate({
      id,
      ...values,
      total,
      quantity,
      details: details.map(({ id, ...rest }: SaleDetail) => ({
        ...rest,
        client: { id: rest.client.id },
        crop: { id: rest.crop.id },
      })),
    });
  };

  // Navigate on successful mutation
  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("../all");
    }
  }, [isSuccess, dispatch, navigate]);

  // Render loading or error states
  if (isLoading) return <Loading />;
  if (isError) return <ErrorLoading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: "/sales/all", name: "Ventas" }]}
        finalItem={`Modificar`}
      />

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* Formulario principal */}
        <FormSale
          onSubmit={onSubmitSale}
          defaultValues={{
            ...data,
            date: ConvertStringToDate(data.date),
          }}
          isPending={isPending}
        />
      </ScrollArea>
    </>
  );
};
