import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

export const ErrorLoading = () => {
  return (
    <>
      <div className="flex items-center justify-center h-full">
        <Alert variant="destructive" className="mt-5 ml-5 w-96">
          <ExclamationTriangleIcon className="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>No se pudo cargar la información</AlertDescription>
        </Alert>
        <Button className="mt-5 ml-5" onClick={() => window.location.reload()}>
          Reintentar
        </Button>
      </div>
    </>
  );
};
