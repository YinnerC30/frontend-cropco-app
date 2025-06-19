import { ActionNavigate } from '@/modules/core/components';
import { GlobeIcon } from '@radix-ui/react-icons';

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
    <ActionNavigate
      path={path}
      Icon={GlobeIcon}
      name={'Visitar'}
      disabled={disabled}
      target="_blank"
    />
  );
};
