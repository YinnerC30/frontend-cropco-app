import { Button, Input, Label, Separator } from "@/components";
import { Form } from "@/components/ui/form";
import { ErrorLoading, Loading } from "@/modules/core/components";
import { ButtonsForm } from "@/modules/core/components/ButtonsForm";
import { FormFieldCalendar } from "@/modules/core/components/form/FormFieldCalendar";
import { FormFieldCommand } from "@/modules/core/components/form/FormFieldCommand";
import { FormFieldInput } from "@/modules/core/components/form/FormFieldInput";
import { FormFieldTextArea } from "@/modules/core/components/form/FormFieldTextArea";
import { FormProps } from "@/modules/core/interfaces/FormProps";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHarvestForm } from "../../hooks/useHarvestForm";
import { formFieldsHarvest } from "../../utils";
import {
  columnsHarvestDetail,
  columnsHarvestDetailActions,
} from "../columns/ColumnsTableHarvestDetail";
import { CreateHarvestDetail } from "../CreateHarvestDetail";
import { DataTableHarvestDetail } from "../DataTableHarvestDetails";
import { ModifyHarvestDetail } from "../ModifyHarvestDetail";
import { add, calculateTotal, reset } from "../../utils/harvestSlice";
import { AppDispatch, useAppDispatch } from "@/redux/store";
import { FormatMoneyValue } from "@/modules/core/helpers/FormatMoneyValue";
import { FormatNumber } from "@/modules/core/helpers/FormatNumber";

export const FormHarvest = ({
  onSubmit,
  isPending,
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

  if (queryCrops.isLoading) return <Loading />;

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
      <Label className="text-sm">Cosechas realizadas por empleado:</Label>

      <Button
        onClick={() => setIsOpenDialogForm(true)}
        className={`block my-2 ml-1 ${readOnly && "hidden"}`}
        disabled={readOnly}
      >
        Añadir
      </Button>

      <CreateHarvestDetail
        isOpenDialogForm={isOpenDialogForm}
        setIsOpenDialogForm={setIsOpenDialogForm}
      />

      <DataTableHarvestDetail
        data={details}
        columns={readOnly ? columnsHarvestDetail : columnsHarvestDetailActions}
        setHarvestDetail={!readOnly && setHarvestDetail}
        setIsOpenDialogModifyForm={!readOnly && setIsOpenDialogModifyForm}
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
      />
      <Input value={FormatNumber(total)} className="ml-1 w-44" readOnly/>
      <FormFieldInput
        className="hidden"
        control={form.control}
        description={formFieldsHarvest.value_pay.description}
        label={formFieldsHarvest.value_pay.label}
        name={"value_pay"}
        placeholder={formFieldsHarvest.value_pay.placeholder}
        readOnly={true}
        type="number"
      />
      <Input value={FormatMoneyValue(value_pay)} className="ml-1 w-44" readOnly />

      <Separator className="w-full my-5" />

      {!readOnly && (
        <ButtonsForm
          isPending={isPending ?? false}
          formId={"formHarvest"}
          className={"flex w-48 gap-2 mt-2"}
        />
      )}

      {readOnly && (
        <Button className="my-2" onClick={() => navigate(-1)}>
          Volver
        </Button>
      )}
    </Form>
  );
};
