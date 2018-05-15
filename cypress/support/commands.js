// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username, password) => {
  cy.visit("/")

  cy.get("input[name=account]").type(username)
  cy.get("input[name=password]").type(password)
  cy.get("button[type=submit]").click()
})

Cypress.Commands.add("submit_first", () => {
  cy.get("input[type=submit]").first().click()
})

Cypress.Commands.add("able_to_submit", () => {
  return cy.get("input[type=submit]").length > 0
})

Cypress.Commands.add("vote", (result, comment, options = {}) => {
  const is_null = (str) => str === null || str === undefined
  const is_object = (str) => typeof str === "object"
  const is_number = (str) => typeof str === "number"
  const is_string = (str) => typeof str === "string"
  const is_boolean = (str) => typeof str === "boolean"

  const int_or_str = (input) => is_string(input) || is_number(input)
  const str_or_null = (input) => is_string(input) || is_null(input)

  const convert_result = (res) => {
    if (res === "good" || res === "g" || res === "3" || res === 3)
      return 3
    else if (res === "normal" || res === "n" || res === "2" || res === 2)
      return 2
    else if (res === "bad" || res === "b" || res === "1" || res === 1)
      return 1
    else if (res === "custom" || res === "c" || res === "0" || res === 0)
      return 0
    else
      return null
  }

  const valid_options = (opt) => {
    const accept = ["submit", "start", "end", "prefix"]

    for (let key of Object.keys(opt)) {
      if (!accept.includes(key)) return false
    }
    return true
  }

  const merge_default = (opt) => {
    // none object
    if (!is_object(opt)) return false

    if (is_null(opt.start) && !is_number(opt.start)) opt.start = 1
    if (is_null(opt.end) && !is_number(opt.end)) opt.end = 8
    if (is_null(opt.submit) && !is_boolean(opt.submit)) opt.submit = true

    if (is_null(opt.prefix)) {
      opt.prefix = {}
      if (!is_object(opt)) {
        opt.prefix = {
          choice: "choice",
          comment: "answer"
        }
      }
    }

    if (is_null(opt.prefix.choice) && !is_string(opt.prefix.choice))
      opt.prefix.choice = "choice"
    if (is_null(opt.prefix.comment) && !is_string(opt.prefix.comment))
      opt.prefix.comment = "answer"

    return opt
  }

  // both inclusive
  const random_choice = (start, end, weight) => {
    // TODO: implemented weighting random
    return Math.floor((Math.random() * end) + start)
  }

  // result
  result = convert_result(result)
  cy.wrap(result, { log: false }).should('satisfy', is_number)
  // comment
  cy.wrap(comment, { log: false }).should('satisfy', str_or_null)
  // options
  options = merge_default(options)
  cy.wrap(options, { log: false }).should('satisfy', valid_options)

  cy.log(`result: ` + result)
  cy.log(`comment: ` + comment)
  cy.log(`options: ` + JSON.stringify(options))
  cy.wait(500)

  for (let i of Array(options.end).keys()) {
    let rand = random_choice(1, 5, result)
    let choice = options.start + i
    let choice_prefix = options.prefix.choice

    // cy.get('#' + prefix + choice + '-' + rand).select()
    cy.get('[type=radio][name="' + choice_prefix + '[' + choice + ']"]', { log: false }).check(String(rand), { log: false })
  }

  let textarea_prefix = options.prefix.comment
  if (!is_null(comment)) {
    cy.get('#' + textarea_prefix + (options.end + 1), { log: false }).type(comment)
  }

  if (options.submit) {
    cy.get("input[name=OK]").pause().click()
  }
  cy.log('Vote successful')
})