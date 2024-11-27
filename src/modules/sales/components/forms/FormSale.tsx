import { Badge, Button, Form, Separator } from "@/components";
import { ButtonsForm } from "@/modules/core/components/ButtonsForm";
import { FormFieldCalendar } from "@/modules/core/components/form/fields/FormFieldCalendar";
import { FormFieldCheckBox } from "@/modules/core/components/form/fields/FormFieldCheckBox";
import { FormFieldDataTable } from "@/modules/core/components/form/fields/FormFieldDataTable";
import { FormFieldInput } from "@/modules/core/components/form/fields/FormFieldInput";
import { DataTableForm } from "@/modules/core/components/table/DataTableForm";
import { FormatMoneyValue } from "@/modules/core/helpers/formatting/FormatMoneyValue";
import { FormatNumber } from "@/modules/core/helpers/formatting/FormatNumber";
import { FormProps } from "@/modules/core/interfaces";
import { AppDispatch, useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSaleForm } from "../../hooks/useSaleForm";
import { formFieldsSale } from "../../utils";
import { add, calculateTotal, reset } from "../../utils/saleSlice";
import {
  columnsSaleDetail,
  columnsSaleDetailActions,
} from "../columns/ColumnsTableSaleDetail";
import { CreateSaleDetail } from "../CreateSaleDetail";
import { ModifySaleDetail } from "../ModifySaleDetail";

export const FormSale = ({
  onSubmit,
  isSubmitting: isPending,
  defaultValues,
  readOnly = false,
}: FormProps) => {
  const {
    formSale,
    details,
    isOpenDialogForm,
    isOpenDialogModifyForm,
    quantity,
    saleDetail,
    setIsOpenDialogForm,
    setIsOpenDialogModifyForm,
    setSaleDetail,
    total,
  } = useSaleForm();

  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
    if (defaultValues) {
      const { details, ...rest } = defaultValues;
      formSale.reset({
        ...rest,
      });
      dispatch(add(details));
      dispatch(calculateTotal());
    }
  }, []);

  useEffect(() => {
    formSale.reset({
      ...formSale.getValues(),
      total,
      quantity,
    });
  }, [total, quantity]);

  useEffect(() => {
    formSale.setValue("details", details);
  }, [details]);

  const navigate = useNavigate();
  return (
    <Form {...formSale}>
      <form
        onSubmit={formSale.handleSubmit((formData) => {
          onSubmit(formData, details, total, quantity);
        })}
        id="formSale"
        className="flex flex-col gap-2 ml-1"
      >
        <FormFieldCalendar
          control={formSale.control}
          description={formFieldsSale.date.description}
          label={formFieldsSale.date.label}
          name={"date"}
          placeholder={formFieldsSale.date.placeholder}
          readOnly={readOnly}
        />
        <FormFieldCheckBox
          control={formSale.control}
          description={formFieldsSale.is_receivable.description}
          label={formFieldsSale.is_receivable.label}
          name={"is_receivable"}
          placeholder={formFieldsSale.is_receivable.placeholder}
          readOnly={readOnly}
        />
      </form>
      <Separator className="w-full my-5" />

      <FormFieldDataTable
        control={formSale.control}
        description={""}
        label={formFieldsSale.details.label}
        name={"details"}
        placeholder={""}
        readOnly={readOnly}
      >
        <Button
          onClick={(e) => {
            e.preventDefault();
            setIsOpenDialogForm(true);
          }}
          className={`block my-2 ml-1 ${readOnly && "hidden"}`}
          disabled={readOnly}
        >
          Añadir
        </Button>

        <DataTableForm
          data={details}
          columns={readOnly ? columnsSaleDetail : columnsSaleDetailActions}
          setRecord={!readOnly && setSaleDetail}
          sideEffect={!readOnly && setIsOpenDialogModifyForm}
          nameColumnToFilter={"client_first_name"}
          placeholderInputToFilter={"Buscar cliente por nombre..."}
        />
      </FormFieldDataTable>

      <CreateSaleDetail
        isOpenDialogForm={isOpenDialogForm}
        setIsOpenDialogForm={setIsOpenDialogForm}
      />

      {isOpenDialogModifyForm && (
        <ModifySaleDetail
          defaultValues={saleDetail}
          isDialogOpen={isOpenDialogModifyForm}
          setDialogOpen={setIsOpenDialogModifyForm}
        />
      )}

      <FormFieldInput
        className="hidden"
        control={formSale.control}
        description={formFieldsSale.quantity.description}
        label={formFieldsSale.quantity.label}
        name={"quantity"}
        placeholder={formFieldsSale.quantity.placeholder}
        readOnly={true}
        type="number"
      >
        <Badge
          className="block h-8 text-base text-center w-28"
          variant={"cyan"}
        >
          {FormatNumber(quantity)}
        </Badge>
      </FormFieldInput>

      <FormFieldInput
        className="hidden"
        control={formSale.control}
        description={formFieldsSale.total.description}
        label={formFieldsSale.total.label}
        name={"total"}
        placeholder={formFieldsSale.total.placeholder}
        readOnly={true}
        type="number"
      >
        <Badge
          className="block h-8 text-base text-center w-28"
          variant={"indigo"}
        >
          {FormatMoneyValue(total)}
        </Badge>
      </FormFieldInput>

      <Separator className="w-full my-5" />

      {!readOnly && (
        <ButtonsForm
          isPending={isPending ?? false}
          formId={"formSale"}
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
