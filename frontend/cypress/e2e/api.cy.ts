describe('Tests API - Backend (Port 8081)', () => {

  //  AUTHENTIFICATION

  it('POST /login - Succès', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      body: { username: 'test2@test.fr', password: 'testtest' }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

    //  Utilisateur Inconnue

it('POST /login - Échec utilisateur inconnu doit retourner 401', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8081/login',
    failOnStatusCode: false,
    body: { username: 'inconnu@test.fr', password: 'mauvais' }
  }).then((response) => {
    expect(response.status).to.eq(401);
  });
});

  //  TESTS PANIER (Orders)
//GET /orders connecté
it('GET /orders - Récupérer le panier connecté', () => {
  cy.request('POST', 'http://localhost:8081/login', {
    username: 'test2@test.fr',
    password: 'testtest'
  }).then((loginRes) => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/orders',
      headers: { Authorization: `Bearer ${loginRes.body.token}` }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});

// GET /products/{id}
it('GET /products/{id} - Récupérer une fiche produit', () => {
  cy.request('GET', 'http://localhost:8081/products/4')
  .then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('id');
  });
});

//Ajout de produit disponible au panier
  it('Success: Ajouter un produit disponible au panier', () => {
    cy.request('POST', 'http://localhost:8081/login', {
      username: 'test2@test.fr',
      password: 'testtest'
    }).then((loginResponse) => {
      const userToken = loginResponse.body.token;
      cy.request({
        method: 'PUT',
        url: 'http://localhost:8081/orders/add',
        headers: { Authorization: `Bearer ${userToken}` },
        body: { product: 8, quantity: 1 }
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
// Ajout de produit en rupture de stock - doit échouer
  it('Fail: Ajouter un produit en rupture de stock (Alerte Bug API)', () => {
    cy.request('POST', 'http://localhost:8081/login', {
      username: 'test2@test.fr',
      password: 'testtest'
    }).then((loginRes) => {
      cy.request({
        method: 'PUT',
        url: 'http://localhost:8081/orders/add',
        failOnStatusCode: false, 
        headers: { Authorization: `Bearer ${loginRes.body.token}` },
        body: { product: 4, quantity: 2 } // Stock est à 1
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  });
  // GET /orders sans authentification - doit retourner 401
  
it('GET /orders sans authentification - doit retourner 401', () => {
  cy.request({
    method: 'GET',
    url: 'http://localhost:8081/orders',
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(401);
  });
});



  // --- TESTS AVIS (REVIEWS) ---
//Test de validation de limites - Note > 5
  it('POST /reviews - Test de validation des limites (Rating > 5)', () => {
    cy.request('POST', 'http://localhost:8081/login', {
      username: 'test2@test.fr',
      password: 'testtest'
    }).then((loginRes) => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/reviews',
        failOnStatusCode: false,
        headers: { Authorization: `Bearer ${loginRes.body.token}` },
        body: {
          title: "Trop bien",
          comment: "Je mets 50/5 !",
          rating: 50, // Note impossible, l'API devrait rejeter
        }
      }).then((res) => {
        // Si l'API est bien faite, elle doit renvoyer 400 pour une note > 5
        expect(res.status).to.eq(400); 
      });
    });
  });

});