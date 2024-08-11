import { Button, Form } from "@/components";
import { FormFieldCalendar } from "@/modules/core/components/form/FormFieldCalendar";
import { FormFieldCommand } from "@/modules/core/components/form/FormFieldCommand";
import { FormFieldSelect } from "@/modules/core/components/form/FormFieldSelect";
import { FormFieldSwitch } from "@/modules/core/components/form/FormFieldSwitch";
import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useGetAllCropsWithHarvest } from "@/modules/crops/hooks/useGetAllCropsWithHarvest";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { DateTimeSelection } from "../interfaces/DateTimeSelection";
import { formFieldsSearchBarHarvest } from "../utils/formFieldsSearchBarHarvest";
import { formSchemaSearchBarHarvest } from "../utils/formSchemaSearchBarHarvest";
import { MinorOrMajorSelection } from "../interfaces/MinorOrMajorSelection";
import { FormFieldInput } from "@/modules/core/components/form/FormFieldInput";

interface Props {
  crop?: string;
  date?: string | any;
  time_date?: string | DateTimeSelection;
  total?: number;
  type_total?: string | MinorOrMajorSelection;
  value_pay?: number;
  type_value_pay?: string | MinorOrMajorSelection;
}

const defaultValues = {
  crop: { id: undefined },
  filter_by_date: false,
  date: undefined,
  date_time_selection: undefined,
  filter_by_total: false,
  total: undefined,
  minor_or_major_selection: undefined,
  filter_by_value_pay: false,
  value_pay: undefined,
  minor_or_major_value_pay_selection: undefined,
};

export const SearchBarHarvest = ({
  crop,
  date,
  time_date,
  total,
  type_total,
  value_pay,
  type_value_pay,
}: Props) => {
  const navigate = useNavigate();
  const [openPopover, setOpenPopover] = useState(false);

  const { query: queryCrops } = useGetAllCropsWithHarvest({
    searchParameter: "",
    allRecords: true,
  });

  const form = useCreateForm({
    schema: formSchemaSearchBarHarvest,
    defaultValues,
  });

  useEffect(() => {
    form.setValue("crop.id", crop);
    form.setValue("filter_by_date", !!date);
    form.setValue("date_time_selection", time_date);
    form.setValue("date", !!date ? new Date(date) : undefined);
    
    form.setValue("filter_by_total", !!total);
    form.setValue("minor_or_major_selection", type_total);
    form.setValue("total", total);
    
    form.setValue("filter_by_value_pay", !!value_pay);
    form.setValue("minor_or_major_value_pay_selection", type_value_pay);
    form.setValue("value_pay", value_pay);
  }, []);

  const onSubmit = async (
    values: z.infer<typeof formSchemaSearchBarHarvest>
  ) => {
    // toast.success("Entro al submit");
    console.log(values);
    const params = new URLSearchParams();
    if (values.crop?.id) {
      params.append("crop", values.crop.id);
    }
    if (values.filter_by_date && values.date) {
      const dateParam =
        values.date_time_selection === DateTimeSelection.after
          ? "after_date"
          : "before_date";
      params.append(dateParam, values.date.toISOString());
    }

    if (values.filter_by_total && values.total) {
      const totalParam =
        values.minor_or_major_selection === MinorOrMajorSelection.MINOR
          ? "minor_total"
          : "major_total";
      params.append(totalParam, values.total.toString());
    }

    if (values.filter_by_value_pay && values.value_pay) {
      const valuePayParam =
        values.minor_or_major_value_pay_selection === MinorOrMajorSelection.MINOR
          ? "minor_value_pay"
          : "major_value_pay";
      params.append(valuePayParam, values.value_pay.toString());
    }
    navigate(`?${params.toString()}`);
  };

  const handleReset = () => {
    form.reset(defaultValues);
    navigate("/harvests/all");
    toast.success("Se han limpiado los filtros");
  };

  const isFilterByDate = form.watch("filter_by_date");
  const isFilterByTotal = form.watch("filter_by_total");
  const isFilterByValuePay = form.watch("filter_by_value_pay");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((e) => {
          console.log(e);
          onSubmit(e);
        })}
        id="formSearch"
        className="flex flex-col gap-3 ml-2"
      >
        <FormFieldCommand
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
          data={queryCrops?.data?.rows || []}
          form={form}
          nameToShow="name"
          control={form.control}
          description={formFieldsSearchBarHarvest.crop.description}
          label={formFieldsSearchBarHarvest.crop.label}
          name="crop.id"
          placeholder={formFieldsSearchBarHarvest.crop.placeholder}
          readOnly={false}
        />
        <FormFieldSwitch
          control={form.control}
          description={formFieldsSearchBarHarvest.filter_by_date.description}
          label={formFieldsSearchBarHarvest.filter_by_date.label}
          name="filter_by_date"
          placeholder={formFieldsSearchBarHarvest.filter_by_date.placeholder}
          readOnly={false}
        />
        {isFilterByDate && (
          <>
            <FormFieldSelect
              items={[DateTimeSelection.after, DateTimeSelection.before]}
              control={form.control}
              description={
                formFieldsSearchBarHarvest.date_time_selection.description
              }
              label={formFieldsSearchBarHarvest.date_time_selection.label}
              name="date_time_selection"
              placeholder={
                formFieldsSearchBarHarvest.date_time_selection.placeholder
              }
              readOnly={false}
            />
            <FormFieldCalendar
              control={form.control}
              description={formFieldsSearchBarHarvest.date.description}
              label={formFieldsSearchBarHarvest.date.label}
              name="date"
              placeholder={formFieldsSearchBarHarvest.date.placeholder}
              readOnly={false}
            />
          </>
        )}
        <FormFieldSwitch
          control={form.control}
          description={formFieldsSearchBarHarvest.filter_by_total.description}
          label={formFieldsSearchBarHarvest.filter_by_total.label}
          name="filter_by_total"
          placeholder={formFieldsSearchBarHarvest.filter_by_total.placeholder}
          readOnly={false}
        />
        {isFilterByTotal && (
          <>
            <FormFieldSelect
              items={[MinorOrMajorSelection.MINOR, MinorOrMajorSelection.MAJOR]}
              control={form.control}
              description={
                formFieldsSearchBarHarvest.minor_or_major_selection.description
              }
              label={formFieldsSearchBarHarvest.minor_or_major_selection.label}
              name="minor_or_major_selection"
              placeholder={
                formFieldsSearchBarHarvest.minor_or_major_selection.placeholder
              }
              readOnly={false}
            />
            <FormFieldInput
              control={form.control}
              description={formFieldsSearchBarHarvest.total.description}
              label={formFieldsSearchBarHarvest.total.label}
              name="total"
              placeholder={formFieldsSearchBarHarvest.total.placeholder}
              type="number"
              readOnly={false}
            />
          </>
        )}

        <FormFieldSwitch
          control={form.control}
          description={
            formFieldsSearchBarHarvest.filter_by_value_pay.description
          }
          label={formFieldsSearchBarHarvest.filter_by_value_pay.label}
          name="filter_by_value_pay"
          placeholder={
            formFieldsSearchBarHarvest.filter_by_value_pay.placeholder
          }
          readOnly={false}
        />
        {isFilterByValuePay && (
          <>
            <FormFieldSelect
              items={[MinorOrMajorSelection.MINOR, MinorOrMajorSelection.MAJOR]}
              control={form.control}
              description={
                formFieldsSearchBarHarvest.minor_or_major_value_pay_selection
                  .description
              }
              label={
                formFieldsSearchBarHarvest.minor_or_major_value_pay_selection
                  .label
              }
              name="minor_or_major_value_pay_selection"
              placeholder={
                formFieldsSearchBarHarvest.minor_or_major_value_pay_selection
                  .placeholder
              }
              readOnly={false}
            />
            <FormFieldInput
              control={form.control}
              description={formFieldsSearchBarHarvest.value_pay.description}
              label={formFieldsSearchBarHarvest.value_pay.label}
              name="value_pay"
              placeholder={formFieldsSearchBarHarvest.value_pay.placeholder}
              type="number"
              readOnly={false}
            />
          </>
        )}
        <div className="flex items-center justify-center gap-4">
          <Button type="submit" form="formSearch">
            Buscar
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleReset();
            }}
          >
            Borrar
          </Button>
        </div>
      </form>
    </Form>
  );
};
