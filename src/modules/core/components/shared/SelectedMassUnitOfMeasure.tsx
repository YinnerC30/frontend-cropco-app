import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from '@/components';
import {
  MassUnitOfMeasure,
  UnitsType,
} from '@/modules/supplies/interfaces/UnitOfMeasure';

interface Props {
  onChange: React.Dispatch<React.SetStateAction<MassUnitOfMeasure>>;
  valueSelect: MassUnitOfMeasure;
  readOnly?: boolean;
}

export const SelectedMassUnitOfMeasure = ({
  onChange,
  valueSelect,
  readOnly = false,
}: Props) => {
  return (
    <Select
      onValueChange={(value: any) => {
        onChange(value);
      }}
      defaultValue={MassUnitOfMeasure.KILOGRAMOS}
      value={valueSelect}
      disabled={readOnly}
    >
      <SelectTrigger data-testid="btn-select-mass-unit-of-measure" data-value={valueSelect}>
        <SelectValue
          placeholder={'Selecciona una medida'}
          data-testid="select-current-value"
        />
      </SelectTrigger>

      <SelectContent>
        {UnitsType.MASS.map((item: any) => (
          <SelectItem key={item.key} value={item.value} data-value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
