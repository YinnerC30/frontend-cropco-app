import { PersonalInformation } from '@/components/common/interfaces/PersonalInfomation';

export interface CreateUser extends PersonalInformation {
  password: string;
}

export interface GetUser extends CreateUser {
  id: string;
}
