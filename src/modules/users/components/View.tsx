import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useGetUser } from "../hooks/useGetUser";
import { ErrorLoading } from "@/modules/core/components/ErrorLoading";
import { Loading } from "@/modules/core/components/Loading";

import { Button, Input, Label, ScrollArea, Separator } from "@/components";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { formFields, formSchema } from "../utils";
import { defaultValues } from "../hooks/useUserForm";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { FormUser } from "./FormUser";

export const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, data } = useGetUser(id!);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
        items={[{ link: "/users/view", name: "Usuarios" }]}
        finalItem={`${data.first_name} ${data.last_name}`}
      />
      <Label className="text-2xl">
        Información del usuario(a) "{data.first_name + " " + data.last_name}"
      </Label>
      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[75vh] w-full  mb-10">
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
      </ScrollArea>
    </>
  );
};
