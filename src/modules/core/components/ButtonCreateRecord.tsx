import { Link } from 'react-router-dom';

interface Props {
  route: any;
  className?: string;
  disabled?: boolean;
}

export const ButtonCreateRecord = ({
  route,
  className = '',
  disabled = false,
}: Props) => {
  return (
    <Link
      to={!disabled && route}
      className={`${className}dark:text-black dark:bg-white rounded-sm bg-black text-white font-medium text-sm  flex-none py-2 px-2 ${
        disabled && 'opacity-50'
      }`}
    >
      Crear
    </Link>
  );
};
