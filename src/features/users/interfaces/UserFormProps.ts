import { CreateUser } from './User';

export interface UserFormProps {
  values?: CreateUser;
  nameButtonSubmit: string;
  onSubmit: (values: CreateUser) => void;
}
