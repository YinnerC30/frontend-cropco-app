import { useCreateForm } from '@/modules/core/hooks';
import { FormProps } from '@/modules/core/interfaces';
import { HarvestDetail } from '@/modules/harvests/interfaces';
import { useGetEmployeePendingPayments } from '@/modules/payments/hooks/queries/useGetEmployeePendingPayments';
import { Payment } from '@/modules/payments/interfaces/Payment';
import { RecordToPay } from '@/modules/payments/interfaces/RecordToPay';
import { PaymentRecord } from '@/modules/payments/interfaces/ResponseGetOnePayment';
import { formSchemaPayments } from '@/modules/payments/utils';
import { WorkDetail } from '@/modules/work/interfaces/WorkDetail';
import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { z } from 'zod';

export type FormPaymentProps = FormProps<
  z.infer<typeof formSchemaPayments>,
  PaymentRecord
>;

export interface FormPaymentContextValues {
  formPayment: ReturnType<typeof useCreateForm>;
  readOnly: boolean;
  isSubmitting: boolean;
  onSubmit: (values: z.infer<typeof formSchemaPayments>) => void;
  value_pay: number;
  paymentsState: PaymentsState;
  getHarvestsToPay: () => string[];
  getWorksToPay: () => string[];
  defaultValues: Payment;
  addRecordToPay: (record: RecordToPay) => void;
  removeRecordToPay: (record: RecordToPay) => void;
}

const initialPaymentState: PaymentsState = {
  records_to_pay: [],
  original_data: {
    harvests_detail: [],
    works_detail: [],
  },
  current_data: {
    harvests_detail: [],
    works_detail: [],
  },
};

interface PaymentsState {
  original_data: {
    harvests_detail: HarvestDetail[];
    works_detail: WorkDetail[];
  };
  current_data: {
    harvests_detail: HarvestDetail[];
    works_detail: WorkDetail[];
  };
  records_to_pay: RecordToPay[];
}

type PaymentAction =
  | {
      type: 'ADD';
      payload: RecordToPay;
    }
  | { type: 'REMOVE'; payload: RecordToPay }
  | {
      type: 'RESET';
      payload: {
        harvests_detail: HarvestDetail[];
        works_detail: WorkDetail[];
      };
    }
  | {
      type: 'RESET-RECORDS-TO-PAY';
      payload: RecordToPay[];
    }
  | { type: 'RESET-VALUES'; payload: void };

const paymentsReducer = (
  state: PaymentsState,
  action: PaymentAction
): PaymentsState => {
  switch (action.type) {
    case 'ADD':
      let currentData;
      if (action.payload.type === 'harvest') {
        currentData = {
          works_detail: state.current_data.works_detail,
          harvests_detail: state.current_data.harvests_detail.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      } else {
        currentData = {
          harvests_detail: state.current_data.harvests_detail,
          works_detail: state.current_data.works_detail.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      }

      return {
        ...state,
        current_data: currentData,
        records_to_pay: [...state.records_to_pay, action.payload],
      };
    case 'REMOVE':
      let currentData2;
      if (action.payload.type === 'harvest') {
        currentData2 = {
          works_detail: state.current_data.works_detail,
          harvests_detail: [
            ...state.current_data.harvests_detail,
            state.original_data.harvests_detail.find(
              (item) => item.id === action.payload.id
            ),
          ] as HarvestDetail[],
        };
      } else {
        currentData2 = {
          harvests_detail: state.current_data.harvests_detail,
          works_detail: [
            ...state.current_data.works_detail,
            state.original_data.works_detail.find(
              (item) => item.id === action.payload.id
            ),
          ] as WorkDetail[],
        };
      }

      return {
        ...state,
        current_data: currentData2,
        records_to_pay: state.records_to_pay.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case 'RESET':
      return {
        ...state,
        original_data: {
          harvests_detail: action.payload.harvests_detail,
          works_detail: action.payload.works_detail,
        },
        current_data: {
          harvests_detail: action.payload.harvests_detail,
          works_detail: action.payload.works_detail,
        },
      };
    case 'RESET-RECORDS-TO-PAY':
      return {
        ...state,
        records_to_pay: action.payload,
      };
    case 'RESET-VALUES':
      return {
        records_to_pay: [],
        original_data: {
          harvests_detail: [],
          works_detail: [],
        },
        current_data: {
          harvests_detail: [],
          works_detail: [],
        },
      };
  }
};

const defaultValuesPayment: PaymentRecord = {
  id: '',
  date: '',
  method_of_payment: '',
  value_pay: 0,
  employee: {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    cell_phone_number: '',
    address: '',
  },
  payments_harvest: [],
  payments_work: [],
};

export const FormPaymentContext = createContext<
  FormPaymentContextValues | undefined
>(undefined);

export const FormPaymentProvider: React.FC<
  FormPaymentProps & {
    children: React.ReactNode;
  }
> = ({
  children,
  defaultValues = defaultValuesPayment,
  isSubmitting = false,
  onSubmit = (values) => {},
  readOnly = false,
}) => {
  const formPayment = useCreateForm({
    schema: formSchemaPayments,
    defaultValues,
  });

  const employeeId: string = formPayment.watch('employee').id;

  const queryEmployeePayments = useGetEmployeePendingPayments(
    employeeId,
    !readOnly
  );

  const [paymentsState, dispatch] = useReducer(
    paymentsReducer,
    initialPaymentState
  );

  const addRecordToPay = (record: RecordToPay): void => {
    dispatch({ type: 'ADD', payload: record });
  };

  const removeRecordToPay = (record: RecordToPay): void => {
    dispatch({ type: 'REMOVE', payload: record });
  };

  const resetPaymentState = (data: {
    harvests_detail: HarvestDetail[];
    works_detail: WorkDetail[];
  }): void => {
    dispatch({
      type: 'RESET',
      payload: data,
    });
  };

  const resetRecordsToPay = (data: RecordToPay[]) => {
    dispatch({
      type: 'RESET-RECORDS-TO-PAY',
      payload: data,
    });
  };

  const resetToDefaultValues = () => {
    dispatch({ type: 'RESET-VALUES', payload: undefined });
  };

  const getHarvestsToPay = (): string[] => {
    return paymentsState.records_to_pay
      .filter((item) => item.type === 'harvest')
      .map((value) => value.id);
  };
  const getWorksToPay = (): string[] => {
    return paymentsState.records_to_pay
      .filter((item) => item.type === 'work')
      .map((value) => value.id);
  };

  const value_pay = useMemo(
    () =>
      paymentsState.records_to_pay.reduce(
        (pValue, cValue) => pValue + cValue.value_pay,
        0
      ),
    [paymentsState]
  );

  const isFirstRender = useRef(true);

  const records_to_pay = useMemo(
    () => paymentsState.records_to_pay,
    [paymentsState.records_to_pay]
  );

  useEffect(() => {
    if (
      (isFirstRender.current &&
        paymentsState.current_data.harvests_detail.length > 0) ||
      paymentsState.current_data.works_detail.length > 0
    ) {
      isFirstRender.current = false;
    }
  }, [paymentsState.current_data]);

  useEffect(() => {
    formPayment.setValue('records_to_pay', records_to_pay, {
      shouldValidate: !isFirstRender.current,
      shouldDirty: !isFirstRender.current,
    });
  }, [records_to_pay]);

  useEffect(() => {
    if (paymentsState.records_to_pay.length > 0) {
      resetToDefaultValues();
    }
  }, [employeeId]);

  useEffect(() => {
    if (
      defaultValues.payments_harvest.length > 0 ||
      defaultValues.payments_work.length > 0
    ) {
      const harvests = defaultValues?.payments_harvest?.map(
        ({ harvests_detail }) => ({
          ...harvests_detail,
          type: 'harvest',
          date: harvests_detail.harvest.date,
        })
      ) as unknown as RecordToPay[];
      const works = defaultValues?.payments_work?.map(({ works_detail }) => ({
        ...works_detail,
        type: 'work',
        date: works_detail.work.date,
      })) as unknown as RecordToPay[];
      resetRecordsToPay([...harvests, ...works]);
    }
  }, [defaultValues]);

  useEffect(() => {
    if (queryEmployeePayments.isSuccess && !readOnly) {
      resetPaymentState({
        harvests_detail: queryEmployeePayments.data?.harvests_detail ?? [],
        works_detail: queryEmployeePayments.data?.works_detail ?? [],
      });
    }
  }, [queryEmployeePayments.data, queryEmployeePayments.isSuccess]);

  useEffect(() => {
    formPayment.setValue('value_pay', value_pay, { shouldValidate: true });
  }, [value_pay]);

  return (
    <FormPaymentContext.Provider
      value={{
        formPayment,
        readOnly,
        isSubmitting,
        onSubmit,
        value_pay,
        paymentsState,
        getHarvestsToPay,
        getWorksToPay,
        defaultValues: defaultValues as any,
        addRecordToPay,
        removeRecordToPay: removeRecordToPay,
      }}
    >
      {children}
    </FormPaymentContext.Provider>
  );
};
