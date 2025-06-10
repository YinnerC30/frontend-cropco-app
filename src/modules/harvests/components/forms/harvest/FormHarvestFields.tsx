import {
  Badge,
  Form,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import {
  FormFieldCalendar,
  FormFieldCommand,
  FormFieldDataTable,
  FormFieldInput,
  FormFieldTextArea,
} from '@/modules/core/components';
import { FormatMoneyValue } from '@/modules/core/helpers';
import { useFormHarvestContext } from '@/modules/harvests/hooks';
import { formFieldsHarvest } from '@/modules/harvests/utils';

import { useGetAllCrops } from '@/modules/crops/hooks';
import {
  MassUnitOfMeasure,
  UnitsType,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { FormHarvestDataTable } from './FormHarvestDataTable';

export const FormHarvestFields: React.FC = () => {
  const {
    formHarvest,
    onSubmit,
    readOnly,
    amount,
    value_pay,
    unitTypeToShowAmount,
    setUnitTypeToShowAmount,
  } = useFormHarvestContext();

  const disabledCropField =
    formHarvest.formState.defaultValues?.crop?.id !== '';

  const { query: queryCrops } = useGetAllCrops({
    queryValue: '',
    all_records: true,
  });

  return (
    <Form {...formHarvest}>
      <form
        onSubmit={formHarvest.handleSubmit(onSubmit)}
        id="formHarvest"
        className="flex flex-col lg:justify-evenly lg:flex-row"
      >
        <div className="w-3/4 lg:w-[40%]">
          <FormFieldCalendar
            control={formHarvest.control}
            description={formFieldsHarvest.date.description}
            label={formFieldsHarvest.date.label}
            name={'date'}
            placeholder={formFieldsHarvest.date.placeholder}
            disabled={readOnly}
            className="w-[240px]"
          />
          <FormFieldCommand
            data={
              queryCrops.isSuccess
                ? [
                    ...queryCrops.data?.records,
                    formHarvest.formState.defaultValues?.crop,
                  ]
                : []
            }
            form={formHarvest}
            nameToShow={'name'}
            control={formHarvest.control}
            description={formFieldsHarvest.crop.description}
            label={formFieldsHarvest.crop.label}
            name={'crop'}
            placeholder={formFieldsHarvest.crop.placeholder}
            disabled={readOnly || disabledCropField}
            isLoading={queryCrops.isLoading || queryCrops.isRefetching}
            nameEntity="cultivo"
            className="w-52"
            reloadData={async () => {
              await queryCrops.refetch();
            }}
          />
          <FormFieldTextArea
            className="w-72"
            control={formHarvest.control}
            description={formFieldsHarvest.observation.description}
            label={formFieldsHarvest.observation.label}
            name={'observation'}
            placeholder={formFieldsHarvest.observation.placeholder}
            disabled={readOnly}
          />
        </div>

        <div className="lg:w-[50%]">
          <FormFieldDataTable
            control={formHarvest.control}
            description={''}
            label={formFieldsHarvest.details.label}
            name={'details'}
            placeholder={''}
            disabled={readOnly}
          >
            <FormHarvestDataTable />
          </FormFieldDataTable>

          <FormFieldInput
            control={formHarvest.control}
            description={formFieldsHarvest.amount.description}
            label={formFieldsHarvest.amount.label}
            name={'amount'}
            placeholder={formFieldsHarvest.amount.placeholder}
            disabled={true}
            type="number"
            hiddenInput
            allowDecimals
          >
            <div className="flex items-center w-auto gap-2 py-4">
              <Badge
                className="block h-8 text-base text-center w-28"
                variant={'cyan'}
              >
                {Number.isInteger(amount) ? amount : amount.toFixed(2)}
              </Badge>

              <Select
                onValueChange={(value: any) => {
                  setUnitTypeToShowAmount(value);
                }}
                defaultValue={MassUnitOfMeasure.KILOGRAMOS}
                value={unitTypeToShowAmount}
                disabled={readOnly}
              >
                <SelectTrigger /* ref={field.ref} */>
                  <SelectValue placeholder={'Selecciona una medida'} />
                </SelectTrigger>

                <SelectContent>
                  {[...UnitsType['GRAMOS']].map((item: any) => (
                    <SelectItem key={item.key} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormFieldInput>

          {/* TODO: Refactor */}
          <FormFieldInput
            className=""
            control={formHarvest.control}
            description={formFieldsHarvest.value_pay.description}
            label={formFieldsHarvest.value_pay.label}
            name={'value_pay'}
            placeholder={formFieldsHarvest.value_pay.placeholder}
            disabled={true}
            type="number"
            hiddenInput
            allowDecimals
          >
            <Badge
              className="block h-8 text-base text-center w-28"
              variant={'indigo'}
            >
              {FormatMoneyValue(value_pay)}
            </Badge>
          </FormFieldInput>
        </div>
      </form>
    </Form>
  );
};
