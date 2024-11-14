import { z } from "zod";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

import { usePostClient } from "../hooks/usePostClient";

import { Separator } from "@/components/ui/separator";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { formSchemaClient } from "../utils";
import { FormClient } from "./FormClient";

export const CreateClient = () => {
  const navigate = useNavigate();

  const { mutate, isSuccess, isPending } = usePostClient();

  const onSubmit = async (values: z.infer<typeof formSchemaClient>) => {
    mutate(values);
  };

  if (isSuccess) {
    navigate("../view/all");
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/clients/view/all", name: "Clientes" }]}
        finalItem={`Registro`}
      />

      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormClient onSubmit={onSubmit} isSubmitting={isPending} />
      </ScrollArea>
    </>
  );
};
