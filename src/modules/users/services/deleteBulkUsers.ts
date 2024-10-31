import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { BulkUsersDelete } from '../interfaces';

export const deleteBulkUsers = async (data: BulkUsersDelete) => {
  await cropcoAPI.delete(`${pathsCropco.users}/remove/bulk`, {
    data: {
      userIds: data.userIds,
    },
  });
};
