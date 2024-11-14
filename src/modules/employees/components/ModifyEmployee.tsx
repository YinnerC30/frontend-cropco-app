import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import { ErrorLoading, Loading } from "../../core/components";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { useGetEmployee } from "../hooks/useGetEmployee";
import { usePatchEmployee } from "../hooks/usePatchEmployee";
import { formSchemaEmployee } from "../utils";
import { FormEmployee } from "./FormEmployee";

export const ModifyEmployee = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEmployee(id!);
  const { mutate, isSuccess, isPending } = usePatchEmployee();
  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof formSchemaEmployee>) => {
    mutate({ id, ...values });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <ErrorLoading />;
  }

  if (isSuccess) {
    navigate("../view/all");
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/employees/view/all", name: "Empleados" }]}
        finalItem={`Modificar`}
      />

      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormEmployee
          onSubmit={onSubmit}
          isSubmitting={isPending}
          defaultValues={{
            ...data,
          }}
        />
      </ScrollArea>
    </>
  );
};
