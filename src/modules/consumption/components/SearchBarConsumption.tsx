import { Button, Form, Label, Separator } from "@/components";
import { FormFieldCalendar } from "@/modules/core/components/form/fields/FormFieldCalendar";
import { FormFieldSelect } from "@/modules/core/components/form/fields/FormFieldSelect";
import { FormFieldSwitch } from "@/modules/core/components/form/fields/FormFieldSwitch";
import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { DateTimeSelection } from "@/modules/core/interfaces/general/DateTimeSelection";
import { formFieldsSearchBarConsumption } from "../utils/formFieldsSearchBarConsumption";
import { formSchemaSearchBarConsumption } from "../utils/formSchemaSearchBarConsumption";

interface Props {
  date?: string | any;
  time_date?: string | DateTimeSelection;
}

const defaultValues = {
  filter_by_date: false,
  date: undefined,
  date_time_selection: undefined,
};

export const SearchBarConsumption = ({ date, time_date }: Props) => {
  const navigate = useNavigate();

  const form = useCreateForm({
    schema: formSchemaSearchBarConsumption,
    defaultValues,
  });

  useEffect(() => {
    form.setValue("filter_by_date", !!date);
    form.setValue("date_time_selection", time_date);
    form.setValue("date", !!date ? new Date(date) : undefined);
  }, []);

  const onSubmit = async (
    values: z.infer<typeof formSchemaSearchBarConsumption>
  ) => {
    const params = new URLSearchParams();

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
    form.reset(defaultValues);
    navigate("/consumption/view/all");
    toast.success("Se han limpiado los filtros");
  };

  const isFilterByDate = form.watch("filter_by_date");

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
        <div className="flex flex-col gap-5 mt-5">
          <div className="p-3 border rounded-lg shadow-sm w-[320px]">
            <FormFieldSwitch
              control={form.control}
              description={""}
              label={formFieldsSearchBarConsumption.filter_by_date.label}
              name="filter_by_date"
              placeholder={
                formFieldsSearchBarConsumption.filter_by_date.placeholder
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
                    formFieldsSearchBarConsumption.date_time_selection.description
                  }
                  label={formFieldsSearchBarConsumption.date_time_selection.label}
                  name="date_time_selection"
                  placeholder={
                    formFieldsSearchBarConsumption.date_time_selection.placeholder
                  }
                  readOnly={false}
                />
                <FormFieldCalendar
                  control={form.control}
                  description={formFieldsSearchBarConsumption.date.description}
                  label={formFieldsSearchBarConsumption.date.label}
                  name="date"
                  placeholder={formFieldsSearchBarConsumption.date.placeholder}
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
