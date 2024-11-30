import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { AppDispatch, useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { BreadCrumb } from "@/modules/core/components/";
import { usePostHarvest } from "../hooks/mutations/usePostHarvest";
import { HarvestDetail } from "../interfaces/HarvestDetail";
import { formSchemaHarvest } from "../utils";
import { reset } from "../utils/harvestSlice";
import { FormHarvest } from "./forms/FormHarvest";

export const CreateHarvest = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { mutate, isSuccess, isPending } = usePostHarvest();

  useEffect(() => {
    dispatch(reset());
  }, []);

  const navigate = useNavigate();

  const onSubmitHarvest = (
    values: z.infer<typeof formSchemaHarvest>,
    details: HarvestDetail[],
    total: number,
    value_pay: number
  ) => {
    mutate({
      ...values,
      crop: { id: values.crop.id },
      total,
      value_pay,
      details: details.map((item: HarvestDetail) => {
        const {id, ...rest} = item;
        return { ...rest, employee: { id: rest.employee.id } };
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
        items={[{ link: "/harvests/view/all", name: "Cosechas" }]}
        finalItem={`Registro`}
      />

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* Formulario principal */}
        <FormHarvest onSubmit={onSubmitHarvest} isSubmitting={isPending} />
      </ScrollArea>
    </>
  );
};
