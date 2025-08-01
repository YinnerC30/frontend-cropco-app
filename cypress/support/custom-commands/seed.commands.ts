Cypress.Commands.add('getTokenToSeed', (): Cypress.Chainable<string> => {
  return cy
    .request({
      method: 'POST',
      url: 'http://localhost:3000/auth/management/login',
      body: {
        email: 'admincropco@mail.com',
        password: '123456',
      },
    })
    .then((response) => {
      return (
        response.headers['set-cookie']
          ?.toString()
          .split(';')
          .find((cookie: string) => cookie.startsWith('administrator-token='))
          ?.split('=')[1] || ''
      );
    });
});

Cypress.Commands.add(
  'executeSeed',
  (
    body: any,
    options?: {
      tenantId?: string;
      url?: string;
      callback?: (response: any) => void;
    }
  ): Cypress.Chainable<any> => {
    const {
      tenantId = 'c0913699-2c3e-418c-98fd-7e9560c975f1',
      url = 'http://localhost:3000/seed/controlled',
      callback,
    } = options || {};

    cy.getTokenToSeed();

    return cy
      .request({
        method: 'POST',
        url,
        body,
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-id': tenantId,
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
      tenantId = 'c0913699-2c3e-418c-98fd-7e9560c975f1',
      url = 'http://localhost:3000/seed/clear',
      callback,
    } = options || {};

    cy.getTokenToSeed();

    return cy
      .request({
        method: 'DELETE',
        url,
        body,
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-id': tenantId,
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
