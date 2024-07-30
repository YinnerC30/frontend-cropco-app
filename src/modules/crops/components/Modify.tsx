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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ButtonCancelRegister,
  ErrorLoading,
  Loading,
} from "../../core/components";
import { useGetCrop } from "../hooks/useGetCrop";
import { usePatchCrop } from "../hooks/usePatchCrop";

import { Button, Calendar } from "@/components";
import { useCropForm } from "../hooks/useCropForm";
import { formFields, formSchema } from "../utils";
import { BreadCrumb } from "../../core/components/BreadCrumb";

export const ModifyCrop = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutate, isPending, isSuccess } = usePatchCrop();

  const { data, isLoading } = useGetCrop(id!);

  const { form } = useCropForm();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { dates, ...rest } = values;
    mutate({ ...rest, ...dates, id });
  };

  useEffect(() => {
    if (data) {
      const cropData = {
        ...data,
        dates: {
          date_of_creation: new Date(`${data.date_of_creation}T00:00:00-05:00`),
          date_of_termination: data.date_of_termination
            ? new Date(`${data.date_of_termination}T00:00:00-05:00`)
            : undefined,
        },
      };
      form.reset(cropData);
    }
  }, [data]);

  if (isLoading) return <Loading />;

  if (!data) return <ErrorLoading />;

  if (isSuccess) {
    navigate(`../view`);
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/crops/view", name: "Cultivos" }]}
        finalItem={data.name}
      />
      <Label className="text-2xl">Modificar cultivo</Label>
      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="formCrop"
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
              name={"description"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.description.label}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={formFields.description.placeholder}
                      className="resize-none w-96"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {formFields.description.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"units"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.units.label}</FormLabel>
                  <FormControl>
                    <Input
                      className="w-56"
                      placeholder={formFields.units.placeholder}
                      {...field}
                      type={"number"}
                      min={0}
                    />
                  </FormControl>

                  <FormDescription>
                    {formFields.units.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`location`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.location.label}</FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder={formFields.location.placeholder}
                      className="resize-none w-96"
                      rows={4}
                      {...field}
                    />
                  </FormControl>

                  <FormDescription>
                    {formFields.location.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`dates.date_of_creation`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.date_of_creation.label}</FormLabel>

                  <div className="block">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: es })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          locale={es}
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormDescription>
                    {formFields.date_of_creation.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`dates.date_of_termination`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.date_of_termination.label}</FormLabel>

                  <div className="block">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: es })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          locale={es}
                          mode="single"
                          selected={
                            !field.value ? new Date(field.value!) : undefined
                          }
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormDescription>
                    {formFields.date_of_termination.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <div className="flex w-48 gap-2 mt-2">
            <Button type="submit" form="formCrop" disabled={isPending}>
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
