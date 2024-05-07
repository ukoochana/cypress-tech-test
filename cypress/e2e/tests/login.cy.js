import loginPage from "../page-actions/login-actions.cy.js";
const login = require("../page-locators/login-elements.json")
const loginSelectors = login.loginLocators;

describe('Login-related-tests', () => {

    beforeEach('Set up', () => {
        cy.visit(Cypress.config().baseUrl);
    })

    it('Login to the Application as standard_user', () => {
        cy.fixture("data.json").then((details) => {
            loginPage.loginWithUserCredentials(details.standard_user, details.password)
        })
        cy.get(loginSelectors.menu).click();
        cy.contains('Logout');
    })

    it('Login to the Application as problem_user', () => {
        cy.fixture("data.json").then((details) => {
            loginPage.loginWithUserCredentials(details.problem_user, details.password)
        })
        cy.get(loginSelectors.menu).click();
        cy.contains('Logout');
    })

    it('Login to the Application as performance_glitch_user, gave extra waiting of 1 minute', () => {
        cy.fixture("data.json").then((details) => {
            loginPage.loginWithUserCredentials(details.performance_glitch_user, details.password)
        })
        cy.get(loginSelectors.menu, { timeout: 60000 }).should('be.visible').click();
        // cy.get(loginSelectors.menu).click();
        cy.contains('Logout');
    })

    it('Incorrect Login credentials used for login', () => {
        cy.fixture("data.json").then((details) => {
            loginPage.loginWithUserCredentials(details.standard_user, details.incorrect_password)
        })
        cy.get(loginSelectors.loginError).should('have.text', "Epic sadface: Username and password do not match any user in this service")
    })

    it('locked_out_user error whilst logging', () => {
        cy.fixture("data.json").then((details) => {
            loginPage.loginWithUserCredentials(details.locked_out_user, details.password)
        })
        cy.get(loginSelectors.loginError).should('have.text', "Epic sadface: Sorry, this user has been locked out.")
    })
    
})
