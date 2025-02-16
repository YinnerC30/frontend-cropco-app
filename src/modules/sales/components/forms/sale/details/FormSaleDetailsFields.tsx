import {
  Badge,
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from "@/components";
import { cn } from "@/lib/utils";
import { useGetAllClients } from "@/modules/clients/hooks";
import {
  FormFieldCheckBox,
  FormFieldCommand,
  FormFieldInput,
  Loading,
} from "@/modules/core/components";
import { useFormSaleContext } from "@/modules/sales/hooks";
import { formFieldsSaleDetail } from "@/modules/sales/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { CropStock } from "../FormSaleContext";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CapitalizeFirstWord } from "@/auth/helpers";

export const FormSaleDetailsFields: React.FC = () => {
  const {
    readOnly,
    saleDetail,
    formSaleDetail,
    queryCropsWithStock,
    cropStock,
    addCropStock,
  } = useFormSaleContext();

  const { query: queryClients } = useGetAllClients({
    queryValue: "",
    all_records: true,
  });

  const [openPopover, setOpenPopover] = useState(false);

  useEffect(() => {
    addCropStock({
      id: saleDetail.crop.id,
      name: saleDetail.crop?.name!,
      stock: saleDetail.quantity,
    });
    formSaleDetail.reset(saleDetail);
  }, [saleDetail]);

  return (
    <Form {...formSaleDetail}>
      <form className="z-50 mx-5" id="formSaleDetail">
        <FormFieldCommand
          data={queryClients?.data?.records || []}
          form={formSaleDetail}
          nameToShow={"first_name"}
          control={formSaleDetail.control}
          description={formFieldsSaleDetail.client.description}
          label={formFieldsSaleDetail.client.label}
          name={"client"}
          placeholder={formFieldsSaleDetail.client.placeholder}
          disabled={false}
          nameEntity="cliente"
          isLoading={queryClients.isLoading}
          className="w-52"
        />

        <FormField
          control={formSaleDetail.control}
          name={`crop.id`}
          render={({ field }: { field: ControllerRenderProps<any, any> }) => {
            return (
              <FormItem className="my-4">
                <FormLabel className="block">
                  {formFieldsSaleDetail.crop.label}
                </FormLabel>

                <Popover
                  open={openPopover}
                  onOpenChange={setOpenPopover}
                  modal={true}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      {queryCropsWithStock.isLoading ? (
                        <div className="w-[200px]">
                          <Loading className="" />
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openPopover}
                          className={`w-72 ${cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}`}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          disabled={readOnly}
                        >
                          {!!field.value
                            ? cropStock.find((item: CropStock) => {
                                return item.id === field.value;
                              })?.["name"]
                            : formFieldsSaleDetail.crop.placeholder}

                          <Badge
                            className={`${!field.value ? "hidden" : "ml-14"}`}
                            variant={"cyan"}
                          >
                            {"Disponibles: " +
                              cropStock.find((item: CropStock) => {
                                return item.id === field.value;
                              })?.["stock"] +
                              " Kg"}
                          </Badge>

                          <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                        </Button>
                      )}
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder={`Buscar ${"cultivo"}...`}
                        className="h-9"
                      />
                      <CommandList>
                        <ScrollArea className="w-auto h-56 p-1 pr-2">
                          <CommandEmpty>{`${CapitalizeFirstWord(
                            "cultivo"
                          )} no encontrado`}</CommandEmpty>
                          <CommandGroup>
                            {cropStock.map((item) => {
                              return (
                                <CommandItem
                                  disabled={item?.["stock"] === 0}
                                  value={item?.["name"]}
                                  key={item.id!}
                                  onSelect={() => {
                                    if (field?.value === item?.id) {
                                      formSaleDetail.setValue("crop", {
                                        id: "",
                                        ["name"]: "",
                                      });
                                    } else {
                                      formSaleDetail.setValue(
                                        "crop",
                                        {
                                          id: item?.id,
                                          ["name"]: item["name"],
                                        },
                                        {
                                          shouldValidate: true,
                                          shouldDirty: true,
                                        }
                                      );
                                    }
                                    setOpenPopover(false);
                                  }}
                                >
                                  <div className="flex justify-between w-full ">
                                    <span>{item?.["name"]}</span>
                                    <span className="font-bold">
                                      {item?.["stock"] + " Kg"}
                                    </span>
                                  </div>
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      item.id! === field?.value
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
                  {formFieldsSaleDetail.crop.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormFieldCheckBox
          control={formSaleDetail.control}
          description={formFieldsSaleDetail.is_receivable.description}
          label={formFieldsSaleDetail.is_receivable.label}
          name={"is_receivable"}
          placeholder={formFieldsSaleDetail.is_receivable.placeholder}
          disabled={false}
        />
        <FormFieldInput
          control={formSaleDetail.control}
          description={formFieldsSaleDetail.quantity.description}
          label={formFieldsSaleDetail.quantity.label}
          name={"quantity"}
          placeholder={formFieldsSaleDetail.quantity.placeholder}
          disabled={false}
          type="number"
          step={50}
        />
        <FormFieldInput
          control={formSaleDetail.control}
          description={formFieldsSaleDetail.total.description}
          label={formFieldsSaleDetail.total.label}
          name={"total"}
          placeholder={formFieldsSaleDetail.total.placeholder}
          disabled={false}
          type="number"
          step={50}
        />
      </form>
    </Form>
  );
};
