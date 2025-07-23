import { Button } from '@/components';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  return (
    <DropdownMenuItem disabled={disabled} asChild>
      <Button
        type="button"
        variant={'ghost'}
        onClick={() => {
          if (target === '_blank') {
            window.open(path, '_blank');
          } else {
            navigate(path);
          }
        }}
        data-testid={dataTestId}
        disabled={disabled}
      >
        <Icon className="w-4 h-4 mr-2" /> {name}
      </Button>
      {/* <Link
        data-testid={dataTestId}
        to={`${!disabled ? path : ''}`}
        target={target}
        className={`${disabled && 'opacity-50'}  ${
          disabled ? 'cursor-default' : 'cursor-pointer'
        } text-foreground font-medium`}
      >
        <Icon className="w-full h-4 mr-2 " /> {name}
      </Link> */}
    </DropdownMenuItem>
  );
};
