import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { CACHE_CONFIG_TIME } from '@/config';
import { useAuthTenantContext } from '@/management/auth/components/AuthTenantContext';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { User } from '@/modules/users/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const getTenantUsers = async (
  id: string
): PromiseReturnRecord<User[]> => {
  return await cropcoAPI.get(`${pathsCropco.tenants}/all-tenant-users/${id}`);
};

export const useGetAllTenantUsers = (
  id: string
): UseGetOneRecordReturn<User[]> => {
  const { handleError } = useAuthTenantContext();

  const query: UseGetOneRecordReturn<User[]> = useQuery({
    queryKey: ['tenant-users', id],
    queryFn: () => getTenantUsers(id),
    select: ({ data }) => data,
    enabled: true,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.mediumTerm,
  });

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        messagesStatusError: {},
      });
    }
  }, [query.isError, query.error]);

  return query;
};
