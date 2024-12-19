import { useSearchParams } from 'react-router-dom';

interface UseBasicQueryDataReturn {
  value: string;
}

export const useBasicQueryData = (): UseBasicQueryDataReturn => {
  const [URLSearchParams] = useSearchParams();
  const value = URLSearchParams.get('query') ?? '';
  return { value };
};
