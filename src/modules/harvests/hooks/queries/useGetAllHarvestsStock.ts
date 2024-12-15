import { useQuery } from '@tanstack/react-query';

import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { ResponseApiGetAllRecords } from '@/modules/core/interfaces';
import { HarvestStock } from '@/modules/harvests/interfaces/HarvestStock';

export const getHarvestStock = async ({
  search = '',
  limit = 10,
  offset = 0,
}): Promise<ResponseApiGetAllRecords<HarvestStock>> => {
  const params = new URLSearchParams();
  params.append('search', search);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  const { data } = await cropcoAPI.get(
    `${pathsCropco.harvestsStock}/all?${params}`
  );
  return data;
};

export const useGetAllHarvestsStock = (searchParameter: string) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ['harvests_stock', { searchParameter, ...pagination }],
    queryFn: () =>
      getHarvestStock({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
  });

  return { query, pagination, setPagination };
};
