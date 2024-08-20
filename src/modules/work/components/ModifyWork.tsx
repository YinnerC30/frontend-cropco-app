import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useGetWork } from "../hooks/useGetWork";
import { usePatchWork } from "../hooks/usePatchUser";
import { useWorkForm } from "../hooks/useWorkForm";
import { formSchemaWork } from "../utils/formSchemaWork";
import { add, calculateTotal, reset } from "../utils/workSlice";

import { ScrollArea, Separator } from "@/components";
import { ErrorLoading, Loading } from "@/modules/core/components";

import { format } from "date-fns";
import { es } from "date-fns/locale";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { WorkDetail } from "../interfaces/WorkDetail";
import { FormWork } from "./form/FormWork";
import { ConvertStringToDate } from "../../core/helpers/ConvertStringToDate";

export const ModifyWork = () => {
  // FIX: Error al cargar datos, no espera a que llegue la información y da undefined al ingresar a la data
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading, isError } = useGetWork(id!);
  const { mutate, isPending, isSuccess } = usePatchWork(id!);

  const navigate = useNavigate();

  // Handle form submission
  const onSubmitWork = (
    values: z.infer<typeof formSchemaWork>,
    total: number,
    details: WorkDetail[]
  ) => {
    mutate({
      ...values,
      id,
      total,
      details: details.map(({ id, ...rest }) => ({
        ...rest,
        employee: { id: rest.employee.id },
        id,
      })),
    });
  };

  if (isSuccess) {
    dispatch(reset());
    navigate("../all");
  }

  // Render loading or error states
  if (isLoading) return <Loading />;
  if (isError) return <ErrorLoading />;
  return (
    <>
      <BreadCrumb
        items={[{ link: "/works/all", name: "Trabajos" }]}
        finalItem={`${data?.crop.name!} | ${format(
          data?.date! + "T00:00:00-05:00",
          "PPP",
          {
            locale: es,
          }
        )}`}
      />

      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormWork
          defaultValues={{ ...data, date: ConvertStringToDate(data?.date) }}
          isPending={isPending}
          onSubmit={onSubmitWork}
        />
      </ScrollArea>
    </>
  );
};
