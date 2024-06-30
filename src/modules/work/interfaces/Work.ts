import { WorkDetail } from "./WorkDetail";

export interface Work {
  id?: string;
  date: string;
  description: string | undefined;
  total: number;
  details: WorkDetail[];
}
