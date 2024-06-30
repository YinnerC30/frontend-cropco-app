import {
  Button,
  Calendar,
  Command,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Popover,
  ScrollArea,
  Separator,
  Textarea,
} from "@/components";
import { cn } from "@/lib/utils";
import { ButtonCancelRegister, Loading } from "@/modules/core/components";
import {
  CalendarIcon,
  CaretSortIcon,
  CheckIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { usePostWork } from "../hooks/usePostUser";
import { useWorkForm } from "../hooks/useWorkForm";
import { formSchemaWork } from "../utils/formSchemaWork";

import { Crop } from "@/modules/crops/interfaces/Crop";
import { formFieldsWork } from "../utils/formFieldsWork";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CreateWorkDetail } from "./CreateWorkDetail";
import { DataTableWorkDetail } from "./DataTableWorkDetails";
import { columnsWorkDetailActions } from "./ColumnsTableWorkDetail";
import { ModifyWorkDetail } from "./ModifyWorkDetail";

export const CreateWork = () => {
  const navigate = useNavigate();

  const {
    formWork,
    queryCrops,
    details,
    total,
    isOpenDialogForm,
    setIsOpenDialogForm,
    isOpenDialogModifyForm,
    setIsOpenDialogModifyForm,
    workDetail,
    setWorkDetail,
  } = useWorkForm();

  const { mutate, isSuccess, isPending } = usePostWork();

  const onSubmit = async (values: z.infer<typeof formSchemaWork>) => {
    mutate({
      ...values,
      total,
      details: details.map(({ id, ...rest }) => ({
        ...rest,
        employee: { id: rest.employee.id },
      })),
    });
  };

  if (isSuccess) {
    navigate("../view");
  }

  if (queryCrops.isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Label className="text-2xl">Registro de trabajo</Label>
      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <Form {...formWork}>
          <form
            onSubmit={formWork.handleSubmit(onSubmit)}
            id="formWork"
            className="flex flex-col gap-2 ml-1"
          >
            <FormField
              control={formWork.control}
              name={"date"}
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="block">
                    {formFieldsWork.date.label}
                  </FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          ref={field.ref}
                          onBlur={field.onBlur}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: es })
                          ) : (
                            <span>{formFieldsWork.date.placeholder}</span>
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
                        disabled={(date: any) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    {formFieldsWork.date.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key={"crop.id"}
              control={formWork.control}
              name={"crop.id"}
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="block">
                    {formFieldsWork.crop.label}
                  </FormLabel>

                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                          ref={field.ref}
                          onBlur={field.onBlur}
                        >
                          {field.value
                            ? queryCrops.data.rows.find(
                                (item: Crop) => item.id === field.value
                              )?.name
                            : formFieldsWork.crop.placeholder}

                          <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Buscar cultivo..."
                          className="h-9"
                        />
                        <CommandList>
                          <ScrollArea className="w-auto h-56">
                            <CommandEmpty>Cultivo no encontrado.</CommandEmpty>
                            <CommandGroup>
                              {queryCrops.data.rows &&
                                Array.isArray(queryCrops.data.rows) &&
                                queryCrops.data.rows.map((crop: Crop | any) => {
                                  return (
                                    <CommandItem
                                      value={crop.name}
                                      key={crop.id!}
                                      onSelect={() => {
                                        formWork.setValue("crop.id", crop.id!);
                                        formWork.trigger("crop.id");
                                      }}
                                    >
                                      {crop.name}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          crop.id! === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  );
                                })}
                            </CommandGroup>
                          </ScrollArea>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    {formFieldsWork.crop.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formWork.control}
              name={"description"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFieldsWork.description.label}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={formFieldsWork.description.placeholder}
                      className="resize-none w-96"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {formFieldsWork.description.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <Separator className="w-full my-5" />
          <Label className="text-sm">
            A continuación registre de forma individual el trabajo que realizo
            cada empleado:
          </Label>

          <Button
            onClick={() => setIsOpenDialogForm(true)}
            className="block my-2 ml-1"
          >
            Agregar registro
          </Button>

          <CreateWorkDetail
            isOpenDialogForm={isOpenDialogForm}
            setIsOpenDialogForm={setIsOpenDialogForm}
          />

          <DataTableWorkDetail
            columns={columnsWorkDetailActions}
            data={details}
            setWorkDetail={setWorkDetail}
            setIsOpenDialogModifyForm={setIsOpenDialogModifyForm}
          />

          {isOpenDialogModifyForm && (
            <ModifyWorkDetail
              defaultValues={workDetail}
              isDialogOpen={isOpenDialogModifyForm}
              setDialogOpen={setIsOpenDialogModifyForm}
            />
          )}

          <div className="flex flex-col gap-4 ml-1 w-[300px] h-[120px] justify-center">
            <FormField
              control={formWork.control}
              name={"total"}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>{"Total cosechado:"}</FormLabel>

                  <FormControl>
                    <Input
                      disabled
                      readOnly
                      {...field}
                      className="w-40 text-center"
                      placeholder={"0"}
                      type="number"
                      min={0}
                      onChange={(e) => {
                        return !Number.isNaN(e.target.value)
                          ? field.onChange(parseFloat(e.target.value))
                          : 0;
                      }}
                      value={total}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-48 gap-2 mt-2">
            <Button type="submit" form="formWork" disabled={isPending}>
              {isPending && (
                <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
              )}
              Guardar
            </Button>
            <ButtonCancelRegister action={() => navigate(-1)} />
          </div>
        </Form>
      </ScrollArea>
    </>
  );
};
