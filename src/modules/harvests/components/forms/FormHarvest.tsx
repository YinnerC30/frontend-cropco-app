import { Badge, Button, Separator } from "@/components";
import { Form } from "@/components/ui/form";
import { ErrorLoading, Loading } from "@/modules/core/components";
import { ButtonsForm } from "@/modules/core/components/ButtonsForm";
import { FormFieldCalendar } from "@/modules/core/components/form/fields/FormFieldCalendar";
import { FormFieldCommand } from "@/modules/core/components/form/fields/FormFieldCommand";
import { FormFieldDataTable } from "@/modules/core/components/form/fields/FormFieldDataTable";
import { FormFieldInput } from "@/modules/core/components/form/fields/FormFieldInput";
import { FormFieldTextArea } from "@/modules/core/components/form/fields/FormFieldTextArea";
import { DataTableForm } from "@/modules/core/components/table/DataTableForm";
import { FormatMoneyValue } from "@/modules/core/helpers/formatting/FormatMoneyValue";
import { FormatNumber } from "@/modules/core/helpers/formatting/FormatNumber";
import { FormProps } from "@/modules/core/interfaces/form/FormProps";
import { AppDispatch, useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHarvestForm } from "../../hooks/useHarvestForm";
import { formFieldsHarvest } from "../../utils";
import { add, calculateTotal, reset } from "../../utils/harvestSlice";
import {
  columnsHarvestDetail,
  columnsHarvestDetailActions,
} from "../columns/ColumnsTableHarvestDetail";
import { CreateHarvestDetail } from "../CreateHarvestDetail";
import { ModifyHarvestDetail } from "../ModifyHarvestDetail";

export const FormHarvest = ({
  onSubmit,
  isSubmitting: isPending,
  defaultValues,
  readOnly = false,
}: FormProps) => {
  const navigate = useNavigate();
  const {
    formHarvest: form,
    details,
    harvestDetail,
    isOpenDialogForm,
    isOpenDialogModifyForm,
    queryCrops,
    setHarvestDetail,
    setIsOpenDialogForm,
    setIsOpenDialogModifyForm,
    total,
    value_pay,
    openPopoverCrop,
    setOpenPopoverCrop,
  } = useHarvestForm();

  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
      dispatch(add(defaultValues.details));
      dispatch(calculateTotal());
    }
  }, [defaultValues]);

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      total,
      value_pay,
    });
  }, [total, value_pay]);

  useEffect(() => {
    form.setValue("details", details);
  }, [details]);

  if (queryCrops.isLoading) {
    return <Loading />;
  }

  if (queryCrops.isError) {
    return <ErrorLoading />;
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((formData) => {
          onSubmit(formData, details, total, value_pay);
        })}
        id="formHarvest"
        className="flex flex-col gap-2 ml-1"
      >
        <FormFieldCalendar
          control={form.control}
          description={formFieldsHarvest.date.description}
          label={formFieldsHarvest.date.label}
          name={"date"}
          placeholder={formFieldsHarvest.date.placeholder}
          readOnly={readOnly}
        />
        <FormFieldCommand
          openPopover={openPopoverCrop}
          setOpenPopover={setOpenPopoverCrop}
          data={queryCrops?.data?.rows || []}
          form={form}
          nameToShow={"name"}
          control={form.control}
          description={formFieldsHarvest.crop.description}
          label={formFieldsHarvest.crop.label}
          name={"crop.id"}
          placeholder={formFieldsHarvest.crop.placeholder}
          readOnly={readOnly}
        />
        <FormFieldTextArea
          control={form.control}
          description={formFieldsHarvest.observation.description}
          label={formFieldsHarvest.observation.label}
          name={"observation"}
          placeholder={formFieldsHarvest.observation.placeholder}
          readOnly={readOnly}
        />
      </form>

      <Separator className="w-full my-5" />

      <FormFieldDataTable
        control={form.control}
        description={""}
        label={formFieldsHarvest.details.label}
        name={"details"}
        placeholder={""}
        readOnly={readOnly}
      >
        <Button
          onClick={() => setIsOpenDialogForm(true)}
          className={`block my-2 ml-1 ${readOnly && "hidden"}`}
          disabled={readOnly}
        >
          Añadir
        </Button>

        <DataTableForm
          data={details}
          columns={
            readOnly ? columnsHarvestDetail : columnsHarvestDetailActions
          }
          setRecord={!readOnly && setHarvestDetail}
          sideEffect={!readOnly && setIsOpenDialogModifyForm}
          nameColumnToFilter={"employee_first_name"}
          placeholderInputToFilter={"Buscar empleado por nombre..."}
        />
      </FormFieldDataTable>

      <CreateHarvestDetail
        isOpenDialogForm={isOpenDialogForm}
        setIsOpenDialogForm={setIsOpenDialogForm}
      />

      {isOpenDialogModifyForm && (
        <ModifyHarvestDetail
          defaultValues={harvestDetail}
          isDialogOpen={isOpenDialogModifyForm}
          setDialogOpen={setIsOpenDialogModifyForm}
        />
      )}

      <FormFieldInput
        className="hidden"
        control={form.control}
        description={formFieldsHarvest.total.description}
        label={formFieldsHarvest.total.label}
        name={"total"}
        placeholder={formFieldsHarvest.total.placeholder}
        readOnly={true}
        type="number"
      >
        <Badge
          className="block h-8 text-base text-center w-28"
          variant={"cyan"}
        >
          {FormatNumber(total)}
        </Badge>
      </FormFieldInput>

      <FormFieldInput
        className="hidden"
        control={form.control}
        description={formFieldsHarvest.value_pay.description}
        label={formFieldsHarvest.value_pay.label}
        name={"value_pay"}
        placeholder={formFieldsHarvest.value_pay.placeholder}
        readOnly={true}
        type="number"
      >
        <Badge
          className="block h-8 text-base text-center w-28"
          variant={"indigo"}
        >
          {FormatMoneyValue(value_pay)}
        </Badge>
      </FormFieldInput>

      <Separator className="w-full my-5" />

      {!readOnly && (
        <ButtonsForm
          isPending={isPending ?? false}
          formId={"formHarvest"}
          className={"flex w-48 gap-2 mt-2"}
        />
      )}

      {readOnly && (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate(`../processed/view/${defaultValues.id}`)}
          >
            Ir a inventario
          </Button>
          <Button className="my-2" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </div>
      )}
    </Form>
  );
};
