import { Badge, Button, Form } from "@/components";
import { Separator } from "@/components/ui/separator";
import { FormFieldCalendar } from "@/modules/core/components/form/fields/FormFieldCalendar";
import { FormFieldDataTable } from "@/modules/core/components/form/fields/FormFieldDataTable";
import { FormFieldInput } from "@/modules/core/components/form/fields/FormFieldInput";
import { FormatMoneyValue } from "@/modules/core/helpers/formatting/FormatMoneyValue";
import { FormProps } from "@/modules/core/interfaces/form/FormProps";
import { useNavigate } from "react-router-dom";
import { formFieldsShopping } from "../../utils/formFieldsShopping";

import { ButtonsForm } from "@/modules/core/components/ButtonsForm";
import { DataTableForm } from "@/modules/core/components/table/DataTableForm";
import { useEffect } from "react";
import { useShoppingForm } from "../../hooks/useShoppingForm";
import { add, calculateTotal, reset } from "../../utils/shoppingSlice";
import {
  columnsShoppingDetail,
  columnsShoppingDetailActions,
} from "../columns/ColumnsTableShoppingDetail";
import { CreateShoppingDetail } from "../CreateShoppingDetail";
import { ModifyShoppingDetail } from "../ModifyShoppingDetail";

export const FormShopping = ({
  readOnly = false,
  onSubmit,
  isSubmitting: isPending,
  defaultValues,
}: FormProps) => {
  const {
    formShopping,
    details,
    isOpenDialogForm,
    setIsOpenDialogForm,
    isOpenDialogModifyForm,
    setIsOpenDialogModifyForm,
    total,
    dispatch,
    shoppingDetail,
    setShoppingDetail,
  } = useShoppingForm();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (defaultValues) {
      formShopping.reset(defaultValues);
      dispatch(add(defaultValues.details));
      dispatch(calculateTotal());
    }
  }, []);

  useEffect(() => {
    formShopping.reset({
      ...formShopping.getValues(),
      total,
    });
  }, [total]);

  useEffect(() => {
    formShopping.setValue("details", details);
  }, [details]);

  
  return (
    <Form {...formShopping}>
      <form
        id="formShopping"
        className="ml-1"
        onSubmit={formShopping.handleSubmit((formData) => {
          onSubmit(formData, details, total);
        })}
      >
        <FormFieldCalendar
          control={formShopping.control}
          description={formFieldsShopping.date.description}
          label={formFieldsShopping.date.label}
          name={"date"}
          placeholder={formFieldsShopping.date.placeholder}
          readOnly={readOnly}
        />
      </form>

      <Separator className="w-full my-5" />

      <FormFieldDataTable
        control={formShopping.control}
        description={""}
        label={formFieldsShopping.details.label}
        name={"details"}
        placeholder={""}
        readOnly={false}
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
            !readOnly ? columnsShoppingDetailActions : columnsShoppingDetail
          }
          nameColumnToFilter={"supplier_first_name"}
          placeholderInputToFilter={"Busqueda por proveedor..."}
          setRecord={!readOnly && setShoppingDetail}
          sideEffect={!readOnly && setIsOpenDialogModifyForm}
        />
      </FormFieldDataTable>

      <CreateShoppingDetail
        isOpenDialogForm={isOpenDialogForm}
        setIsOpenDialogForm={setIsOpenDialogForm}
      />

      {isOpenDialogModifyForm && (
        <ModifyShoppingDetail
          defaultValues={shoppingDetail}
          isDialogOpen={isOpenDialogModifyForm}
          setDialogOpen={setIsOpenDialogModifyForm}
        />
      )}

      <FormFieldInput
        className="hidden"
        control={formShopping.control}
        description={formFieldsShopping.total.description}
        label={formFieldsShopping.total.label}
        name={"total"}
        placeholder={formFieldsShopping.total.placeholder}
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
          formId={"formShopping"}
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
