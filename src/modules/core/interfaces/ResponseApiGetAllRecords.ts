export interface ResponseApiGetAllRecords<T> {
  rowCount: number;
  rows: T[];
  pageCount: number;
}
