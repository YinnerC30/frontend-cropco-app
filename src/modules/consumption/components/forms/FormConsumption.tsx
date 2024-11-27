import { Button, Form } from "@/components";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

import { ButtonsForm } from "@/modules/core/components/ButtonsForm";
import { FormFieldCalendar } from "@/modules/core/components/form/fields/FormFieldCalendar";
import { FormFieldDataTable } from "@/modules/core/components/form/fields/FormFieldDataTable";
import { DataTableForm } from "@/modules/core/components/table/DataTableForm";
import { FormProps } from "@/modules/core/interfaces/form/FormProps";
import { useEffect } from "react";
import { useConsumptionForm } from "../../hooks/useConsumptionForm";
import { add, reset } from "../../utils/consumptionSlice";
import { formFieldsConsumption } from "../../utils/formFieldsConsumption";
import { CreateConsumptionDetail } from "../CreateConsumptionDetail";
import { ModifyConsumptionDetail } from "../ModifyConsumptionDetail";
import {
  columnsConsumptionDetail,
  columnsConsumptionDetailActions,
} from "../columns/ColumnsTableConsumptionDetail";

export const FormConsumption = ({
  onSubmit,
  isSubmitting: isPending,
  defaultValues,
  readOnly = false,
}: FormProps) => {
  const {
    formConsumption,
    details,
    isOpenDialogForm,
    setIsOpenDialogForm,
    isOpenDialogModifyForm,
    setIsOpenDialogModifyForm,
    dispatch,
    consumptionDetail,
    setConsumptionDetail,
    isSuccess,
  } = useConsumptionForm();

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (defaultValues) {
      formConsumption.reset(defaultValues);
      dispatch(add(defaultValues.details));
    }
  }, []);

  useEffect(() => {
    if (details.length > 0) {
      formConsumption.setValue("details", details);
      formConsumption.trigger("details");
    }
  }, [details]);

  const navigate = useNavigate();

  if (isSuccess) {
    dispatch(reset());
    navigate("../view/all");
  }

  return (
    <Form {...formConsumption}>
      <form
        id="formConsumption"
        className="ml-1"
        onSubmit={formConsumption.handleSubmit((formData) => {
          onSubmit(formData, details);
        })}
      >
        <FormFieldCalendar
          control={formConsumption.control}
          description={formFieldsConsumption.date.description}
          label={formFieldsConsumption.date.label}
          name={"date"}
          placeholder={formFieldsConsumption.date.placeholder}
          readOnly={readOnly}
        />
      </form>

      <Separator className="w-full my-5" />

      <FormFieldDataTable
        control={formConsumption.control}
        description={formFieldsConsumption.details.description}
        label={formFieldsConsumption.details.label}
        name={"details"}
        placeholder={formFieldsConsumption.details.placeholder}
        readOnly={readOnly}
      >
        {!readOnly && (
          <Button
            onClick={() => setIsOpenDialogForm(true)}
            className="block my-2 ml-1"
          >
            Agregar
          </Button>
        )}
        <DataTableForm
          data={details}
          columns={
            readOnly
              ? columnsConsumptionDetail
              : columnsConsumptionDetailActions
          }
          nameColumnToFilter={"supply_name"}
          placeholderInputToFilter={"Nombre del insumo..."}
          setRecord={setConsumptionDetail}
          sideEffect={!readOnly && setIsOpenDialogModifyForm}
        />
      </FormFieldDataTable>

      <CreateConsumptionDetail
        isOpenDialogForm={isOpenDialogForm}
        setIsOpenDialogForm={setIsOpenDialogForm}
      />

      {isOpenDialogModifyForm && (
        <ModifyConsumptionDetail
          defaultValues={consumptionDetail}
          isDialogOpen={isOpenDialogModifyForm}
          setDialogOpen={setIsOpenDialogModifyForm}
        />
      )}

      <Separator className="w-full my-5" />

      {!readOnly && (
        <ButtonsForm
          isPending={isPending ?? false}
          formId={"formConsumption"}
          className={"flex w-48 gap-2 mt-2"}
        />
      )}

      {readOnly && (
        <div className="flex items-center gap-2">
          <Button className="my-2" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </div>
      )}
    </Form>
  );
};
