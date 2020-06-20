describe('Cypress', () => {
  it('Is working', () => {
    expect(true).to.equal(true);
  });

  it('Visits the app', () => {
    cy.visit('/');
  });
});