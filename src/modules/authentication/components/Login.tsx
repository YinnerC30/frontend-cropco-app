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
} from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    if (user?.token.length > 0) {
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

  const { email, password } = formFields;

  return (
    <div className="flex items-center justify-center h-screen max-w-sm mx-auto space-y-6">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Inicio de sesión
          </CardTitle>
          <CardDescription className="text-gray-500">
            Ingresa tu usuario y contraseña para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="formLogin"
              className="flex flex-col gap-4 mt-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{email.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={email.placeholder} {...field} />
                    </FormControl>
                    <FormDescription>{email.description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{password.label}</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="p-2"
                      >
                        {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                      </Button>
                    </div>
                    <FormDescription>{password.description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="submit"
            form="formLogin"
            className="w-full mt-4"
            disabled={isPending}
          >
            {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
            Ingresar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
