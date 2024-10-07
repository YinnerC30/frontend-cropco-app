import { ScrollArea, Separator } from "@/components";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { usePostUser } from "../hooks/usePostUser";
import { formSchemaUser } from "../utils";
import { FormUser } from "./FormUser";

export const CreateUser = () => {
  const navigate = useNavigate();

  const { mutate, isSuccess, isPending } = usePostUser();

  const onSubmit = async (values: z.infer<typeof formSchemaUser>) => {
    const { password, ...rest } = values;
    mutate({ ...rest, password: password.password1 });
  };

  isSuccess && navigate("../all");

  return (
    <>
      <BreadCrumb
        items={[{ link: "/users/all", name: "Usuarios" }]}
        finalItem={"Registro"}
      />
      <Separator className="my-2" />
      <FormUser onSubmit={onSubmit} isPending={isPending} />
    </>
  );
};
