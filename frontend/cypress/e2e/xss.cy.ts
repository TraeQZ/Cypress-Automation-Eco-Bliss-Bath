it('Sécurité : Vérifier la vulnérabilité XSS dans les commentaires', () => {
    const xssPayload = '<script>alert("XSS")</script>';

    cy.request('POST', 'http://localhost:8081/login', {
        username: 'test2@test.fr',
        password: 'testtest'
    }).then((loginRes) => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/reviews',
            headers: { Authorization: `Bearer ${loginRes.body.token}` },
            body: {
                title: "Test Sécurité",
                comment: xssPayload,
                rating: 5,
            }
        }).then(() => {
            cy.visit('http://localhost:4200/#/product/4');
            cy.get('body').should('not.contain', xssPayload);
        });
    });
});