import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Separator,
} from "@/components";
import { EyeClosedIcon, EyeOpenIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useLoginForm } from "../hooks/useLoginForm";
import { useLoginUser } from "../hooks/useLoginUser";
import { formFields } from "../utils/formFields";
import { formSchema } from "../utils/formSchema";
import { RootState, useAppSelector } from "@/redux/store";
import { useEffect } from "react";

// TODO: Centrar y darle estilos adecuados al componentes
export const Login = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.authentication);

  useEffect(() => {
    if (user.token.length > 0) {
      navigate("/");
    }
  }, [user]);
  const {
    form,
    isPending,
    showPassword,
    togglePasswordVisibility,
    saveUserInLocalStorage,
  } = useLoginForm();

  const { mutate, isSuccess, data } = useLoginUser();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  if (isSuccess) {
    saveUserInLocalStorage(data.data);
    navigate("/");
  }

  return (
    <>
      <Label className="text-2xl">Iniciar sesión - Usuario</Label>
      <Separator className="my-2" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id="formLogin"
          className="flex flex-col gap-2 ml-1"
        >
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formFields.email.label}</FormLabel>
                <FormControl>
                  <Input
                    className="w-56"
                    placeholder={formFields.email.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {formFields.email.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`password`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formFields.password.label}</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      className="w-56"
                      {...field}
                      type={showPassword ? "text" : "password"}
                    />
                  </FormControl>
                  <Button onClick={(e) => togglePasswordVisibility(e)}>
                    {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </Button>
                </div>
                <FormDescription>
                  {formFields.password.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>

        <div className="flex w-48 gap-2 mt-2">
          <Button type="submit" form="formLogin" disabled={isPending}>
            {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
            Ingresar
          </Button>
        </div>
      </Form>
    </>
  );
};
