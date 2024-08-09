import { Button, Form } from "@/components";
import { FormFieldCalendar } from "@/modules/core/components/form/FormFieldCalendar";
import { FormFieldCommand } from "@/modules/core/components/form/FormFieldCommand";
import { FormFieldSelect } from "@/modules/core/components/form/FormFieldSelect";
import { FormFieldSwitch } from "@/modules/core/components/form/FormFieldSwitch";
import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useGetAllCrops } from "@/modules/crops/hooks/useGetAllCrops";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { DateTimeSelection } from "../interfaces/DateTimeSelection";
import { formFieldsSearchBarHarvest } from "../utils/formFieldsSearchBarHarvest";
import { formSchemaSearchBarHarvest } from "../utils/formSchemaSearchBarHarvest";

interface Props {
  crop?: string;
  date?: string | any;
  time_date?: string | DateTimeSelection;
}

export const SearchBarHarvest = ({ crop, date, time_date }: Props) => {
  const navigate = useNavigate();
  const [openPopover, setOpenPopover] = useState(false);

  const { query: queryCrops } = useGetAllCrops({
    searchParameter: "",
    allRecords: true,
  });

  const form = useCreateForm({
    schema: formSchemaSearchBarHarvest,
    defaultValues: {
      crop: { id: crop },
      filter_by_date: !!date,
      date: !!date ? new Date(date) : undefined,
      date_time_selection: time_date || DateTimeSelection.after,
    },
  });

  useEffect(() => {
    form.setValue("crop.id", crop);
    form.setValue("date_time_selection", time_date);
    form.setValue("date", !!date ? new Date(date) : undefined);
    form.setValue("filter_by_date", !!date);
  }, []);

  const onSubmit = async (
    values: z.infer<typeof formSchemaSearchBarHarvest>
  ) => {
    console.log(values);
    toast.success("Se inició la búsqueda");

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
    navigate(`?${params.toString()}`);
  };

  const handleReset = () => {
    form.reset({
      crop: { id: undefined },
      date: undefined,
      date_time_selection: undefined,
    });
    navigate("../all/");
    toast.success("Se han limpiado los filtros");
  };

  const isFilterByDate = form.watch("filter_by_date");
  console.table(form.getValues());

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
        <div className="flex items-center justify-center gap-4">
          <Button type="submit" form="formSearch">
            Buscar
          </Button>
          <Button onClick={handleReset}>Borrar</Button>
        </div>
      </form>
    </Form>
  );
};
