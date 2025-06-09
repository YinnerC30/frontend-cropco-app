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
      <SelectTrigger>
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
  );
};
