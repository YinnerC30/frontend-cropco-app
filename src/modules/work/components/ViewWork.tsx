import { useParams } from "react-router-dom";
import { useGetWork } from "../hooks/useGetWork";

import { ScrollArea, Separator } from "@/components";
import { ErrorLoading, Loading } from "@/modules/core/components";


import { BreadCrumb } from "@/modules/core/components/";
import { ConvertStringToDate } from "@/modules/core/helpers/conversion/ConvertStringToDate";
import { FormWork } from "./form/FormWork";

export const ViewWork = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetWork(id!);

  // Render loading or error states
  if (isLoading) return <Loading />;
  if (isError) return <ErrorLoading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: "/works/view/all", name: "Trabajos" }]}
        finalItem={`Información del trabajo`}
      />

      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormWork
          readOnly
          defaultValues={{ ...data, date: ConvertStringToDate(data?.date) }}
        />
      </ScrollArea>
    </>
  );
};
