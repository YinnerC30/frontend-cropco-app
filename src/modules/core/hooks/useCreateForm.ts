import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  schema: z.ZodObject<any>;
  defaultValues: any;
}

export const useCreateForm = ({ schema, defaultValues }: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  return form;
};
