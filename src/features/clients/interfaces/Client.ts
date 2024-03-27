import { PersonalInformation } from '@/components/common/interfaces/PersonalInfomation';

export interface CreateClient extends PersonalInformation {
  address: string;
}

export interface GetClient extends CreateClient {
  id: string;
}
