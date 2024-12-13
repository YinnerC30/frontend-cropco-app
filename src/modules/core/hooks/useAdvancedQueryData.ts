import { useSearchParams } from 'react-router-dom';

interface Props {
  params: string[];
}

export const useAdvancedQueryData = ({ params }: Props) => {
  const [searchParams] = useSearchParams();

  const paramsValues = params.reduce((acc, param) => {
    if (searchParams.has(param)) {
      acc[param] = searchParams.get(param);
    } else {
      acc[param] = undefined;
    }
    return acc;
  }, {} as Record<string, string | null | undefined>);

  return { paramsValues };
};
