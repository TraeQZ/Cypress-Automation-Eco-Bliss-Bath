describe('Smoke Test - Vérification du formulaire de connexion & Ajout au panier', () => {
  beforeEach(() => {
    // On s'assure que l'application est lancée
    cy.visit('http://localhost:4200/#/')
  })

  it('Vérification du formulaire de connexion', () => {

    cy.contains('Connexion').click()
    // ON VÉRIFIE (la visibilité)
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('[data-cy="login-submit"]').should('be.visible').and('contain', 'Se connecter')
    // ON TESTE UNE CONNEXION RÉUSSIE
    cy.get('#username').type('test2@test.fr')
    cy.get('#password').type('testtest')
    cy.get('[data-cy="login-submit"]').click()
    cy.get('[data-cy="nav-link-logout"]').should('be.visible')
    cy.get('[data-cy="nav-link-cart"]').should('be.visible')

    // NAVIGATION VERS LE PRODUIT
    cy.get('[data-cy="product-home-link"]').first().should('be.visible').click()
    cy.url().should('include', '/products/')
    //ON VERIFIE LA PRESENCE DU BOUTON D'AJOUT AU PANIER, la clique et vérifie que le produit est ajouté au panier
    cy.get('[data-cy="detail-product-add"]').should('be.visible').click();
    // Vérification que le produit a été ajouté au panier
    cy.get('[data-cy="nav-link-cart"]', { timeout: 10000 }).click();
    // On s'assure d'être sur la page panier
    cy.url().should('include', '/cart')
    cy.get('[data-cy="cart-line-quantity"]').first().should('not.have.value', '0');
  })
})
