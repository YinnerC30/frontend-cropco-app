import { Badge, Form, Separator } from '@/components';
import {
  FormDataTable,
  FormFieldCalendar,
  FormFieldCommand,
  FormFieldDataTable,
  FormFieldInput,
  FormFieldTextArea,
} from '@/modules/core/components';
import { FormatMoneyValue, FormatNumber } from '@/modules/core/helpers';
import { useFormHarvestContext } from '@/modules/harvests/hooks';
import { formFieldsHarvest } from '@/modules/harvests/utils';
import {
  columnsHarvestDetail,
  columnsHarvestDetailActions,
} from '../../columns/ColumnsTableHarvestDetail';

import { ModifyHarvestDetail } from '../../ModifyHarvestDetail';

import { useGetAllCrops } from '@/modules/crops/hooks';
import { CreateHarvestDetail } from '../CreateHarvestDetail';

export const FormHarvestFields = () => {
  const {
    form,
    onSubmit,
    readOnly,
    details,
    setHarvestDetail,
    setIsOpenDialogModifyForm,
    total,
    value_pay,
  } = useFormHarvestContext();

  const { query: queryCrops } = useGetAllCrops({
    searchParameter: '',
    allRecords: true,
    canExecuteQuery: !readOnly,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((formData: any) => {
          onSubmit(formData, details, total, value_pay);
        })}
        id="formHarvest"
        className="flex flex-col gap-2 ml-1"
      >
        <FormFieldCalendar
          control={form.control}
          description={formFieldsHarvest.date.description}
          label={formFieldsHarvest.date.label}
          name={'date'}
          placeholder={formFieldsHarvest.date.placeholder}
          readOnly={readOnly}
        />
        <FormFieldCommand
          data={queryCrops?.data?.rows || []}
          form={form}
          nameToShow={'name'}
          control={form.control}
          description={formFieldsHarvest.crop.description}
          label={formFieldsHarvest.crop.label}
          name={'crop.id'}
          placeholder={formFieldsHarvest.crop.placeholder}
          readOnly={readOnly}
          isLoading={queryCrops.isLoading}
        />
        <FormFieldTextArea
          control={form.control}
          description={formFieldsHarvest.observation.description}
          label={formFieldsHarvest.observation.label}
          name={'observation'}
          placeholder={formFieldsHarvest.observation.placeholder}
          readOnly={readOnly}
        />

        <Separator className="w-full my-5" />

        <FormFieldDataTable
          control={form.control}
          description={''}
          label={formFieldsHarvest.details.label}
          name={'details'}
          placeholder={''}
          readOnly={readOnly}
        >
          {/* TODO: Refactor */}
          <CreateHarvestDetail />

          {/* TODO: Refactor */}
          <FormDataTable
            data={details}
            columns={
              readOnly ? columnsHarvestDetail : columnsHarvestDetailActions
            }
            setRecord={!readOnly && setHarvestDetail}
            sideEffect={!readOnly && setIsOpenDialogModifyForm}
            nameColumnToFilter={'employee_first_name'}
            placeholderInputToFilter={'Buscar empleado por nombre...'}
          />
        </FormFieldDataTable>

        {/* TODO: Refactor */}
        <ModifyHarvestDetail />

        {/* TODO: Refactor */}
        <FormFieldInput
          className=""
          control={form.control}
          description={formFieldsHarvest.total.description}
          label={formFieldsHarvest.total.label}
          name={'total'}
          placeholder={formFieldsHarvest.total.placeholder}
          readOnly={true}
          type="number"
        >
          <Badge
            className="block h-8 text-base text-center w-28"
            variant={'cyan'}
          >
            {FormatNumber(total)}
          </Badge>
        </FormFieldInput>

        {/* TODO: Refactor */}
        <FormFieldInput
          className=""
          control={form.control}
          description={formFieldsHarvest.value_pay.description}
          label={formFieldsHarvest.value_pay.label}
          name={'value_pay'}
          placeholder={formFieldsHarvest.value_pay.placeholder}
          readOnly={true}
          type="number"
        >
          <Badge
            className="block h-8 text-base text-center w-28"
            variant={'indigo'}
          >
            {FormatMoneyValue(value_pay)}
          </Badge>
        </FormFieldInput>
      </form>
    </Form>
  );
};
