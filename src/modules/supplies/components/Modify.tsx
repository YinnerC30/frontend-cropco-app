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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  ButtonCancelRegister,
  ErrorLoading,
  Loading,
} from "@/modules/core/components";
import { UnitOfMeasure } from "@/modules/supplies/interfaces/UnitOfMeasure";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useGetSupply } from "../hooks/useGetSupply";
import { usePatchSupply } from "../hooks/usePatchSupply";
import { useSupplyForm } from "../hooks/useSupplyForm";
import { formFields, formSchema } from "../utils";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";

export const ModifySupply = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSupply(id!);
  const { mutate, isSuccess, isPending } = usePatchSupply();
  const navigate = useNavigate();

  const { form } = useSupplyForm();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ id, ...values });
  };

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        unit_of_measure:
          UnitOfMeasure[data.unit_of_measure as keyof typeof UnitOfMeasure],
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
        items={[{ link: "/supplies/view", name: "Insumos" }]}
        finalItem={`${data.name}`}
      />
      <Label className="text-2xl">Actualizar insumo</Label>
      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="formUser"
            className="flex flex-col gap-2 ml-1"
          >
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.name.label}</FormLabel>
                  <FormControl>
                    <Input
                      className="w-56"
                      placeholder={formFields.name.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {formFields.name.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"brand"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.brand.label}</FormLabel>
                  <FormControl>
                    <Input
                      className="w-56"
                      placeholder={formFields.brand.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {formFields.brand.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"unit_of_measure"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.unit_of_measure.label}</FormLabel>
                  <div className="w-40 ">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={formFields.unit_of_measure.placeholder}
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value={UnitOfMeasure.GRAMOS}>
                          GRAMOS
                        </SelectItem>
                        <SelectItem value={UnitOfMeasure.MILILITROS}>
                          MILILITROS
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <FormDescription>
                    {formFields.unit_of_measure.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`observation`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.observation.label}</FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder={formFields.observation.placeholder}
                      className="resize-none w-96"
                      rows={4}
                      {...field}
                    />
                  </FormControl>

                  <FormDescription>
                    {formFields.observation.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <div className="flex w-48 gap-2 mt-2">
            <Button type="submit" form="formUser" disabled={isPending}>
              {isPending && (
                <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
              )}
              Actualizar
            </Button>
            <ButtonCancelRegister action={() => navigate(-1)} />
          </div>
        </Form>
      </ScrollArea>
    </>
  );
};
