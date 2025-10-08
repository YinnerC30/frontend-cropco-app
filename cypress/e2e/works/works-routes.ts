import { BASE_URL } from 'cypress/helpers/constants';

export const worksRoutes = {
  listAll() {
    return `${BASE_URL}works/view/all`;
  },
  create() {
    return `${BASE_URL}works/create/one`;
  },
  update(id: string) {
    return `${BASE_URL}works/update/one/${id}`;
  },
  view(id: string) {
    return `${BASE_URL}works/view/one/${id}`;
  },
};
