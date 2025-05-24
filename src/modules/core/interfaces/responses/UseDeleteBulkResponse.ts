export interface UseDeleteBulkResponse {
  success: string[];
  failed: { id: string; error: string }[];
}
