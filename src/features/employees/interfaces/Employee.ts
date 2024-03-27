import { PersonalInformation } from '@/components/common/interfaces/PersonalInformation';

export interface CreateEmployee extends PersonalInformation {}
export interface GetEmployee extends CreateEmployee {
  id: string;
}
