import { Badge, Button, Form, Separator } from "@/components";
import { ButtonsForm } from "@/modules/core/components/ButtonsForm";
import { FormFieldCalendar } from "@/modules/core/components/form/fields/FormFieldCalendar";
import { FormFieldCommand } from "@/modules/core/components/form/fields/FormFieldCommand";
import { FormFieldDataTable } from "@/modules/core/components/form/fields/FormFieldDataTable";
import { FormFieldInput } from "@/modules/core/components/form/fields/FormFieldInput";
import { FormFieldTextArea } from "@/modules/core/components/form/fields/FormFieldTextArea";
import { FormDataTable } from "@/modules/core/components/form/FormDataTable";
import { FormatMoneyValue } from "@/modules/core/helpers/formatting/FormatMoneyValue";
import { FormProps } from "@/modules/core/interfaces/form/FormProps";
import { useNavigate } from "react-router-dom";
import { useWorkForm } from "../../hooks/useWorkForm";
import { formFieldsWork } from "../../utils/formFieldsWork";
import {
  columnsWorkDetail,
  columnsWorkDetailActions,
} from "../columns/ColumnsTableWorkDetail";
import { CreateWorkDetail } from "../CreateWorkDetail";
import { ModifyWorkDetail } from "../ModifyWorkDetail";
import { AppDispatch, useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { add, calculateTotal, reset } from "../../utils/workSlice";
import { ErrorLoading, Loading } from "@/modules/core/components";

Form;
export const FormWork = ({
  defaultValues,
  onSubmit,
  readOnly = false,
  isSubmitting: isPending,
}: FormProps) => {
  const navigate = useNavigate();
  const {
    formWork,
    queryCrops,
    details,
    total,
    isOpenDialogForm,
    setIsOpenDialogForm,
    isOpenDialogModifyForm,
    setIsOpenDialogModifyForm,
    workDetail,
    setWorkDetail,
    openPopoverCommand,
    setOpenPopoverCommand,
  } = useWorkForm();

  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (defaultValues) {
      formWork.reset(defaultValues);
      dispatch(add(defaultValues.details));
      dispatch(calculateTotal());
    }
  }, [defaultValues]);

  useEffect(() => {
    formWork.reset({
      ...formWork.getValues(),
      total,
    });
  }, [total]);

  useEffect(() => {
    formWork.setValue("details", details);
  }, [details]);

  if (queryCrops.isLoading) {
    return <Loading />;
  }

  if (queryCrops.isError) {
    return <ErrorLoading />;
  }

  return (
    <Form {...formWork}>
      <form
        onSubmit={formWork.handleSubmit((data: any) => {
          onSubmit(data, total, details);
        })}
        id="formWork"
        className="flex flex-col gap-2 ml-1"
      >
        <FormFieldCalendar
          control={formWork.control}
          description={formFieldsWork.date.description}
          label={formFieldsWork.date.label}
          name={"date"}
          placeholder={formFieldsWork.date.placeholder}
          readOnly={readOnly}
        />
        <FormFieldCommand
          openPopover={openPopoverCommand}
          setOpenPopover={setOpenPopoverCommand}
          data={queryCrops?.data?.rows ?? []}
          form={formWork}
          nameToShow={"name"}
          control={formWork.control}
          description={formFieldsWork.crop.description}
          label={formFieldsWork.crop.label}
          name={"crop.id"}
          placeholder={formFieldsWork.crop.placeholder}
          readOnly={readOnly}
        />
        <FormFieldTextArea
          control={formWork.control}
          description={formFieldsWork.description.description}
          label={formFieldsWork.description.label}
          name={"description"}
          placeholder={formFieldsWork.description.placeholder}
          readOnly={readOnly}
        />
      </form>

      <Separator className="w-full my-5" />

      <FormFieldDataTable
        control={formWork.control}
        description={""}
        label={formFieldsWork.details.label}
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

        <FormDataTable
          data={details}
          columns={readOnly ? columnsWorkDetail : columnsWorkDetailActions}
          setRecord={!readOnly && setWorkDetail}
          sideEffect={!readOnly && setIsOpenDialogModifyForm}
          nameColumnToFilter={"employee_first_name"}
          placeholderInputToFilter={"Buscar empleado por nombre..."}
        />
      </FormFieldDataTable>

      <CreateWorkDetail
        isOpenDialogForm={isOpenDialogForm}
        setIsOpenDialogForm={setIsOpenDialogForm}
      />

      {isOpenDialogModifyForm && (
        <ModifyWorkDetail
          defaultValues={workDetail}
          isDialogOpen={isOpenDialogModifyForm}
          setDialogOpen={setIsOpenDialogModifyForm}
        />
      )}

      <FormFieldInput
        className="hidden"
        control={formWork.control}
        description={formFieldsWork.total.description}
        label={formFieldsWork.total.label}
        name={"total"}
        placeholder={formFieldsWork.total.placeholder}
        readOnly={true}
        type="number"
      >
        <Badge
          className="block h-8 text-base text-center w-28"
          variant={"cyan"}
        >
          {FormatMoneyValue(total)}
        </Badge>
      </FormFieldInput>

      <Separator className="w-full my-5" />

      {!readOnly && (
        <ButtonsForm
          isPending={isPending ?? false}
          formId={"formWork"}
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
