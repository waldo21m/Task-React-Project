describe('Login', () => {
  it('See task list', () => {
    cy.visit('/login');
    const email = Cypress.env('loginEmail');
    const password = Cypress.env('password');

    let query = `mutation {
      userLogin(data: {
        email: "${email}",
        password: "${password}"
      }) {
        success
        auth {
          idToken
        }
      }
    }`;

    cy.request('POST', 'https://api.8base.com/ckbgtagfz000207mgbb8o96pc', {query}).then(response => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property('body');
      let token = `Bearer ${response.body.data.userLogin.auth.idToken}`;

      window.localStorage.setItem('token', token);
      cy.visit('/');

      query = `{
        tasksList {
          items {
            id
            name
            description
            isCompleted
            users {
              email
              firstName
              lastName
            }
            createdAt
            updatedAt
            createdBy {
              email
              firstName
              lastName
            }
          }
        }
      }`;

      cy.request({
        method: 'POST',
        url: 'https://api.8base.com/ckbgtagfz000207mgbb8o96pc',
        headers: {
          "Authorization": token
        },
        body: {
          query
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response).to.have.property('body');
        console.log(response.body);
      });
    });
  });
});