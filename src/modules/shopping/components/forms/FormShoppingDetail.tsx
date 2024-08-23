import { Form } from "@/components";
import { FormFieldCommand } from "@/modules/core/components/form/FormFieldCommand";
import { FormFieldInput } from "@/modules/core/components/form/FormFieldInput";
import { FormProps } from "@/modules/core/interfaces";
import { useShoppingDetailForm } from "../../hooks/useShoppingDetailForm";
import { formFieldsShoppingDetail } from "../../utils/formFieldsShoppingDetail";
import { useEffect } from "react";
import { Supplier } from "@/modules/suppliers/interfaces/Supplier";
import { Supply } from "@/modules/supplies/interfaces/Supply";
import { ErrorLoading, Loading } from "@/modules/core/components";

export const FormShoppingDetail = ({ onSubmit, defaultValues }: FormProps) => {
  const {
    formShoppingDetail,
    querySuppliers,
    querySupplies,
    openPopoverSupplier,
    openPopoverSupply,
    setOpenPopoverSupplier,
    setOpenPopoverSupply,
  } = useShoppingDetailForm();

  useEffect(() => {
    if (defaultValues) {
      console.log(defaultValues);
      formShoppingDetail.reset({
        supply: defaultValues.supply,
        supplier: defaultValues.supplier,
        total: defaultValues.total,
        amount: defaultValues.amount,
      });
    }
  }, []);

  const findSupplierName = (id: string): string => {
    return (
      querySuppliers?.data?.rows.find((item: Supplier) => item.id === id)
        ?.first_name || ""
    );
  };
  const findSupplyName = (id: string): string => {
    return (
      querySupplies?.data?.rows.find((item: Supply) => item.id === id)?.name ||
      ""
    );
  };

  const onSubmitShoppingDetail = (values: any) => {
    const supplierIdForm = values.supplier.id;
    const supplyIdForm = values.supply.id;
    const nameSupplier = findSupplierName(supplierIdForm);
    const nameSupply = findSupplyName(supplyIdForm);
    const data = {
      ...values,
      supplier: { id: supplierIdForm, first_name: nameSupplier },
      supply: { id: supplyIdForm, name: nameSupply },
    };
    onSubmit(data);
  };

  if (querySupplies.isLoading) {
    return <Loading />;
  }

  if (querySupplies.isError) {
    return <ErrorLoading />;
  }

  if (querySuppliers.isLoading) {
    return <Loading />;
  }

  if (querySuppliers.isError) {
    return <ErrorLoading />;
  }

  console.log(defaultValues);
  return (
    <Form {...formShoppingDetail}>
      <form
        onSubmit={formShoppingDetail.handleSubmit(onSubmitShoppingDetail)}
        className="mx-5"
        id="formShoppingDetail"
      >
        {/* TODO: Mejorar select de insumo */}
        <FormFieldCommand
          openPopover={openPopoverSupply}
          setOpenPopover={setOpenPopoverSupply}
          data={querySupplies?.data?.rows ?? []}
          form={formShoppingDetail}
          nameToShow={"name"}
          control={formShoppingDetail.control}
          description={formFieldsShoppingDetail.supply.description}
          label={formFieldsShoppingDetail.supply.label}
          name={"supply.id"}
          placeholder={formFieldsShoppingDetail.supply.placeholder}
          readOnly={false}
        />
        {/* TODO: Mejorar select de proveedor */}
        <FormFieldCommand
          openPopover={openPopoverSupplier}
          setOpenPopover={setOpenPopoverSupplier}
          data={querySuppliers?.data?.rows ?? []}
          form={formShoppingDetail}
          nameToShow={"first_name"}
          control={formShoppingDetail.control}
          description={formFieldsShoppingDetail.supplier.description}
          label={formFieldsShoppingDetail.supplier.label}
          name={"supplier.id"}
          placeholder={formFieldsShoppingDetail.supplier.placeholder}
          readOnly={false}
        />

        <FormFieldInput
          control={formShoppingDetail.control}
          description={formFieldsShoppingDetail.amount.description}
          label={formFieldsShoppingDetail.amount.label}
          name={"amount"}
          placeholder={formFieldsShoppingDetail.amount.placeholder}
          readOnly={false}
          type="number"
        />
        <FormFieldInput
          control={formShoppingDetail.control}
          description={formFieldsShoppingDetail.total.description}
          label={formFieldsShoppingDetail.total.label}
          name={"total"}
          placeholder={formFieldsShoppingDetail.total.placeholder}
          readOnly={false}
          type="number"
        />
      </form>
    </Form>
  );
};
