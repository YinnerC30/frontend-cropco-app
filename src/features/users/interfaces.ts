export interface User {
  first_name: string;
  last_name: string;
  email: string;
  cell_phone_number: string;
  password: string;
}

export interface UserFormProps {
  values?: User;
  nameButtonSubmit: string;
  onSubmit: any;
}
