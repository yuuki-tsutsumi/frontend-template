import { http, HttpResponse } from 'msw';
import { mockUserOrganizationAppAdmin } from './data/userOrganization';

export const handlers = [
  http.get('/api/user_organization', () => {
    return HttpResponse.json(mockUserOrganizationAppAdmin);
  }),
];
