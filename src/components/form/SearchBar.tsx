import { setSearchParameter } from '@/features/users/usersModuleSlice';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { z } from 'zod';
import { FormTemplate } from './FormTemplate';
import { SearchBarProps } from './interfaces/SearchBarProps';

export const SearchBar = ({ searchTerms }: SearchBarProps) => {
  const dispatch = useAppDispatch();
  const parameter = useAppSelector(state => state.usersModule.searchParameter);

  const formSchema = z.object({
    parameter: z.string(),
  });

  const formFields = [
    {
      name: 'parameter',
      label: '',
      placeholder: `Ingrese uno de los siguientes términos de búsqueda: ${searchTerms.slice(
        0,
        searchTerms.length - 1,
      )} o ${searchTerms[searchTerms.length - 1]} `,
      description: '',
    },
  ];

  const defaultValues = {
    parameter,
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(setSearchParameter(values.parameter));
  };

  const handleDeleteSearchParameter = () => {
    dispatch(setSearchParameter(''));
  };

  return (
    <>
      <FormTemplate
        formSchema={formSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        formFields={formFields}
        nameButtonSubmit="Buscar"
        onResetValues={handleDeleteSearchParameter}
        nameButtonReset="X"
      />
    </>
  );
};
