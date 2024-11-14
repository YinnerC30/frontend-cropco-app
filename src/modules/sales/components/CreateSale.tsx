import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AppDispatch, useAppDispatch } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { usePostSale } from "../hooks";
import { SaleDetail } from "../interfaces";
import { formSchemaSale } from "../utils";
import { reset } from "../utils/saleSlice";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { useEffect } from "react";
import { FormSale } from "./forms/FormSale";

export const CreateSale = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { mutate, isSuccess, isPending } = usePostSale();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reset());
  }, []);

  const onSubmitSale = (
    values: z.infer<typeof formSchemaSale>,
    details: SaleDetail[],
    total: number,
    quantity: number
  ) => {
    mutate({
      ...values,
      total,
      quantity,
      details: details.map((item: SaleDetail) => {
        const { id, ...rest } = item;
        return {
          ...rest,
          client: { id: rest.client.id },
          crop: { id: rest.crop.id },
        };
      }),
    });
  };

  if (isSuccess) {
    dispatch(reset());
    navigate("../view/all");
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/sales/view/all", name: "Ventas" }]}
        finalItem={`Registro`}
      />

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* Formulario principal */}

        <FormSale onSubmit={onSubmitSale} isSubmitting={isPending} />
      </ScrollArea>
    </>
  );
};
