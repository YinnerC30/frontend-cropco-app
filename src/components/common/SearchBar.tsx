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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface Props {
  parameter: string;
}

export const SearchBar = ({ parameter }: Props) => {
  const navigate = useNavigate();

  const formSchema = z.object({
    parameter: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parameter,
    },
  });

  const onReset = () => {
    form.reset({ parameter: '' });
    navigate(`../view`);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    navigate(`?search=${values.parameter.trim()}`);
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="submit" form="formUser">
                  <MagnifyingGlassIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Buscar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => onReset()}>
                  <Cross1Icon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Borrar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  );
};
