import { Button, Form, Label, Separator } from "@/components";
import { FormFieldCalendar } from "@/modules/core/components/form/FormFieldCalendar";
import { FormFieldCommand } from "@/modules/core/components/form/FormFieldCommand";
import { FormFieldInput } from "@/modules/core/components/form/FormFieldInput";
import { FormFieldSelect } from "@/modules/core/components/form/FormFieldSelect";
import { FormFieldSwitch } from "@/modules/core/components/form/FormFieldSwitch";
import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { DateTimeSelection } from "@/modules/core/interfaces/General/DateTimeSelection";
import { MinorOrMajorSelection } from "@/modules/core/interfaces/General/MinorOrMajorSelection";
import { formSchemaSearchBarWork } from "../utils/formSchemaSearchBarWork";

import { useGetAllCropsWithWork } from "@/modules/crops/hooks/queries/useGetAllCropsWithWork";
import { formFieldsSearchBarWork } from "../utils/formFieldsSearchBarWork";

interface Props {
  crop?: string;
  date?: string | any;
  time_date?: string | DateTimeSelection;
  total?: number;
  type_total?: string | MinorOrMajorSelection;
}

const defaultValues = {
  crop: { id: undefined },
  filter_by_date: false,
  date: undefined,
  date_time_selection: undefined,
  filter_by_total: false,
  total: undefined,
  minor_or_major_selection: undefined,
};

export const SearchBarWork = ({
  crop,
  date,
  time_date,
  total,
  type_total,
}: Props) => {
  const navigate = useNavigate();
  const [openPopover, setOpenPopover] = useState(false);

  const { query: queryCrops } = useGetAllCropsWithWork({
    searchParameter: "",
    allRecords: true,
  });

  const form = useCreateForm({
    schema: formSchemaSearchBarWork,
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
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchemaSearchBarWork>) => {
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

    navigate(`?${params.toString()}`);
  };

  const handleReset = () => {
    form.reset(defaultValues);
    navigate("/works/view/all");
    toast.success("Se han limpiado los filtros");
  };

  const isFilterByDate = form.watch("filter_by_date");
  const isFilterByTotal = form.watch("filter_by_total");

  return (
    <Form {...form}>
      <Label className="text-lg">Barra de filtrado de registros:</Label>
      <form
        onSubmit={form.handleSubmit((e) => {
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
          description={""}
          label={formFieldsSearchBarWork.crop.label}
          name="crop.id"
          placeholder={formFieldsSearchBarWork.crop.placeholder}
          readOnly={false}
        />
        <div className="flex flex-col gap-5">
          <div className="p-3 border rounded-lg shadow-sm w-[320px]">
            <FormFieldSwitch
              control={form.control}
              description={""}
              label={formFieldsSearchBarWork.filter_by_date.label}
              name="filter_by_date"
              placeholder={formFieldsSearchBarWork.filter_by_date.placeholder}
              readOnly={false}
            />
            {isFilterByDate && (
              <div className="flex flex-col gap-5">
                <Separator className="mt-2" />
                <FormFieldSelect
                  items={[DateTimeSelection.after, DateTimeSelection.before]}
                  control={form.control}
                  description={
                    formFieldsSearchBarWork.date_time_selection.description
                  }
                  label={formFieldsSearchBarWork.date_time_selection.label}
                  name="date_time_selection"
                  placeholder={
                    formFieldsSearchBarWork.date_time_selection.placeholder
                  }
                  readOnly={false}
                />
                <FormFieldCalendar
                  control={form.control}
                  description={formFieldsSearchBarWork.date.description}
                  label={formFieldsSearchBarWork.date.label}
                  name="date"
                  placeholder={formFieldsSearchBarWork.date.placeholder}
                  readOnly={false}
                />
              </div>
            )}
          </div>

          <div className="p-3 border rounded-lg shadow-sm w-[320px]">
            <FormFieldSwitch
              control={form.control}
              description={""}
              label={formFieldsSearchBarWork.filter_by_total.label}
              name="filter_by_total"
              placeholder={formFieldsSearchBarWork.filter_by_total.placeholder}
              readOnly={false}
            />
            {isFilterByTotal && (
              <div className="flex flex-col gap-5">
                <Separator className="mt-2" />
                <FormFieldSelect
                  items={[
                    MinorOrMajorSelection.MINOR,
                    MinorOrMajorSelection.MAJOR,
                  ]}
                  control={form.control}
                  description={
                    formFieldsSearchBarWork.minor_or_major_selection.description
                  }
                  label={formFieldsSearchBarWork.minor_or_major_selection.label}
                  name="minor_or_major_selection"
                  placeholder={
                    formFieldsSearchBarWork.minor_or_major_selection.placeholder
                  }
                  readOnly={false}
                />
                <FormFieldInput
                  control={form.control}
                  description={formFieldsSearchBarWork.total.description}
                  label={formFieldsSearchBarWork.total.label}
                  name="total"
                  placeholder={formFieldsSearchBarWork.total.placeholder}
                  type="number"
                  readOnly={false}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
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
        </div>
      </form>
    </Form>
  );
};
