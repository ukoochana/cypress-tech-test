const login = require("../page-locators/login-elements.json")
const loginSelectors = login.loginLocators;

class loginPage {
    loginWithUserCredentials(user, password) {
        cy.get(loginSelectors.username).type(user);
        cy.get(loginSelectors.password).type(password);
        cy.get(loginSelectors.loginBtn).click();
    }
}
export default new loginPage();
