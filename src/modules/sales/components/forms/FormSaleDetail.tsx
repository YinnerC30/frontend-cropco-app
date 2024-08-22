import { Form } from "@/components";
import { Client } from "@/modules/clients/interfaces/Client";
import { ErrorLoading, Loading } from "@/modules/core/components";
import { FormFieldCommand } from "@/modules/core/components/form/FormFieldCommand";
import { FormFieldInput } from "@/modules/core/components/form/FormFieldInput";
import { FormProps } from "@/modules/core/interfaces/FormProps";
import { useEffect } from "react";
import { useSaleDetailForm } from "../../hooks/useSaleDetailForm";
import { SaleDetail } from "../../interfaces";
import { formFieldsSaleDetail } from "../../utils";

export const FormSaleDetail = ({
  onSubmit,
  readOnly = false,
  defaultValues,
}: FormProps) => {
  const {
    formSaleDetail,
    openPopoverClient,
    setOpenPopoverClient,
    setOpenPopoverHarvestStock,
    openPopoverHarvestStock,
    queryClients,
    queryHarvestStock,
    details,
  } = useSaleDetailForm();

  useEffect(() => {
    if (defaultValues) {
      formSaleDetail.reset({
        crop: defaultValues.crop,
        client: defaultValues.client,
        total: defaultValues.total,
        quantity: defaultValues.quantity,
      });
    }
  }, []);

  const findClientName = (id: string): string => {
    return (
      queryClients?.data?.rows.find((item: Client) => item.id === id)
        ?.first_name || ""
    );
  };
  const findCropName = (id: string): string => {
    return (
      queryHarvestStock?.data?.rows.find((item: any) => item.id === id)?.name ||
      ""
    );
  };

  const onSubmitSaleDetail = (values: any) => {
    
    const clientIdForm = values.client.id;
    const cropIdForm = values.crop.id;
    const nameClient = findClientName(clientIdForm);
    const nameCrop = findCropName(cropIdForm);
    const data = {
      ...values,
      client: { id: clientIdForm, first_name: nameClient },
      crop: { id: cropIdForm, name: nameCrop },
    };
    onSubmit(data);
  };

  const filterCropsToShow = (): any[] => {
    return (
      queryHarvestStock?.data?.rows.filter((record: any) => {
        const state = details.some(
          (item: SaleDetail) => item.crop.id === record.id
        );
        if (state && record.id !== defaultValues?.crop?.id) {
          return;
        }
        return record;
      }) || []
    );
  };
  const filterClientsToShow = (): Client[] => {
    return (
      queryClients?.data?.rows.filter((record: Client) => {
        const state = details.some(
          (item: SaleDetail) => item.client.id === record.id
        );
        if (state && record.id !== defaultValues?.client?.id) {
          return;
        }
        return record;
      }) || []
    );
  };

  if (queryClients.isLoading) {
    return <Loading />;
  }

  if (queryClients.isError) {
    return <ErrorLoading />;
  }
  return (
    <>
      <Form {...formSaleDetail}>
        <form
          onSubmit={formSaleDetail.handleSubmit(onSubmitSaleDetail)}
          className="mx-5"
          id="formSaleDetail"
        >
          <FormFieldCommand
            openPopover={openPopoverHarvestStock}
            setOpenPopover={setOpenPopoverHarvestStock}
            data={filterCropsToShow() ?? []}
            form={formSaleDetail}
            nameToShow={"name"}
            control={formSaleDetail.control}
            description={formFieldsSaleDetail.crop.description}
            label={formFieldsSaleDetail.crop.label}
            name={"crop.id"}
            placeholder={formFieldsSaleDetail.crop.placeholder}
            readOnly={readOnly}
          />
          <FormFieldCommand
            openPopover={openPopoverClient}
            setOpenPopover={setOpenPopoverClient}
            data={filterClientsToShow() ?? []}
            form={formSaleDetail}
            nameToShow={"first_name"}
            control={formSaleDetail.control}
            description={formFieldsSaleDetail.client.description}
            label={formFieldsSaleDetail.client.label}
            name={"client.id"}
            placeholder={formFieldsSaleDetail.client.placeholder}
            readOnly={readOnly}
          />

          <FormFieldInput
            control={formSaleDetail.control}
            description={formFieldsSaleDetail.quantity.description}
            label={formFieldsSaleDetail.quantity.label}
            name={"quantity"}
            placeholder={formFieldsSaleDetail.quantity.placeholder}
            readOnly={readOnly}
            type="number"
          />

          <FormFieldInput
            control={formSaleDetail.control}
            description={formFieldsSaleDetail.total.description}
            label={formFieldsSaleDetail.total.label}
            name={"total"}
            placeholder={formFieldsSaleDetail.total.placeholder}
            readOnly={readOnly}
            type="number"
          />
        </form>
      </Form>
    </>
  );
};
