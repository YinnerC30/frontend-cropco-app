import { Button, Form, Label, Separator } from "@/components";
import { FormFieldCalendar } from "@/modules/core/components/form/fields/FormFieldCalendar";
import { FormFieldCommand } from "@/modules/core/components/form/fields/FormFieldCommand";
import { FormFieldInput } from "@/modules/core/components/form/fields/FormFieldInput";
import { FormFieldSelect } from "@/modules/core/components/form/fields/FormFieldSelect";
import { FormFieldSwitch } from "@/modules/core/components/form/fields/FormFieldSwitch";
import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { TypeFilterDate } from "@/modules/core/interfaces/general/TypeFilterDate";
import { TypeFilterNumber } from "@/modules/core/interfaces/general/TypeFilterNumber";
import { useGetAllEmployees } from "@/modules/employees/hooks/useGetAllEmployees";
import { MethodOfPayment } from "../interfaces/MethodOfPayment";
import { formFieldsSearchBarPayment } from "../utils/formFieldsSearchBarPayment";
import { formSchemaSearchBarPayment } from "../utils/formSchemaSearchBarPayment";

interface Props {
  employee?: string;
  date?: string | any;
  time_date?: string | TypeFilterDate;
  total?: number;
  type_total?: string | TypeFilterNumber;
  filter_by_method_of_payment: boolean | any;
  method_of_payment?: any;
}

const defaultValues = {
  employee: { id: undefined },
  filter_by_date: false,
  date: undefined,
  date_time_selection: undefined,
  filter_by_total: false,
  total: undefined,
  minor_or_major_selection: undefined,
  method_of_payment: undefined,
  filter_by_method_of_payment: undefined,
};

export const SearchBarPayments = ({
  employee,
  date,
  time_date,
  total,
  type_total,
  method_of_payment,
  filter_by_method_of_payment,
}: Props) => {
  const navigate = useNavigate();
  const [openPopover, setOpenPopover] = useState(false);

  const { query: queryCrops } = useGetAllEmployees({
    searchParameter: "",
    allRecords: true,
  });

  const form = useCreateForm({
    schema: formSchemaSearchBarPayment,
    defaultValues,
  });

  useEffect(() => {
    form.setValue("employee.id", employee);
    form.setValue("filter_by_date", !!date);
    form.setValue("date_time_selection", time_date);
    form.setValue("date", !!date ? new Date(date) : undefined);

    form.setValue("filter_by_total", !!total);
    form.setValue("minor_or_major_selection", type_total);
    form.setValue("total", total);

    form.setValue("method_of_payment", method_of_payment);
    form.setValue("filter_by_method_of_payment", filter_by_method_of_payment);
  }, []);

  const onSubmit = async (
    values: z.infer<typeof formSchemaSearchBarPayment>
  ) => {
    const params = new URLSearchParams();
    if (values.employee?.id) {
      params.append("employee", values.employee.id);
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

    if (values.filter_by_method_of_payment && values.method_of_payment) {
      params.append(
        "filter_by_method_of_payment",
        values.filter_by_method_of_payment.toString()
      );
      params.append("method_of_payment", values.method_of_payment);
    }

    navigate(`?${params.toString()}`);
  };

  const handleReset = () => {
    form.reset(defaultValues);
    navigate("/payments/view/all");
    toast.success("Se han limpiado los filtros");
  };

  const isFilterByDate = form.watch("filter_by_date");
  const isFilterByTotal = form.watch("filter_by_total");
  const isFilterByMethodOfPayment = form.watch("filter_by_method_of_payment");

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
          nameToShow="first_name"
          control={form.control}
          description={""}
          label={formFieldsSearchBarPayment.employee.label}
          name="employee.id"
          placeholder={formFieldsSearchBarPayment.employee.placeholder}
          readOnly={false}
        />
        <div className="flex flex-col gap-5">
          <div className="p-3 border rounded-lg shadow-sm w-[320px]">
            <FormFieldSwitch
              control={form.control}
              description={""}
              label={formFieldsSearchBarPayment.filter_by_date.label}
              name="filter_by_date"
              placeholder={
                formFieldsSearchBarPayment.filter_by_date.placeholder
              }
              readOnly={false}
            />
            {isFilterByDate && (
              <div className="flex flex-col gap-5">
                <Separator className="mt-2" />
                <FormFieldSelect
                  items={[TypeFilterDate.after, TypeFilterDate.before]}
                  control={form.control}
                  description={
                    formFieldsSearchBarPayment.date_time_selection.description
                  }
                  label={formFieldsSearchBarPayment.date_time_selection.label}
                  name="date_time_selection"
                  placeholder={
                    formFieldsSearchBarPayment.date_time_selection.placeholder
                  }
                  readOnly={false}
                />
                <FormFieldCalendar
                  control={form.control}
                  description={formFieldsSearchBarPayment.date.description}
                  label={formFieldsSearchBarPayment.date.label}
                  name="date"
                  placeholder={formFieldsSearchBarPayment.date.placeholder}
                  readOnly={false}
                />
              </div>
            )}
          </div>

          <div className="p-3 border rounded-lg shadow-sm w-[320px]">
            <FormFieldSwitch
              control={form.control}
              description={""}
              label={formFieldsSearchBarPayment.filter_by_total.label}
              name="filter_by_total"
              placeholder={
                formFieldsSearchBarPayment.filter_by_total.placeholder
              }
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
                    formFieldsSearchBarPayment.minor_or_major_selection
                      .description
                  }
                  label={
                    formFieldsSearchBarPayment.minor_or_major_selection.label
                  }
                  name="minor_or_major_selection"
                  placeholder={
                    formFieldsSearchBarPayment.minor_or_major_selection
                      .placeholder
                  }
                  readOnly={false}
                />
                <FormFieldInput
                  control={form.control}
                  description={formFieldsSearchBarPayment.total.description}
                  label={formFieldsSearchBarPayment.total.label}
                  name="total"
                  placeholder={formFieldsSearchBarPayment.total.placeholder}
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
              label={
                formFieldsSearchBarPayment.filter_by_method_of_payment.label
              }
              name="filter_by_method_of_payment"
              placeholder={
                formFieldsSearchBarPayment.filter_by_method_of_payment
                  .placeholder
              }
              readOnly={false}
            />
            {isFilterByMethodOfPayment && (
              <div className="flex flex-col gap-5">
                <Separator className="mt-2" />
                <FormFieldSelect
                  items={[
                    MethodOfPayment.EFECTIVO,
                    MethodOfPayment.TRANSFERENCIA,
                    MethodOfPayment.INTERCAMBIO,
                  ]}
                  control={form.control}
                  description={
                    formFieldsSearchBarPayment.method_of_payment.description
                  }
                  label={formFieldsSearchBarPayment.method_of_payment.label}
                  name="method_of_payment"
                  placeholder={
                    formFieldsSearchBarPayment.method_of_payment.placeholder
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
