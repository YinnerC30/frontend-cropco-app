import { Button } from '@/components';
import { Calendar } from 'lucide-react';

interface Props {
  label: string;
  dataTestId: string;
}

export const ButtonCalendarFilter: React.FC<Props> = ({ label, dataTestId }) => {
  return (
    <Button className="w-auto lg:w-[300px]" variant={'outline'} data-testid={dataTestId}>
      {label}
      <Calendar className="w-4 h-4 ml-4" />
    </Button>
  );
};
