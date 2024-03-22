import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formSchema } from '@/features/users/form/ElementsUserForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useState } from 'react';

export interface DialogProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  formSchema: any;
  defaultValues: any;
  formFields: any;
  nameButtonTrigger: string;
}

export function DialogTemplate({
  onSubmit,
  defaultValues,
  formSchema,
  formFields,
  nameButtonTrigger,
}: DialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{nameButtonTrigger}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{nameButtonTrigger}</DialogTitle>
          <DialogDescription>
            Rellena los campos para crear el registro.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea
          style={{
            width: '400px',
            height: '300px',
          }}
        >
          <Form {...form}>
            <form
              id="formTemplate"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              {formFields.map((record: any) => (
                <FormField
                  key={record.name}
                  control={form.control}
                  name={record.name}
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-left">
                        {record.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          style={{
                            width: '280px',
                          }}
                          className="col-span-3"
                          placeholder={record.placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage
                        style={{
                          marginLeft: '100px',
                        }}
                        className="col-span-4"
                      />
                    </FormItem>
                  )}
                />
              ))}
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type="submit" form="formTemplate">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
