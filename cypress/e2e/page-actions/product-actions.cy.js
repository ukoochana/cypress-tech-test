const product = require('../page-locators/product-elements.json');
const productLocators = product.productLocator;

class productPage {

    orderItem(option) {
        switch (option) {
            case "Sauce Labs Bike Light":
                cy.contains("Sauce Labs Bike Light").click();
                break;
            case "Test.allTheThings() T-Shirt (Red)":
                cy.contains("Test.allTheThings() T-Shirt (Red)").click();
                break;
            case "Sauce Labs Onesie":
                cy.contains("Sauce Labs Onesie").click();
                break;
            case "Sauce Labs Fleece Jacket":
                cy.contains("Sauce Labs Fleece Jacket").click();
                break;
            case "Sauce Labs Bolt T-Shirt":
                cy.contains("Sauce Labs Bolt T-Shirt").click();
                break;
            case "Sauce Labs Backpack":
                cy.contains("Sauce Labs Backpack").click();
                break;
        }
    }

    checkout() {
        cy.get(productLocators.shoppingCart).click();
        cy.get(productLocators.checkout).click();
    }

    completeCheckoutDetails() {
        cy.get(productLocators.firstName).type("test");
        cy.get(productLocators.lastName).type("automation");
        cy.get(productLocators.postalCode).type("AB1 4CD");
        cy.get(productLocators.submit).click();
    }

    completeThePurchase() {
        cy.get(productLocators.finish).click();
    }

    cancelCheckout() {
        cy.get(productLocators.cancelBtn).click();
    }

    continueShopping() {
        cy.get(productLocators.continueShoppingBtn).click();
    }
}
export default new productPage();
