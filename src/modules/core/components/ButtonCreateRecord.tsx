import { Link } from 'react-router-dom';

interface Props {
  route: any;
  className: string;
  disabled?: boolean;
}

export const ButtonCreateRecord = ({
  route,
  className,
  disabled = false,
}: Props) => {
  return (
    <Link
      to={!disabled && route}
      className={`${className} px-5 py-1 dark:text-black dark:bg-white rounded-sm bg-black text-white font-medium text-sm ${
        disabled && 'opacity-50'
      }`}
    >
      Crear
    </Link>
  );
};
