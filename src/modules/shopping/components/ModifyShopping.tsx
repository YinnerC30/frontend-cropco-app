import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ErrorLoading, Loading } from "@/modules/core/components";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import { reset } from "../utils/shoppingSlice";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { ConvertStringToDate } from "@/modules/core/helpers/ConvertStringToDate";
import { useAppDispatch } from "@/redux/store";
import { useGetShopping } from "../hooks/useGetShopping";
import { usePatchShopping } from "../hooks/usePatchShopping";
import { ShoppingDetails } from "../interfaces/ShoppingDetails";
import { formSchemaShopping } from "../utils/formSchemaShopping";
import { FormShopping } from "./forms/FormShopping";

export const ModifyShopping = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetShopping(id!);
  const { mutate, isSuccess, isPending } = usePatchShopping(id!);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSubmitShopping = (
    values: z.infer<typeof formSchemaShopping>,
    details: ShoppingDetails[],
    total: number
  ) => {
    mutate({
      id,
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

  if (isSuccess) {
    dispatch(reset());
    navigate("../view/all");
  }

  // Render loading or error states
  if (isLoading) return <Loading />;
  if (isError) return <ErrorLoading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: "/shopping/view/all", name: "Compras" }]}
        finalItem={`Modificar`}
      />
      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* Formulario principal */}
        <FormShopping
          onSubmit={onSubmitShopping}
          isPending={isPending}
          defaultValues={{ ...data, date: ConvertStringToDate(data.date) }}
        />
      </ScrollArea>
    </>
  );
};
