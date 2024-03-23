import { setSearchParameter } from '@/features/users/usersModuleSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
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

export const SearchBar = () => {
  const dispatch = useDispatch();

  const formSchema = z.object({
    parameter: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parameter: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    dispatch(setSearchParameter(values));
  };

  const onReset = () => {
    form.reset();
    dispatch(setSearchParameter({ parameter: '' }));
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
              name="parameter"
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
          <Button type="submit" form="formUser">
            <MagnifyingGlassIcon className="w-4 h-4" />
          </Button>
          <Button onClick={() => onReset()}>
            <Cross1Icon />
          </Button>
        </div>
      </div>
    </>
  );
};
