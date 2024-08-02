import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import { ErrorLoading, Loading } from "../../core/components";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { useGetClient } from "../hooks/useGetClient";
import { FormClient } from "./FormClient";

export const ViewClient = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetClient(id!);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <ErrorLoading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/clients/all", name: "Clientes" }]}
        finalItem={`Información del cliente`}
      />

      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormClient defaultValues={{ ...data }} readOnly />
      </ScrollArea>
    </>
  );
};
