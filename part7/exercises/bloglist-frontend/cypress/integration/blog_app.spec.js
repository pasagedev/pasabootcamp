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

    describe('and blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title:'first blog', author: 'Pablo', url: 'www.firstBlog.com', likes: 0 })
        cy.createBlog({ title:'second blog', author: 'Pablo', url: 'www.secondBlog.com', likes: 2 })
        cy.createBlog({ title:'third blog', author: 'Pablo', url: 'www.thirdBlog.com', likes: 4 })
      })

      it('like button works correctly', function() {
        cy.contains('first blog').contains('show').click()
        cy.contains('likes 0').contains('like').click()

        cy.contains('likes 1')
      })

      it('blog can be deleted by same user creator', function() {
        cy.contains('second blog')
          .contains('show').click()

        cy.contains('second blog')
          .contains('delete').click()
        cy.get('html').should('not.contain', 'second blog')
      })

      it('blog can\'t be deleted by user diferent of creator', function() {
        cy.logout()
        cy.request('POST', 'http://localhost:3003/api/users', {
          name: 'Fla', username: 'flamadev', password: 'flama1234'
        })
        cy.login({ username: 'flamadev', password: 'flama1234' })
        cy.contains('second blog')
          .contains('show').click()

        cy.contains('second blog')
          .should('not.contain', 'delete')
      })

      it.only('blogs are sorted by numbers of likes', function() {
        cy.contains('show').click()
        cy.contains('likes 4')
        cy.contains('show').click()
        cy.contains('likes 2')
        cy.contains('show').click()
        cy.contains('likes 0')

        cy.get('div .hideContent').should('have.class', 'hideContent')
          .then(all => {
            console.log(all)
          })
      })
    })
  })

})