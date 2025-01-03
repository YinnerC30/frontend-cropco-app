import { Button } from '@/components/ui/button';
import { PATH_HOME_APP } from '@/config';
import { AlertCircle, Home, RefreshCcw } from 'lucide-react';
import { Link, useRouteError, ErrorResponse } from 'react-router-dom';

export default function ErrorPage() {
  const { status, statusText } = useRouteError() as ErrorResponse;

  

  return (
    <div className="flex items-center justify-center min-h-screen px-4 ">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <AlertCircle className="w-24 h-24 mx-auto text-red-500" />
          {status && (
            <h1 className="text-6xl font-bold text-gray-900">{status}</h1>
          )}
          <h2 className="text-3xl font-extrabold text-gray-900">
            Oops! Algo salió mal
          </h2>
          <p className="text-xl text-gray-600">{statusText}</p>
        </div>
        <div className="flex justify-center space-x-4">
          <Button asChild>
            <Link to={PATH_HOME_APP}>
              <Home className="w-4 h-4 mr-2" />
              Inicio
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCcw className="w-4 h-4 mr-2" />
            Reintentar
          </Button>
        </div>
      </div>
    </div>
  );
}
