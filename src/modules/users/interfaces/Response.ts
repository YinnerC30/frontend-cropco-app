import { User } from './User';

export interface ResponseGetUsers {
  rowCount: number;
  rows: User[];
  pageCount: number;
}
