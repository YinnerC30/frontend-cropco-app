import { Button, Form, Label, Separator } from "@/components";
import { FormFieldCalendar } from "@/modules/core/components/form/fields/FormFieldCalendar";
import { FormFieldInput } from "@/modules/core/components/form/fields/FormFieldInput";
import { FormFieldSelect } from "@/modules/core/components/form/fields/FormFieldSelect";
import { FormFieldSwitch } from "@/modules/core/components/form/fields/FormFieldSwitch";
import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { YesORNotSelection } from "@/modules/core/interfaces/general/YesORNotSelection";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { TypeFilterDate } from "../../core/interfaces/general/TypeFilterDate";
import { TypeFilterNumber } from "../../core/interfaces/general/TypeFilterNumber";
import { formFieldsSearchBarSale } from "../utils/formFieldsSearchBarSale";
import { formSchemaSearchBarSale } from "../utils/formSchemaSearchBarSale";

interface Props {
  date?: string | any;
  time_date?: string | TypeFilterDate;
  total?: number;
  type_total?: string | TypeFilterNumber;
  quantity?: number;
  type_quantity?: string | TypeFilterNumber;
  filter_by_is_receivable: boolean | Boolean;
  is_receivable?: boolean | YesORNotSelection | any;
}

const defaultValues = {
  filter_by_date: false,
  date: undefined,
  date_time_selection: undefined,
  filter_by_total: false,
  total: undefined,
  minor_or_major_selection: undefined,
  filter_by_quantity: false,
  quantity: undefined,
  minor_or_major_quantity_selection: undefined,
  filter_by_is_receivable: false,
  is_receivable: YesORNotSelection.YES,
};

export const SearchBarSale = ({
  date,
  time_date,
  total,
  type_total,
  quantity,
  type_quantity,
  filter_by_is_receivable,
  is_receivable,
}: Props) => {
  const navigate = useNavigate();

  const form = useCreateForm({
    schema: formSchemaSearchBarSale,
    defaultValues,
  });

  useEffect(() => {
    form.setValue("filter_by_date", !!date);
    form.setValue("date_time_selection", time_date);
    form.setValue("date", !!date ? new Date(date) : undefined);

    form.setValue("filter_by_total", !!total);
    form.setValue("minor_or_major_selection", type_total);
    form.setValue("total", total);

    form.setValue("filter_by_quantity", !!quantity);
    form.setValue("minor_or_major_quantity_selection", type_quantity);
    form.setValue("quantity", quantity);

    form.setValue("filter_by_is_receivable", filter_by_is_receivable);
    form.setValue(
      "is_receivable",
      is_receivable ? YesORNotSelection.YES : YesORNotSelection.NOT
    );
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchemaSearchBarSale>) => {
    const params = new URLSearchParams();
    if (values.crop?.id) {
      params.append("crop", values.crop.id);
    }
    if (values.filter_by_date && values.date) {
      const dateParam =
        values.date_time_selection === TypeFilterDate.after
          ? "after_date"
          : "before_date";
      params.append(dateParam, values.date.toISOString());
    }

    if (values.filter_by_total && values.total) {
      const totalParam =
        values.minor_or_major_selection === TypeFilterNumber.MIN
          ? "minor_total"
          : "major_total";
      params.append(totalParam, values.total.toString());
    }

    if (values.filter_by_quantity && values.quantity) {
      const valuePayParam =
        values.minor_or_major_quantity_selection === TypeFilterNumber.MIN
          ? "minor_quantity"
          : "major_quantity";
      params.append(valuePayParam, values.quantity.toString());
    }

    if (values.filter_by_is_receivable && values.is_receivable) {
      const isReceivableValue =
        values.is_receivable === YesORNotSelection.YES ? "true" : "false";
      params.append("filter_by_is_receivable", "true");
      params.append("is_receivable", isReceivableValue);
    }
    navigate(`?${params.toString()}`);
  };

  const handleReset = () => {
    form.reset(defaultValues);
    navigate("/sales/view/all");
    toast.success("Se han limpiado los filtros");
  };

  const isFilterByDate = form.watch("filter_by_date");
  const isFilterByTotal = form.watch("filter_by_total");
  const isFilterByValuePay = form.watch("filter_by_quantity");
  const isFilterByIsReceivable = form.watch("filter_by_is_receivable");

  return (
    <Form {...form}>
      <Label className="text-lg">Barra de filtrado de registros:</Label>
      <form
        onSubmit={form.handleSubmit((e) => {
          onSubmit(e);
        })}
        id="formSearch"
        className="flex flex-col gap-3 mt-2 ml-2"
      >
        <div className="flex flex-col gap-5">
          <div className="p-3 border rounded-lg shadow-sm w-[320px]">
            <FormFieldSwitch
              control={form.control}
              description={""}
              label={formFieldsSearchBarSale.filter_by_date.label}
              name="filter_by_date"
              placeholder={formFieldsSearchBarSale.filter_by_date.placeholder}
              readOnly={false}
            />
            {isFilterByDate && (
              <div className="flex flex-col gap-5">
                <Separator className="mt-2" />
                <FormFieldSelect
                  items={[TypeFilterDate.after, TypeFilterDate.before]}
                  control={form.control}
                  description={
                    formFieldsSearchBarSale.date_time_selection.description
                  }
                  label={formFieldsSearchBarSale.date_time_selection.label}
                  name="date_time_selection"
                  placeholder={
                    formFieldsSearchBarSale.date_time_selection.placeholder
                  }
                  readOnly={false}
                />
                <FormFieldCalendar
                  control={form.control}
                  description={formFieldsSearchBarSale.date.description}
                  label={formFieldsSearchBarSale.date.label}
                  name="date"
                  placeholder={formFieldsSearchBarSale.date.placeholder}
                  readOnly={false}
                />
              </div>
            )}
          </div>

          <div className="p-3 border rounded-lg shadow-sm w-[320px]">
            <FormFieldSwitch
              control={form.control}
              description={""}
              label={formFieldsSearchBarSale.filter_by_quantity.label}
              name="filter_by_quantity"
              placeholder={
                formFieldsSearchBarSale.filter_by_quantity.placeholder
              }
              readOnly={false}
            />
            {isFilterByValuePay && (
              <div className="flex flex-col gap-5">
                <Separator className="mt-2" />
                <FormFieldSelect
                  items={[
                    TypeFilterNumber.MIN,
                    TypeFilterNumber.MAX,
                  ]}
                  control={form.control}
                  description={
                    formFieldsSearchBarSale.minor_or_major_quantity_selection
                      .description
                  }
                  label={
                    formFieldsSearchBarSale.minor_or_major_quantity_selection
                      .label
                  }
                  name="minor_or_major_quantity_selection"
                  placeholder={
                    formFieldsSearchBarSale.minor_or_major_quantity_selection
                      .placeholder
                  }
                  readOnly={false}
                />
                <FormFieldInput
                  control={form.control}
                  description={formFieldsSearchBarSale.quantity.description}
                  label={formFieldsSearchBarSale.quantity.label}
                  name="quantity"
                  placeholder={formFieldsSearchBarSale.quantity.placeholder}
                  type="number"
                  readOnly={false}
                />
              </div>
            )}
          </div>

          <div className="p-3 border rounded-lg shadow-sm w-[320px]">
            <FormFieldSwitch
              control={form.control}
              description={""}
              label={formFieldsSearchBarSale.filter_by_total.label}
              name="filter_by_total"
              placeholder={formFieldsSearchBarSale.filter_by_total.placeholder}
              readOnly={false}
            />
            {isFilterByTotal && (
              <div className="flex flex-col gap-5">
                <Separator className="mt-2" />
                <FormFieldSelect
                  items={[
                    TypeFilterNumber.MIN,
                    TypeFilterNumber.MAX,
                  ]}
                  control={form.control}
                  description={
                    formFieldsSearchBarSale.minor_or_major_selection.description
                  }
                  label={formFieldsSearchBarSale.minor_or_major_selection.label}
                  name="minor_or_major_selection"
                  placeholder={
                    formFieldsSearchBarSale.minor_or_major_selection.placeholder
                  }
                  readOnly={false}
                />
                <FormFieldInput
                  control={form.control}
                  description={formFieldsSearchBarSale.total.description}
                  label={formFieldsSearchBarSale.total.label}
                  name="total"
                  placeholder={formFieldsSearchBarSale.total.placeholder}
                  type="number"
                  readOnly={false}
                />
              </div>
            )}
          </div>
          <div className="p-3 border rounded-lg shadow-sm w-[320px]">
            <FormFieldSwitch
              control={form.control}
              description={""}
              label={formFieldsSearchBarSale.filter_by_is_receivable.label}
              name="filter_by_is_receivable"
              placeholder={
                formFieldsSearchBarSale.filter_by_is_receivable.placeholder
              }
              readOnly={false}
            />
            {isFilterByIsReceivable && (
              <div className="flex flex-col gap-5">
                <Separator className="mt-2" />
                <FormFieldSelect
                  items={[YesORNotSelection.YES, YesORNotSelection.NOT]}
                  control={form.control}
                  description={
                    formFieldsSearchBarSale.is_receivable.description
                  }
                  label={formFieldsSearchBarSale.is_receivable.label}
                  name="is_receivable"
                  placeholder={
                    formFieldsSearchBarSale.is_receivable.placeholder
                  }
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
