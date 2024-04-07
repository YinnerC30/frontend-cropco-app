import { TypeInput } from '@/enums/TypeInput';

export interface CustomFormField {
  name: string | any;
  label: string;
  placeholder: string;
  description: string;
  type: TypeInput;
  visible: boolean;
}
