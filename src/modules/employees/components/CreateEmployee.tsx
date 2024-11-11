import { z } from "zod";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

import { Separator } from "@/components/ui/separator";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { usePostEmployee } from "../hooks/usePostEmployee";
import { formSchemaEmployee } from "../utils";
import { FormEmployee } from "./FormEmployee";

export const CreateEmployee = () => {
  const navigate = useNavigate();

  const { mutate, isSuccess, isPending } = usePostEmployee();

  const onSubmit = async (values: z.infer<typeof formSchemaEmployee>) => {
    mutate(values);
  };

  if (isSuccess) {
    navigate("../view/all");
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/employees/view/all", name: "Empleados" }]}
        finalItem={`Registro`}
      />

      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormEmployee onSubmit={onSubmit} isPending={isPending} />
      </ScrollArea>
    </>
  );
};
