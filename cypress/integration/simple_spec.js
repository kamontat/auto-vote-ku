
describe('My First Test', function () {

  beforeEach(function () {
    let user = Cypress.env("USERNAME")
    let pass = Cypress.env("PASSWORD")

    cy.login(user, pass)

    cy.fixture("vote").as("vote")
    cy.fixture("setting").as("setting")
  })

  it('Custom vote', function () {
    for (var i of this.vote.T) {
      cy.get("td").contains(i.id).click().catch((err) => {
        // oh no the button wasn't found
        // (or something else failed)
        cy.log("error")
      })
      // cy.log(i)
    }
  })

  // it('Open URL', function () {
  //   cy.log(this.vote.T)
  //   cy.submit_first()
  //   cy.vote("n", null, { submit: this.setting.submit, start: 1, end: 8 })
  // })
})
