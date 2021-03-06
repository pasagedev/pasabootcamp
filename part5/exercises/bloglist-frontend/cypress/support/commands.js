Cypress.Commands.add('login', function({ username, password }) {
  cy.request('POST', 'http://localhost:3003/api/login',
    { username, password }
  ).then(response => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
  })

  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('logout', function () {
  localStorage.removeItem('loggedBlogAppUser')

})

Cypress.Commands.add('createBlog', function(blog) {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: blog,
    headers: {
      'Authorization':`Bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})