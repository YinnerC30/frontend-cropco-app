import { z } from "zod";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

import { Separator } from "@/components/ui/separator";
import { usePostSupplier } from "../hooks/usePostSupplier";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { formSchemaSupplier } from "../utils/formSchemaSupplier";
import { FormSupplier } from "./FormSupplier";

export const CreateSupplier = () => {
  const navigate = useNavigate();

  const { mutate, isSuccess, isPending } = usePostSupplier();

  const onSubmit = async (values: z.infer<typeof formSchemaSupplier>) => {
    mutate(values);
  };

  if (isSuccess) {
    navigate("../view/all");
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/suppliers/view/all", name: "Proveedores" }]}
        finalItem={`Registro`}
      />

      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormSupplier onSubmit={onSubmit} isPending={isPending} />
      </ScrollArea>
    </>
  );
};
