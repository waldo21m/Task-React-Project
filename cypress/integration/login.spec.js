describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('It focuses in the email input', () => {
    cy.get('input[name="email"]')
      .should('have.class', 'MuiInputBase-input');
  });

  it('Accepts email input', () => {
    const email = Cypress.env('loginEmail');
    cy.get('input[name="email"]')
      .type(email, {delay: 50})
      .should('have.value', email);
  });

  it('Error form by email', () => {
    const email = "invalid-email";
    const password = "12345678";
    cy.get('input[name="email"]')
      .type(email)
      .should('have.value', email);
    cy.get('input[name="password"]')
      .type(password);
    cy.get('#login')
      .submit();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/login');
    });
    cy.get('p.Mui-error')
      .should('have.text', 'Debe ingresar un correo electrónico válido');

    cy.wait(2000);
  });

  it('Send form', () => {
    const email = Cypress.env('loginEmail');
    const password = Cypress.env('password');
    cy.get('input[name="email"]')
      .type(email)
      .should('have.value', email);
    cy.get('input[name="password"]')
      .type(password);
    cy.get('#login')
      .submit();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
  });
});