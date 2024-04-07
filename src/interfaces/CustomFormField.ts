type typeInput = 'text' | 'number' | 'date' | 'string';

export interface CustomFormField {
  name: string | any;
  label: string;
  placeholder: string;
  description: string;
  type: typeInput;
  visible: boolean;
}
