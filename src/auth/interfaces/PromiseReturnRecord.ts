import { AxiosResponse } from 'axios';

export type PromiseReturnRecord<T> = Promise<AxiosResponse<T>>;
