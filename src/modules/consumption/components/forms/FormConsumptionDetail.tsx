import { Form } from "@/components";

import { FormFieldCommand } from "@/modules/core/components/form/fields/FormFieldCommand";
import { FormFieldInput } from "@/modules/core/components/form/fields/FormFieldInput";
import { FormProps } from "@/modules/core/interfaces";
import { useEffect } from "react";

import { Crop } from "@/modules/crops/interfaces/Crop";
import { Supply } from "@/modules/supplies/interfaces/Supply";
import { useConsumptionDetailForm } from "../../hooks/useConsumptionDetailForm";
import { formFieldsConsumptionDetail } from "../../utils/formFieldsConsumptionDetail";

export interface Props {
  isOpenDialogForm: boolean;
  setIsOpenDialogForm: any;
}
export const FormConsumptionDetail = ({
  onSubmit,
  defaultValues,
}: FormProps) => {
  const {
    formConsumptionDetails,
    queryCrops,
    querySupplies,
    openPopoverCrop,
    setOpenPopoverCrop,
    openPopoverSupply,
    setOpenPopoverSupply,
  } = useConsumptionDetailForm();

  useEffect(() => {
    if (defaultValues) {
      formConsumptionDetails.reset(defaultValues);
    }
  }, []);

  const findCropName = (id: string): string => {
    return (
      queryCrops?.data?.rows.find((item: Crop) => item.id === id)?.name || ""
    );
  };

  const findSupplyName = (id: string): string => {
    return (
      querySupplies?.data?.rows.find((item: Supply) => item.id === id)?.name ||
      ""
    );
  };

  const onSubmitConsumptionDetail = (values: any) => {
    const supplyIdForm = values.supply.id;
    const nameSupply = findSupplyName(supplyIdForm);
    const cropIdForm = values.crop.id;
    const nameCrop = findCropName(cropIdForm);
    const data = {
      ...values,
      supply: { id: supplyIdForm, name: nameSupply },
      crop: { id: cropIdForm, name: nameCrop },
    };
    onSubmit(data);
  };

  const { supply, crop, amount } = formFieldsConsumptionDetail;

  return (
    <div>
      <Form {...formConsumptionDetails}>
        <form
          onSubmit={formConsumptionDetails.handleSubmit(
            onSubmitConsumptionDetail
          )}
          className="mx-5"
          id="formConsumptionDetail"
        >
          {/* TODO: Arreglar selector de stock de insumo */}
          <FormFieldCommand
            openPopover={openPopoverSupply}
            setOpenPopover={setOpenPopoverSupply}
            data={querySupplies?.data?.rows ?? []}
            form={formConsumptionDetails}
            nameToShow={"name"}
            control={formConsumptionDetails.control}
            description={supply.description}
            label={supply.label}
            name={"supply.id"}
            placeholder={supply.placeholder}
            readOnly={false}
          />
          {/* TODO: Arreglar selector de cultivo */}
          <FormFieldCommand
            openPopover={openPopoverCrop}
            setOpenPopover={setOpenPopoverCrop}
            data={queryCrops?.data?.rows ?? []}
            form={formConsumptionDetails}
            nameToShow={"name"}
            control={formConsumptionDetails.control}
            description={crop.description}
            label={crop.label}
            name={"crop.id"}
            placeholder={crop.placeholder}
            readOnly={false}
          />

          <FormFieldInput
            control={formConsumptionDetails.control}
            description={amount.description}
            label={amount.label}
            name={"amount"}
            placeholder={amount.placeholder}
            readOnly={false}
          />
        </form>
      </Form>
    </div>
  );
};
