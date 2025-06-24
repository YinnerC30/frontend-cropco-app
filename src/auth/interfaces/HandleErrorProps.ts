import { AxiosError } from 'axios';
import { TypedAxiosError } from './AxiosErrorResponse';

export interface HandleErrorProps {
  error: AxiosError<TypedAxiosError, unknown>;
  messagesStatusError: {
    notFound?: string;
    badRequest?: string;
    unauthorized?: string;
    conflict?: string;
    other?: string;
  };
}
