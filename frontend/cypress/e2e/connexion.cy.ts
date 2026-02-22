describe('Se connecter au site', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/#')
    cy.contains('Connexion').click()
  })
  it('Succés de connexion', () => {
    cy.get('#username').type('test2@test.fr')
    cy.get('#password').type('testtest')
    cy.get('[data-cy="login-submit"]').click()
    // ASSERTIONS :
cy.get('[data-cy="nav-link-logout"]').should('be.visible');  })

it('Echec de connexion - Mauvais mot de passe', () => {
    cy.get('#username').type('test2@test.fr')
    cy.get('#password').type('mauvais-password')
    cy.get('[data-cy="login-submit"]').click()

    // ASSERTIONS :
    cy.get('[data-cy="login-errors"]').should('be.visible')
    cy.get('[data-cy="nav-link-logout"]').should('not.exist')
  })
  it('Echec de connexion - Mauvais Username', () => {
    cy.get('#username').type('te@test.fr')
    cy.get('#password').type('testtest')
    cy.get('[data-cy="login-submit"]').click()

    // ASSERTIONS :
    cy.get('[data-cy="login-errors"]').should('be.visible')
    cy.get('[data-cy="nav-link-logout"]').should('not.exist')
  })
  it('Champs obligatoires non rempli', () => {
    // On ne tape rien
    cy.get('[data-cy="login-submit"]').click()
    cy.get('[data-cy="login-errors"]').should('be.visible')
  })
})
