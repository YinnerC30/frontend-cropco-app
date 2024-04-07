import { PersonalInformation } from '@/components/common/interfaces/PersonalInformation';

export interface CreateSupplier extends PersonalInformation {
  company_name: string;
}

export interface GetSupplier extends CreateSupplier {
  id: string;
}
