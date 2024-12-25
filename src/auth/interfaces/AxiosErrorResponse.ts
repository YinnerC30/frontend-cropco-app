import { AxiosResponse } from 'axios';

interface ErrorResponse {
  message: string;
  statusCode: number;
  error: string;
}

export interface TypedAxiosError extends AxiosResponse {
  data: ErrorResponse;
}
