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
import { RootState, useAppSelector } from "@/redux/store";
import { EyeClosedIcon, EyeOpenIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useLoginForm } from "../hooks/useLoginForm";
import { extractValueFromParentheses } from "../utils/extractValueFromParentheses";
import { formFields } from "../utils/formFields";
import { formSchema } from "../utils/formSchema";

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
    mutate,
    isError,
    isPending,
    isSuccess,
    showPassword,
    togglePasswordVisibility,
    data,
    error,
    saveUserInLocalStorage,
  } = useLoginForm();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  if (isSuccess) {
    saveUserInLocalStorage(data?.data);
    navigate("/");
  }

  useEffect(() => {
    if (isError) {
      handleLoginError(error);
    }
  }, [isError, error]);

  const handleLoginError = (axiosError: any) => {
    const { statusCode, message } = axiosError.response.data;
    const fieldValue = extractValueFromParentheses(message);
    if (statusCode === 401 && fieldValue === "email") {
      form.setError("email", { message: "El usuario ingresado no existe" });
    } else {
      form.setError("password", { message: "La contraseña es incorrecta" });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div>
        <Label className="text-2xl">Iniciar sesión</Label>
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
                        type={showPassword ? "text" : "password"}
                        {...field}
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
              {isPending && (
                <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
              )}
              Ingresar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
