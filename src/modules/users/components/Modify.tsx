import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  ScrollArea,
  Separator,
} from "@/components";

import {
  ButtonCancelRegister,
  ErrorLoading,
  Loading,
} from "@/modules/core/components";
import { EyeClosedIcon, EyeOpenIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useGetUser } from "../hooks/useGetUser";
import { usePatchUser } from "../hooks/usePatchUser";
import { useUserForm } from "../hooks/useUserForm";

import { formFields, formSchema } from "../utils";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";

export const ModifyUser = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUser(id!);
  const { mutate, isSuccess, isPending } = usePatchUser();
  const navigate = useNavigate();

  const { showPassword, togglePasswordVisibility, form } = useUserForm();

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="formUser"
            className="flex flex-col gap-2 ml-1"
          >
            <FormField
              control={form.control}
              name={`first_name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.first_name.label}</FormLabel>
                  <FormControl>
                    <Input
                      className="w-56"
                      placeholder={formFields.first_name.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {formFields.first_name.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"last_name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.last_name.label}</FormLabel>
                  <FormControl>
                    <Input
                      className="w-56"
                      placeholder={formFields.last_name.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {formFields.last_name.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.email.label}</FormLabel>
                  <FormControl>
                    <Input
                      className="w-56"
                      placeholder={formFields.email.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {formFields.email.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"cell_phone_number"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.cell_phone_number.label}</FormLabel>
                  <FormControl>
                    <Input
                      className="w-56"
                      placeholder={formFields.cell_phone_number.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {formFields.cell_phone_number.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`password.password1`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.password1.label}</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        className="w-56"
                        {...field}
                        type={showPassword ? "text" : "password"}
                      />
                    </FormControl>
                    <Button onClick={(e) => togglePasswordVisibility(e)}>
                      {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </Button>
                  </div>
                  <FormDescription>
                    {formFields.password1.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`password.password2`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.password2.label}</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        className="w-56"
                        {...field}
                        type={showPassword ? "text" : "password"}
                      />
                    </FormControl>
                    <Button onClick={(e) => togglePasswordVisibility(e)}>
                      {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </Button>
                  </div>
                  <FormDescription>
                    {formFields.password2.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <div className="flex w-48 gap-2 mt-2">
            <ButtonCancelRegister action={() => navigate(-1)} />
            <Button type="submit" form="formUser" disabled={isPending}>
              {isPending && (
                <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
              )}
              Actualizar
            </Button>
          </div>
        </Form>
      </ScrollArea>
    </>
  );
};
