import { FormFieldCommand } from '@/modules/core/components';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaSearchBarHarvest } from '../../../utils/formSchemaSearchBarHarvest';
import { formFieldsSearchBarHarvest } from '../../../utils/formFieldsSearchBarHarvest';

interface HarvestSearchBarCropFilterProps {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarHarvest>,
    unknown
  >;
  onAddFilter: (name: string) => Promise<boolean>;
  onClearErrors: (name: string) => void;
  paramsQuery: any;
  queryCrops: any;
  disabled?: boolean;
}

export const HarvestSearchBarCropFilter: React.FC<HarvestSearchBarCropFilterProps> = ({
  formSearchBar,
  onAddFilter,
  onClearErrors,
  paramsQuery,
  queryCrops,
  disabled = false,
}) => {
  return (
    <FormFieldCommand
      data={queryCrops?.data?.records || []}
      form={formSearchBar}
      nameToShow={'name'}
      control={formSearchBar.control}
      name={'crop'}
      placeholder={formFieldsSearchBarHarvest.crop.placeholder}
      className="lg:w-[300px]"
      description={''}
      label={''}
      disabled={disabled}
      actionFinal={() => onAddFilter('crop.id')}
      isLoading={queryCrops.isLoading || queryCrops.isFetching}
      reloadData={async () => {
        await queryCrops.refetch();
      }}
      contentTooltip="Actualizar datos de cultivo"
    />
  );
};
