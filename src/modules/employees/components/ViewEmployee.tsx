import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import { ErrorLoading, Loading } from "../../core/components";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { useGetEmployee } from "../hooks/useGetEmployee";
import { FormEmployee } from "./FormEmployee";

export const ViewEmployee = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEmployee(id!);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <ErrorLoading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/employees/all", name: "Empleados" }]}
        finalItem={`Información del empleado`}
      />

      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormEmployee
          defaultValues={{
            ...data,
          }}
          readOnly
        />
      </ScrollArea>
    </>
  );
};
