import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

interface Props {
  index?: number;
  size?: number;
}

export const usePaginationDataTable = ({
  index = 0,
  size = 10,
}: Props = {}) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: index,
    pageSize: size,
  });

  const { pageIndex, pageSize } = pagination;

  return {
    pagination,
    setPagination,
    pageIndex,
    pageSize,
  };
};
