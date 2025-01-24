import { useSearchParams } from 'react-router-dom';

export interface ItemQueryAdvanced {
  propertyName: string;
  defaultValue: any;
  isArray?: boolean;
}

export const useAdvancedQueryDataPlus = (params: ItemQueryAdvanced[]) => {
  const [searchParams] = useSearchParams();

  let hasValues = false;

  const paramsValues = params.reduce((acc, param) => {
    if (searchParams.has(param.propertyName)) {
      hasValues = true;
      acc[param.propertyName] = !param.isArray
        ? searchParams.get(param.propertyName)
        : searchParams.get(param.propertyName)?.split(',');
    } else {
      acc[param.propertyName] = param.defaultValue;
    }
    return acc;
  }, {} as Record<string, any>);

  return { paramsValues, hasValues };
};
