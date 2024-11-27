import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ErrorLoading, Loading } from "@/modules/core/components";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useConsumptionForm } from "../hooks/useConsumptionForm";
import { useGetConsumption } from "../hooks/useGetConsumption";
import { usePatchConsumption } from "../hooks/usePatchConsumption";
import { ConsumptionDetails } from "../interfaces/ConsumptionDetails";
import { reset } from "../utils/consumptionSlice";

import { BreadCrumb } from "@/modules/core/components/";
import { ConvertStringToDate } from "@/modules/core/helpers/conversion/ConvertStringToDate";
import { formSchemaConsumption } from "../utils/formSchemaConsumption";
import { FormConsumption } from "./forms/FormConsumption";

export const ModifyConsumption = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetConsumption(id!);
  const { mutate, isSuccess, isPending } = usePatchConsumption(id!);
  const navigate = useNavigate();
  const { dispatch } = useConsumptionForm();

  useEffect(() => {
    dispatch(reset());
  }, []);

  const onSubmitShopping = (
    values: z.infer<typeof formSchemaConsumption>,
    details: ConsumptionDetails[]
  ) => {
    mutate({
      id,
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

  if (isSuccess) {
    dispatch(reset());
    navigate("../view/all");
  }

  if (isLoading) return <Loading />;
  if (isError) return <ErrorLoading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: "/consumption/view/all", name: "Consumos" }]}
        finalItem={`Modificar`}
      />

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* Formulario principal */}
        <FormConsumption
          onSubmit={onSubmitShopping}
          isSubmitting={isPending}
          defaultValues={{ ...data, date: ConvertStringToDate(data.date) }}
        />
      </ScrollArea>
    </>
  );
};
