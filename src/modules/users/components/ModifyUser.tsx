import { Separator } from "@/components";

import { ErrorLoading, Loading } from "@/modules/core/components";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useGetUser } from "../hooks/useGetUser";
import { usePatchUser } from "../hooks/usePatchUser";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { formSchemaUser } from "../utils";
import { FormUser } from "./FormUser";

export const ModifyUser = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUser(id!);
  const { mutate, isSuccess, isPending } = usePatchUser();
  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof formSchemaUser>) => {
    const { password, ...rest } = values;
    mutate({ ...rest, password: password.password1, id });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <ErrorLoading />;
  }

  if (isSuccess) {
    navigate("../all");
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/users/all", name: "Usuarios" }]}
        finalItem={`Modificar`}
      />

      <Separator className="my-2" />

      <FormUser
        onSubmit={onSubmit}
        isPending={isPending}
        defaultValues={{
          ...data,
          password: {
            password1: "",
            password2: "",
          },
        }}
      />
    </>
  );
};
