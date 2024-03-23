export interface CreateUser {
  first_name: string;
  last_name: string;
  email: string;
  cell_phone_number: string;
  password: string;
}

export interface GetUser extends CreateUser {
  id: string;
}
