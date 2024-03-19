import { User } from './User';

export interface UserFormProps {
  values?: User;
  nameButtonSubmit: string;
  onSubmit: (values: User) => void;
}
