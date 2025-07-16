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
  target?: string;
  dataTestId?: string;
}

export const ActionNavigate = ({
  path,
  Icon,
  name,
  disabled = false,
  target = '_self',
  dataTestId = 'link-navigate-template',
}: Props) => {
  return (
    <DropdownMenuItem asChild disabled={disabled}>
      <Link
        data-testid={dataTestId}
        to={`${!disabled ? path : ''}`}
        target={target}
        className={`${disabled && 'opacity-50'}  ${
          disabled ? 'cursor-default' : 'cursor-pointer'
        } text-foreground font-medium`}
      >
        <Icon className="w-full h-4 mr-2 " /> {name}
      </Link>
    </DropdownMenuItem>
  );
};
