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
import { useCreateForm } from '../../hooks/useCreateForm';
import { ToolTipTemplate } from '../ToolTipTemplate';

interface Props {
  query: string;
  autoFocus?: boolean;
}

export const BasicSearchBar = ({ query = '', autoFocus = false }: Props) => {
  const navigate = useNavigate();

  const formSchema = z.object({
    query: z.string(),
  });

  const form = useCreateForm({
    schema: formSchema,
    defaultValues: {
      query,
    },
  });

  const onReset = () => {
    form.reset({ query: '' });
    navigate(`../all`);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const query = values.query.trim();
    if (query.length > 0) {
      navigate(`?query=${query}`);
    }
  };

  return (
    <>
      <div className="flex flex-row ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="formSearchBar">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-80"
                      placeholder="Escribe algo..."
                      autoFocus={autoFocus}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex flex-row gap-1 ml-2">
          <ToolTipTemplate content="Buscar">
            <Button type="submit" form="formSearchBar">
              Buscar
            </Button>
          </ToolTipTemplate>
          <ToolTipTemplate content="Borrar">
            <Button onClick={() => onReset()}>Limpiar</Button>
          </ToolTipTemplate>
        </div>
      </div>
    </>
  );
};
