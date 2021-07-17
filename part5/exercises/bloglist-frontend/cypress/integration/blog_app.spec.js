describe('Blog app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('form').as('loginForm')
    cy.get('@loginForm')
      .contains('username')
      .find('input')
    cy.get('@loginForm')
      .contains('password')
      .find('input')
    cy.get('@loginForm')
      .get('button')
      .should('contain', 'login')
  })

})