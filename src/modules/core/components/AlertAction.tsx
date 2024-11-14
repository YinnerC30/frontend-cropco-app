import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AlertActionProps {
  title: string;
  description: string;
}

export function AlertAction({title, description}: AlertActionProps) {
  return (
    <Alert variant="destructive" className='my-4'>
      <AlertCircle className="w-4 h-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  );
}
