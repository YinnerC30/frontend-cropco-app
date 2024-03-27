import { PersonalInformation } from '@/components/common/interfaces/PersonalInformation';

export interface CreateClient extends PersonalInformation {}

export interface GetClient extends CreateClient {
  id: string;
}
