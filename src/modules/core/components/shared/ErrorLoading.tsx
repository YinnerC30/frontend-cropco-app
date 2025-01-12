import { Alert, Button } from "@/components";
import { AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { useNavigate } from "react-router-dom";

export const ErrorLoading = () => {
  const navigate = useNavigate();
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
        <Button className="mt-5 ml-5" onClick={() => navigate("/app/homee/dashboard")}>
          Regresar
        </Button>
      </div>
    </>
  );
};
