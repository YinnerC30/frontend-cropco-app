export interface ResponseApiGetAllRecords<T> {
  total_row_count: number;
  current_row_count: number;
  total_page_count: number;
  current_page_count: number;
  records: T[];
}
