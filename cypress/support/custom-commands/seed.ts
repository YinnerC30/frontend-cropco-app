const tokenAdmin =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1ZjM1YjUwLWYyN2YtNDhjNy05NmIyLWMzMTYxMjUwZjNlMyIsImlhdCI6MTc1MzkxMDE3NiwiZXhwIjoxNzUzOTMxNzc2fQ.ybNDlmmnaDHMqxRgLQIaM1xH5rAc8A0kIUD4nEytT8Q';

Cypress.Commands.add(
  'executeSeed',
  (
    body: any,
    options?: {
      token?: string;
      tenantId?: string;
      url?: string;
      callback?: (response: any) => void;
    }
  ): Cypress.Chainable<any> => {
    const {
      token = tokenAdmin,
      tenantId = 'c0913699-2c3e-418c-98fd-7e9560c975f1',
      url = 'http://localhost:3000/seed/controlled',
      callback,
    } = options || {};

    return cy
      .request({
        method: 'POST',
        url,
        body,
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-id': tenantId,
          Cookie: `administrator-token=${token}`,
        },
      })

      .then((response) => {
        if (typeof callback === 'function') {
          callback(response.body);
        }

        return response.body as any;
      });
  }
);

Cypress.Commands.add(
  'executeClearSeedData',
  (
    body: any,
    options?: {
      token?: string;
      tenantId?: string;
      url?: string;
      callback?: (response: any) => void;
    }
  ): Cypress.Chainable<any> => {
    const {
      token = tokenAdmin,
      tenantId = 'c0913699-2c3e-418c-98fd-7e9560c975f1',
      url = 'http://localhost:3000/seed/clear',
      callback,
    } = options || {};

    return cy
      .request({
        method: 'DELETE',
        url,
        body,
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-id': tenantId,
          Cookie: `administrator-token=${token}`,
        },
      })
      .then((response) => {
        if (typeof callback === 'function') {
          callback(response.body);
        }
        return response.body as any;
      });
  }
);
