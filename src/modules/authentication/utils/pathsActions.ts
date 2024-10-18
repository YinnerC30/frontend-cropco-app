export const pathsActions = {
  create_user: {
    path: 'users/create',
  },
  remove_one_user: {
    path: 'users/',
  },
  find_one_user: {
    path: 'users/view/:id',
  },
  find_all_users: {
    path: 'users/all',
  },
  update_one_user: {
    path: 'users/modify/:id',
  },
};

export const findKeyByPath = (targetPath: string) => {
  for (const [key, value] of Object.entries(pathsActions)) {
    if (targetPath === value.path) {
      return key;
    }
  }
  return null;
};
