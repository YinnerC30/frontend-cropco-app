import { AxiosResponse } from 'axios';
import { ResponseApiGetAllRecords } from './ResponseApiGetAllRecords';

export type TypeGetAllRecordsReturn<T> = Promise<
  AxiosResponse<ResponseApiGetAllRecords<T>>
>;
