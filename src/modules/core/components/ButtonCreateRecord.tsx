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
  console.log({ route });
  return (
    <>
      <Link to={route} className={`${className}`}>
        Crear
      </Link>
    </>
  );
};
