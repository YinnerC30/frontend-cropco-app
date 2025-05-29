import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@/components';
import { Search, X } from 'lucide-react';
import { useCreateForm } from '../../hooks/useCreateForm';
import { ToolTipTemplate } from '../shared/ToolTipTemplate';

interface BasicSearchBarProps {
  query: string;
  autoFocus?: boolean;
  disabled?: boolean;
}

export const BasicSearchBar = ({
  query = '',
  autoFocus = false,
  disabled = false,
}: BasicSearchBarProps) => {
  const navigate = useNavigate();

  const formSchema = z.object({
    query: z.string().trim(),
  });

  const form = useCreateForm({
    schema: formSchema,
    defaultValues: {
      query,
    },
    skipDirty: true,
  });

  const onReset = () => {
    form.reset({ query: '' });
    navigate(window.location.pathname);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const query = values.query.trim();
    if (query.length > 0) {
      navigate(`?query=${query}`);
    }
  };

  return (
    <div className="flex flex-row justify-center w-3/4 gap-4 my-4 min-w-80">
      <div className="w-[70%] lg:w-96 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="formSearchBar">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Escribe algo..."
                      autoFocus={autoFocus}
                      disabled={disabled}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="flex flex-row items-center justify-end gap-1 ">
        <ToolTipTemplate content="Ejecutar busqueda">
          <Button
            type="submit"
            form="formSearchBar"
            disabled={disabled}
            size={'icon'}
            variant={'outline'}
          >
            <Search className="w-4 h-4" />
            <span className="sr-only">Buscar</span>
          </Button>
        </ToolTipTemplate>
        <ToolTipTemplate content="Eliminar busqueda">
          <Button
            onClick={() => onReset()}
            disabled={disabled}
            size={'icon'}
            variant={'outline'}
            className='bg-destructive hover:bg-destructive/80'
          >
            <X className="w-4 h-4" />
            <span className="sr-only">Limpiar</span>
          </Button>
        </ToolTipTemplate>
      </div>
    </div>
  );
};
