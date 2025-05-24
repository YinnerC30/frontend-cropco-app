export interface RecordToPay {
  id: string;
  value_pay: number;
  date: string;
  type: 'harvest' | 'work';
  payment_is_pending?: boolean;
}
