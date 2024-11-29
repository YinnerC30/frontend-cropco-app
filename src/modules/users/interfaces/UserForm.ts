export interface UserForm {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  cell_phone_number: string;
  passwords: {
    password1: string;
    password2: string;
  };
  actions: any[];
  modules?: any[];
}