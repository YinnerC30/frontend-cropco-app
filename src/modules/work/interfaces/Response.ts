import { Work } from "./Work";

export interface ResponseGetWorks {
  rowCount: number;
  rows: Work[];
  pageCount: number;
}
