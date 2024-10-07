import { ErrorLoading } from "@/modules/core/components/ErrorLoading";
import { Loading } from "@/modules/core/components/Loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useGetUser } from "../hooks/useGetUser";

import { ScrollArea, Separator } from "@/components";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { defaultValues } from "../hooks/useUserForm";
import { formSchemaUser } from "../utils";
import { FormUser } from "./FormUser";

export const ViewUser = () => {
  const { id } = useParams();

  const { isLoading, data } = useGetUser(id!);

  const form = useForm<z.infer<typeof formSchemaUser>>({
    resolver: zodResolver(formSchemaUser),
    defaultValues,
  });

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

  return (
    <>
      <BreadCrumb
        items={[{ link: "/users/all", name: "Usuarios" }]}
        finalItem={`Información del usuario`}
      />
      {/* <Label className="text-2xl">
        Información del usuario(a) "{data.first_name + " " + data.last_name}"
      </Label> */}
      <Separator className="my-2" />
      
        <FormUser
          onSubmit={undefined}
          isPending={false}
          defaultValues={{
            ...data,
            password: {
              password1: "",
              password2: "",
            },
          }}
          readOnly={true}
        />
      
    </>
  );
};
