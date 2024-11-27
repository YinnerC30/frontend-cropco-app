import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { AppDispatch, useAppDispatch } from "@/redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import { BreadCrumb } from "@/modules/core/components/";
import { ConvertStringToDate } from "@/modules/core/helpers/conversion/ConvertStringToDate";
import { ErrorLoading, Loading } from "../../core/components";
import { useGetHarvest } from "../hooks/useGetHarvest";
import { usePatchHarvest } from "../hooks/usePatchHarvest";
import { HarvestDetail } from "../interfaces/HarvestDetail";
import { formSchemaHarvest } from "../utils";
import { reset } from "../utils/harvestSlice";
import { FormHarvest } from "./forms/FormHarvest";

export const ModifyHarvest = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetHarvest(id!);
  const { mutate, isPending, isSuccess } = usePatchHarvest(id!);
  const navigate = useNavigate();

  const onSubmitHarvest = (
    values: z.infer<typeof formSchemaHarvest>,
    details: HarvestDetail[],
    total: number,
    value_pay: number
  ) => {
    mutate({
      id,
      ...values,
      crop: { id: values.crop.id },
      total,
      value_pay,
      details: details.map((item: HarvestDetail) => {
        const { id, payments_harvest, ...rest } = item;
        return { ...rest, employee: { id: rest.employee.id } };
      }),
    });
  };

  if (isSuccess) {
    dispatch(reset());
    navigate("../view/all");
  }

  if (isLoading) return <Loading />;

  if (isError) {
    return <ErrorLoading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/harvests/view/all", name: "Cosechas" }]}
        finalItem={`Modificar`}
      />

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* Formulario principal */}
        <FormHarvest
          onSubmit={onSubmitHarvest}
          isSubmitting={isPending}
          defaultValues={{
            ...data,
            date: ConvertStringToDate(data.date),
          }}
        />
      </ScrollArea>
    </>
  );
};
