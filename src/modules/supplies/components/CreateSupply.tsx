import { z } from "zod";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { BreadCrumb } from "@/modules/core/components/";
import { usePostSupply } from "../hooks/usePostSupply";
import { formSchemaSupply } from "../utils";
import { FormSupply } from "./FormSupply";

export const CreateSupply = () => {
  const navigate = useNavigate();

  const { mutate, isSuccess, isPending } = usePostSupply();

  const onSubmit = async (values: z.infer<typeof formSchemaSupply>) => {
    mutate(values);
  };

  if (isSuccess) {
    navigate("../view/all");
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/supplies/view/all", name: "Insumos" }]}
        finalItem={`Registro`}
      />
      <Label className="text-2xl">Registro de insumo</Label>
      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormSupply onSubmit={onSubmit} isSubmitting={isPending} />
      </ScrollArea>
    </>
  );
};
