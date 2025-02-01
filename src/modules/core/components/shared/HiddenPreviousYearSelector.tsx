import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  handleVisibilityChange: (value: string) => void;
}

export const HiddenPreviousYearSelector = ({
  handleVisibilityChange,
}: Props) => {
  return (
    <Select onValueChange={handleVisibilityChange} defaultValue="show">
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="show">Mostrar año anterior</SelectItem>
        <SelectItem value="hide">Ocultar año anterior</SelectItem>
      </SelectContent>
    </Select>
  );
};
