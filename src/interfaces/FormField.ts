type typeInput = 'text'|'number'|'date'|'string';

export interface FormField {
  name: string;
  label: string;
  placeholder: string;
  description: string;
  type: typeInput,
  visible: boolean;
}
