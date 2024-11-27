import { Button, Form, Label, Separator } from "@/components";
import { FormFieldCalendar } from "@/modules/core/components/form/FormFieldCalendar";
import { FormFieldInput } from "@/modules/core/components/form/FormFieldInput";
import { FormFieldSelect } from "@/modules/core/components/form/FormFieldSelect";
import { FormFieldSwitch } from "@/modules/core/components/form/FormFieldSwitch";
import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { DateTimeSelection } from "@/modules/core/interfaces/general/DateTimeSelection";
import { MinorOrMajorSelection } from "@/modules/core/interfaces/general/MinorOrMajorSelection";

import { formFieldsSearchBarShopping } from "../utils/formFieldsSearchBarShopping";
import { formSchemaSearchBarShopping } from "../utils/formSchemaSearchBarShopping";

interface Props {
  date?: string | any;
  time_date?: string | DateTimeSelection;
  total?: number;
  type_total?: string | MinorOrMajorSelection;
}

const defaultValues = {
  filter_by_date: false,
  date: undefined,
  date_time_selection: undefined,
  filter_by_total: false,
  total: undefined,
  minor_or_major_selection: undefined,
};

export const SearchBarShopping = ({
  date,
  time_date,
  total,
  type_total,
}: Props) => {
  const navigate = useNavigate();

  const form = useCreateForm({
    schema: formSchemaSearchBarShopping,
    defaultValues,
  });

  useEffect(() => {
    form.setValue("filter_by_date", !!date);
    form.setValue("date_time_selection", time_date);
    form.setValue("date", !!date ? new Date(date) : undefined);

    form.setValue("filter_by_total", !!total);
    form.setValue("minor_or_major_selection", type_total);
    form.setValue("total", total);
  }, []);

  const onSubmit = async (
    values: z.infer<typeof formSchemaSearchBarShopping>
  ) => {
    const params = new URLSearchParams();

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
    navigate("/shopping/view/all");
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
        <div className="flex flex-col gap-5">
          <div className="p-3 border rounded-lg shadow-sm w-[320px]">
            <FormFieldSwitch
              control={form.control}
              description={""}
              label={formFieldsSearchBarShopping.filter_by_date.label}
              name="filter_by_date"
              placeholder={
                formFieldsSearchBarShopping.filter_by_date.placeholder
              }
              readOnly={false}
            />
            {isFilterByDate && (
              <div className="flex flex-col gap-5">
                <Separator className="mt-2" />
                <FormFieldSelect
                  items={[DateTimeSelection.after, DateTimeSelection.before]}
                  control={form.control}
                  description={
                    formFieldsSearchBarShopping.date_time_selection.description
                  }
                  label={formFieldsSearchBarShopping.date_time_selection.label}
                  name="date_time_selection"
                  placeholder={
                    formFieldsSearchBarShopping.date_time_selection.placeholder
                  }
                  readOnly={false}
                />
                <FormFieldCalendar
                  control={form.control}
                  description={formFieldsSearchBarShopping.date.description}
                  label={formFieldsSearchBarShopping.date.label}
                  name="date"
                  placeholder={formFieldsSearchBarShopping.date.placeholder}
                  readOnly={false}
                />
              </div>
            )}
          </div>

          <div className="p-3 border rounded-lg shadow-sm w-[320px]">
            <FormFieldSwitch
              control={form.control}
              description={""}
              label={formFieldsSearchBarShopping.filter_by_total.label}
              name="filter_by_total"
              placeholder={
                formFieldsSearchBarShopping.filter_by_total.placeholder
              }
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
                    formFieldsSearchBarShopping.minor_or_major_selection
                      .description
                  }
                  label={
                    formFieldsSearchBarShopping.minor_or_major_selection.label
                  }
                  name="minor_or_major_selection"
                  placeholder={
                    formFieldsSearchBarShopping.minor_or_major_selection
                      .placeholder
                  }
                  readOnly={false}
                />
                <FormFieldInput
                  control={form.control}
                  description={formFieldsSearchBarShopping.total.description}
                  label={formFieldsSearchBarShopping.total.label}
                  name="total"
                  placeholder={formFieldsSearchBarShopping.total.placeholder}
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
