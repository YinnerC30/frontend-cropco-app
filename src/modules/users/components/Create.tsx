import { Label, ScrollArea, Separator } from "@/components";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { usePostUser } from "../hooks/usePostUser";
import { formSchema } from "../utils";
import { FormUser } from "./FormUser";

export const CreateUser = () => {
  const navigate = useNavigate();

  const { mutate, isSuccess, isPending } = usePostUser();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { password, ...rest } = values;
    mutate({ ...rest, password: password.password1 });
  };

  if (isSuccess) {
    navigate("../view");
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/users/view", name: "Usuarios" }]}
        finalItem={"Crear"}
      />
      <Label className="text-2xl">Registro de usuario</Label>
      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormUser onSubmit={onSubmit} isPending={isPending} />
      </ScrollArea>
    </>
  );
};
