import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionViewRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { Row } from '@tanstack/react-table';
import React from 'react';
import { useDeletePayment } from '../../hooks/mutations/useDeletePayment';
import { Payment } from '../../interfaces/Payment';

export const ActionsTablePayment: React.FC<{ row: Row<Payment> }> = ({
  row,
}) => {
  const id = row.original.id ?? '';

  const { mutate } = useDeletePayment();

  const handleDelete = () => {
    mutate(id);
  };
  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id} />
      <ActionDeleteRecord action={handleDelete} />
      <ActionViewRecord id={id} />
    </DropDownMenuActions>
  );
};
