import { BASE_URL } from 'cypress/helpers/constants';

export const harvestsRoutes = {
  listAll() {
    return `${BASE_URL}harvests/view/all`;
  },
  create() {
    return `${BASE_URL}harvests/create/one`;
  },
  update(id: string) {
    return `${BASE_URL}harvests/update/one/${id}`;
  },
  view(id: string) {
    return `${BASE_URL}harvests/view/one/${id}`;
  },
};
