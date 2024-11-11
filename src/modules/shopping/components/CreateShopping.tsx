import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { useAppDispatch } from "@/redux/store";
import { usePostShopping } from "../hooks/usePostShopping";
import { ShoppingDetails } from "../interfaces/ShoppingDetails";
import { formSchemaShopping } from "../utils/formSchemaShopping";
import { reset } from "../utils/shoppingSlice";
import { FormShopping } from "./forms/FormShopping";

export const CreateShopping = () => {
  const dispatch = useAppDispatch();

  const { mutate, isSuccess, isPending } = usePostShopping();

  const onSubmitShopping = (
    values: z.infer<typeof formSchemaShopping>,
    details: ShoppingDetails[],
    total: number
  ) => {
    mutate({
      ...values,
      total,
      details: details.map((item: ShoppingDetails) => {
        const { id, ...rest } = item;
        return {
          ...rest,
          supplier: { id: rest.supplier.id },
          supply: { id: rest.supply.id },
        };
      }),
    });
  };

  const navigate = useNavigate();

  if (isSuccess) {
    dispatch(reset());
    navigate("../view/all");
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/shopping/view/all", name: "Compras" }]}
        finalItem={`Registro`}
      />
      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* Formulario principal */}
        <FormShopping onSubmit={onSubmitShopping} isPending={isPending} />
      </ScrollArea>
    </>
  );
};
