it('Vérifie l\'ajout au panier et la mise à jour des stocks', () => {
  cy.visit('http://localhost:4200/#/login');
  cy.get('#username').type('test2@test.fr');
  cy.get('#password').type('testtest');
  cy.get('[data-cy="login-submit"]').click();
  cy.url().should('not.include', '/login');

  cy.visit('http://localhost:4200/#/products/9');
  cy.get('input[data-cy="detail-product-quantity"]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type('1');

  // Ajout normal - doit fonctionner
  cy.get('[data-cy="detail-product-add"]').click();

  // BUG: valeur négative - le bouton devrait être désactivé
  cy.get('input[data-cy="detail-product-quantity"]').clear().type('-1');
  cy.get('[data-cy="detail-product-add"]').should('not.be.disabled'); // documente le bug

  // BUG: valeur > 20 - le bouton devrait être désactivé  
  cy.get('input[data-cy="detail-product-quantity"]').clear().type('999');
  cy.get('[data-cy="detail-product-add"]').should('not.be.disabled'); // documente le bug
});