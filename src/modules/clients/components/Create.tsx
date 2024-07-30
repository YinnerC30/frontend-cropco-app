import { z } from "zod";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

import { usePostClient } from "../hooks/usePostClient";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { ButtonsForm } from "@/modules/core/components/ButtonsForm";
import { useClientForm } from "../hooks/useClientForm";
import { formFields, formSchema } from "../utils";

export const CreateClient = () => {
  const navigate = useNavigate();

  const { form } = useClientForm();

  const { mutate, isSuccess, isPending } = usePostClient();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  if (isSuccess) {
    navigate("../all");
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/clientes/all", name: "Clientes" }]}
        finalItem={`Crear`}
      />
      <Label className="text-2xl">Registro de cliente</Label>
      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="formClient"
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
                      className="w-64"
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
              name={"address"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.address.label}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={formFields.address.placeholder}
                      className="resize-none w-96"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {formFields.address.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <ButtonsForm
            isPending={isPending}
            formId={"formClient"}
            className={"flex w-48 gap-2 mt-2"}
          />
        </Form>
      </ScrollArea>
    </>
  );
};
