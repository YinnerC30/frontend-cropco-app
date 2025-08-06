import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import { Link } from 'react-router-dom';

interface Props {
  path: string;
  Icon: React.ForwardRefExoticComponent<
    (IconProps & React.RefAttributes<SVGSVGElement>) | any
  >;
  name: string;
  disabled?: boolean;
  dataTestId?: string;
}

export const ItemNavigate = ({
  path,
  Icon,
  name,
  disabled = false,
  dataTestId,
}: Props) => {
  return (
    <DropdownMenuItem asChild disabled={disabled} data-testid={dataTestId}>
      <Link
        to={`${!disabled ? path : ''}`}
        className={`${disabled && 'opacity-50'}  ${
          disabled ? 'cursor-default' : 'cursor-pointer'
        } text-foreground font-medium`}
      >
        <Icon className="w-full h-4 mr-2 " /> {name}
      </Link>
    </DropdownMenuItem>
  );
};
