import { zodResolver } from '@hookform/resolvers/zod';
import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { ToolTipTemplate } from './ToolTipTemplate';

interface Props {
  search: string;
}

export const SearchBar = ({ search }: Props) => {
  const navigate = useNavigate();

  const formSchema = z.object({
    search: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search,
    },
  });

  const onReset = () => {
    form.reset({ search: '' });
    navigate(`../view`);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    navigate(`?search=${values.search.trim()}`);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-5"
            id="formUser"
          >
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="my-1">
                  <FormControl>
                    <Input
                      className="w-80"
                      placeholder="Introduce algún parámetro de búsqueda"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex flex-row gap-4">
          <ToolTipTemplate content="Buscar">
            <Button type="submit" form="formUser">
              <MagnifyingGlassIcon className="w-4 h-4" />
            </Button>
          </ToolTipTemplate>
          <ToolTipTemplate content="Borrar">
            <Button onClick={() => onReset()}>
              <Cross1Icon />
            </Button>
          </ToolTipTemplate>
        </div>
      </div>
    </>
  );
};
