import { FormFieldCommand } from '@/modules/core/components';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaSearchBarWork } from '../../../utils/formSchemaSearchBarWork';
import { formFieldsSearchBarWork } from '../../../utils/formFieldsSearchBarWork';

interface WorkSearchBarCropFilterProps {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarWork>,
    unknown
  >;
  onAddFilter: (name: string) => Promise<boolean>;
  onClearErrors: (name: string) => void;
  paramsQuery: Record<string, unknown>;
  queryCrops: {
    data?: { records: Array<{ id: string; name: string }> };
    isLoading: boolean;
    isFetching: boolean;
    refetch: () => Promise<unknown>;
  };
  disabled?: boolean;
}

export const WorkSearchBarCropFilter: React.FC<
  WorkSearchBarCropFilterProps
> = ({ formSearchBar, onAddFilter, queryCrops, disabled = false }) => {
  return (
    <FormFieldCommand
      data={queryCrops?.data?.records || []}
      form={formSearchBar}
      nameToShow={'name'}
      control={formSearchBar.control}
      name={'crop'}
      placeholder={formFieldsSearchBarWork.crop.placeholder}
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
