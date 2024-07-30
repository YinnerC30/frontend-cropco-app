import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorLoading, Loading } from "../../core/components";
import { useGetSupplier } from "../hooks/useGetSupplier";
import { useSupplierForm } from "../hooks/useSupplierForm";
import { formFields } from "../utils/formFields";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";

export const ViewSupplier = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSupplier(id!);

  const navigate = useNavigate();

  const { form } = useSupplierForm();

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        password: "",
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
        items={[{ link: "/suppliers/view", name: "Proveedores" }]}
        finalItem={`${data.first_name} ${data.last_name}`}
      />
      <Label className="text-2xl">
        Información proveedor "{`${data.first_name} ${data.last_name}`}"
      </Label>
      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <Form {...form}>
          <form className="flex flex-col gap-2 ml-1">
            <FormField
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
            <FormField
              disabled
              control={form.control}
              name={"company_name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.company_name.label}</FormLabel>
                  <FormControl>
                    <Input
                      className="w-56"
                      placeholder={formFields.company_name.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {formFields.company_name.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <div className="flex w-48 gap-2 mt-2">
            <Button onClick={() => navigate(-1)}>Cancelar</Button>
          </div>
        </Form>
      </ScrollArea>
    </>
  );
};
