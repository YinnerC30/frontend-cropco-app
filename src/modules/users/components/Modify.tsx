import { Label, ScrollArea, Separator } from "@/components";

import { ErrorLoading, Loading } from "@/modules/core/components";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useGetUser } from "../hooks/useGetUser";
import { usePatchUser } from "../hooks/usePatchUser";
import { useUserForm } from "../hooks/useUserForm";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { formSchema } from "../utils";
import { FormUser } from "./FormUser";

export const ModifyUser = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUser(id!);
  const { mutate, isSuccess, isPending } = usePatchUser();
  const navigate = useNavigate();

  const { form } = useUserForm();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { password, ...rest } = values;
    mutate({ ...rest, password: password.password1, id });
  };

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        password: {
          password1: "",
          password2: "",
        },
      });
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <ErrorLoading />;
  }

  if (isSuccess) {
    navigate("../view");
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/users/view", name: "Usuarios" }]}
        finalItem={`${data.first_name} ${data.last_name}`}
      />
      <Label className="text-2xl">Modificar usuario</Label>
      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[75vh] w-full  mb-10">
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
      </ScrollArea>
    </>
  );
};
