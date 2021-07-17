const { func } = require('prop-types')

describe('Blog app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Pablo',
      username: 'pasagedev',
      password: 'pasa1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
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

  describe('Login', function () {
    it('succeeds with correct credentials', function() {
      cy.get('[name="Username"]').type('pasagedev')
      cy.get('[name="Password"]').type('pasa1234')
      cy.contains('login').click()

      cy.contains('Pablo logged in successfully')
    })

    it('fails with wrong credentials', function() {
      cy.get('[name="Username"]').type('pasagedev')
      cy.get('[name="Password"]').type('wrong')
      cy.contains('login').click()
      cy.contains('wrong credentials')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'pasagedev', password:'pasa1234' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('[name="title"]').type('title of testing blog')
      cy.get('[name="author"]').type('author of testing blog')
      cy.get('[name="url"]').type('url of testing blog')

      cy.get('form').contains('create').click()
      cy.contains('title of testing blog author of testing blog')
    })
  })

})