import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../utils";

const defaultValues = {
  name: undefined,
  description: undefined,
  units: undefined,
  location: undefined,
  dates: {
    date_of_creation: undefined,
    date_of_termination: undefined,
  },
};

export const useCropForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  return { form };
};
