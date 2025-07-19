import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from '@/components';
import {
  LengthUnitOfMeasure,
  UnitsType,
} from '@/modules/supplies/interfaces/UnitOfMeasure';

interface Props {
  onChange: React.Dispatch<React.SetStateAction<LengthUnitOfMeasure>>;
  valueSelect: LengthUnitOfMeasure;
  readOnly?: boolean;
}

export const SelectedLengthUnitOfMeasure = ({
  onChange,
  valueSelect,
  readOnly = false,
}: Props) => {
  return (
    <Select
      onValueChange={(value: any) => {
        onChange(value);
      }}
      defaultValue={LengthUnitOfMeasure.METROS}
      value={valueSelect}
      disabled={readOnly}
    >
      <SelectTrigger>
        <SelectValue placeholder={'Selecciona una medida'} />
      </SelectTrigger>

      <SelectContent>
        {[...UnitsType['MILIMETROS']].map((item: any) => (
          <SelectItem key={item.key} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}; 