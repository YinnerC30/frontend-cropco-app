import { Button, Form } from "@/components";
import { FormFieldCalendar } from "@/modules/core/components/form/FormFieldCalendar";
import { FormFieldCommand } from "@/modules/core/components/form/FormFieldCommand";
import { FormFieldSelect } from "@/modules/core/components/form/FormFieldSelect";
import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useGetAllCrops } from "@/modules/crops/hooks/useGetAllCrops";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { DateTimeSelection } from "../interfaces/DateTimeSelection";
import { formFieldsSearchBarHarvest } from "../utils/formFieldsSearchBarHarvest";
import { formSchemaSearchBarHarvest } from "../utils/formSchemaSearchBarHarvest";
interface Props {
  crop: string | undefined;
  date: string | undefined | any;
  time_date: string | DateTimeSelection | undefined;
}

export const SearchBarHarvest = ({ crop = "", date, time_date }: Props) => {
  console.log({ crop, date, time_date });
  const navigate = useNavigate();
  const [openPopover, setOpenPopover] = useState(false);
  const { query: queryCrops } = useGetAllCrops({
    searchParameter: "",
    allRecords: true,
  });
  const form = useCreateForm({
    schema: formSchemaSearchBarHarvest,
    defaultValues: {
      crop: {
        id: undefined,
      },
      date: undefined,
      date_time_selection: undefined,
    },
  });

  useEffect(() => {
    form.setValue("crop.id", crop);
    form.setValue("date_time_selection", time_date);
    form.setValue("date", date);
  }, []);

  const onSubmit = async (
    values: z.infer<typeof formSchemaSearchBarHarvest>
  ) => {
    console.log(values);
    const params = new URLSearchParams();

    const existCrop = !!values?.crop?.id!;
    const existDate = !!values?.date;

    if (existCrop) {
      params.append("crop", values?.crop?.id!);
    }
    if (existDate) {
      params.append(
        `${
          values.date_time_selection === DateTimeSelection.after
            ? "after_date"
            : "before_date"
        }`,
        values?.date!.toISOString()
      );
    }

    navigate(`?${params}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="formSearch"
        className="flex items-center gap-3 ml-2"
      >
        <FormFieldCommand
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
          data={queryCrops?.data?.rows || []}
          form={form}
          nameToShow={"name"}
          control={form.control}
          description={formFieldsSearchBarHarvest.crop.description}
          label={formFieldsSearchBarHarvest.crop.label}
          name={"crop.id"}
          placeholder={formFieldsSearchBarHarvest.crop.placeholder}
          readOnly={false}
        />
        <FormFieldSelect
          items={[DateTimeSelection.after, DateTimeSelection.before]}
          control={form.control}
          description={
            formFieldsSearchBarHarvest.date_time_selection.description
          }
          label={formFieldsSearchBarHarvest.date_time_selection.label}
          name={"date_time_selection"}
          placeholder={
            formFieldsSearchBarHarvest.date_time_selection.placeholder
          }
          readOnly={false}
        />
        <FormFieldCalendar
          control={form.control}
          description={formFieldsSearchBarHarvest.date.description}
          label={formFieldsSearchBarHarvest.date.label}
          name={"date"}
          placeholder={formFieldsSearchBarHarvest.date.placeholder}
          readOnly={false}
        />
        <div className="flex items-center justify-center gap-4">
          <Button type="submit" form="formSearch">
            Buscar
          </Button>
          <Button
            onClick={() => {
              form.reset({
                crop: { id: undefined },
                date: undefined,
                date_time_selection: undefined,
              });
              navigate("../all");
            }}
          >
            Borrar
          </Button>
        </div>
      </form>
    </Form>
  );
};
