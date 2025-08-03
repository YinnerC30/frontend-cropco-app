import { DropdownMenuItem } from '@/components';
import { GlobeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

interface Props {
  subdomain: string;
  disabled?: boolean;
  path?: string;
}
export const ActionVisitSiteTenant = ({
  subdomain,
  disabled = false,
  path = `http://${subdomain}.${
    import.meta.env.DEV ? 'localhost:5173' : 'cropco.org'
  }/app/authentication/login`,
}: Props) => {
  return (
    <DropdownMenuItem disabled={disabled} asChild>
      <Link
        // data-testid={dataTestId}
        to={`${!disabled ? path : ''}`}
        target={'_blank'}
        className={`${disabled && 'opacity-50'}  ${
          disabled ? 'cursor-default' : 'cursor-pointer'
        } text-foreground font-medium`}
      >
        <GlobeIcon className="w-full h-4 mr-2 " /> Visitar
      </Link>
    </DropdownMenuItem>
  );
};
