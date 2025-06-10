import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components';
import {
    UnitsType,
    VolumeUnitOfMeasure
} from '@/modules/supplies/interfaces/UnitOfMeasure';

interface Props {
  onChange: React.Dispatch<React.SetStateAction<VolumeUnitOfMeasure>>;
  valueSelect: VolumeUnitOfMeasure;
  readOnly?: boolean;
}

export const SelectedVolumeUnitOfMeasure = ({
  onChange,
  valueSelect,
  readOnly = false,
}: Props) => {
  return (
    <Select
      onValueChange={(value: any) => {
        onChange(value);
      }}
      defaultValue={VolumeUnitOfMeasure.LITROS}
      value={valueSelect}
      disabled={readOnly}
    >
      <SelectTrigger>
        <SelectValue placeholder={'Selecciona una medida'} />
      </SelectTrigger>

      <SelectContent>
        {[...UnitsType['MILILITROS']].map((item: any) => (
          <SelectItem key={item.key} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
