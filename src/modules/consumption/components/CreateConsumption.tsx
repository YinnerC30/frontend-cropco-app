import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useConsumptionForm } from "../hooks/useConsumptionForm";

import { reset } from "../utils/consumptionSlice";
import { formSchemaConsumption } from "../utils/formSchemaConsumption";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { useEffect } from "react";
import { ConsumptionDetails } from "../interfaces/ConsumptionDetails";
import { FormConsumption } from "./FormConsumption";

export const CreateConsumption = () => {
  const { mutate, dispatch, isSuccess, isPending } = useConsumptionForm();

  useEffect(() => {
    dispatch(reset());
  }, []);

  const onSubmitShopping = (
    values: z.infer<typeof formSchemaConsumption>,
    details: ConsumptionDetails[]
  ) => {
    mutate({
      ...values,
      details: details.map((item: ConsumptionDetails) => {
        const { id, ...rest } = item;
        return {
          ...rest,
          crop: { id: rest.crop.id },
          supply: { id: rest.supply.id },
        };
      }),
    });
  };

  const navigate = useNavigate();

  if (isSuccess) {
    dispatch(reset());
    navigate("../all");
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/consumption/all", name: "Consumos" }]}
        finalItem={`Crear`}
      />

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* Formulario principal */}
        <FormConsumption onSubmit={onSubmitShopping} isPending={isPending} />
      </ScrollArea>
    </>
  );
};
