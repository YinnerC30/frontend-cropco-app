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
      <SelectTrigger data-testid='btn-select-length-unit-of-measure' data-value={valueSelect}>
        <SelectValue data-testid='select-current-value' placeholder={'Selecciona una medida'}  />
      </SelectTrigger>

      <SelectContent>
        {UnitsType.LENGTH.map((item: any) => (
          <SelectItem key={item.key} value={item.value} data-value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
