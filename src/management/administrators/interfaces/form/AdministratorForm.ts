import { RolesAdministrator } from "../RolesAdministrator";

export interface AdministratorForm {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  cell_phone_number: string;
  passwords: {
    password1: string;
    password2: string;
  };
  role: RolesAdministrator;
}
