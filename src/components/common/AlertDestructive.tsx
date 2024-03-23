import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AlertDestructive() {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="w-4 h-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Ha ocurrido un error inesperado</AlertDescription>
    </Alert>
  );
}
