import loginPage from "../page-actions/login-actions.cy.js";
import productPage from "../page-actions/product-actions.cy.js";
const login = require("../page-locators/login-elements.json")
const loginSelectors = login.loginLocators;
const product = require("../page-locators/product-elements.json")
const productSelectors = product.productLocators;

describe('Products, Purchase and Checkout', () => {

    const listOfProducts = ["Test.allTheThings() T-Shirt (Red)",
        "Sauce Labs Onesie",
        "Sauce Labs Fleece Jacket",
        "Sauce Labs Bolt T-Shirt",
        "Sauce Labs Bike Light",
        "Sauce Labs Backpack"];

    const priceOfProducts = ["$29.99", "$9.99", "$15.99", "$49.99", "$7.99", "$15.99"];

    beforeEach('Set-up', () => {
        cy.visit(Cypress.config().baseUrl);
        cy.fixture("data.json").then((details) => {
            loginPage.loginWithUserCredentials(details.standard_user, details.password)
        })
    })

    it('Presence of all the 6 products on products page', () => {
        cy.contains("Products")
        cy.get(product.productLocator.productName).should('have.length', 6)
        cy.get(product.productLocator.productName).each((element, index) => {
            expect(listOfProducts).includes(element.text())
        })
    })

    it('Assert products, prices and the related text on each item', () => {
        cy.get(product.productLocator.productList).invoke('text').then((text) => {
            expect(text).to.include(`${listOfProducts[5]}carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.${priceOfProducts[0]}ADD TO CART`)
            expect(text).to.include(`${listOfProducts[4]}A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.${priceOfProducts[1]}ADD TO CART`)
            expect(text).to.include(`${listOfProducts[3]}Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.${priceOfProducts[2]}ADD TO CART`)
            expect(text).to.include(`${listOfProducts[2]}It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.${priceOfProducts[3]}ADD TO CART`)
            expect(text).to.include(`${listOfProducts[1]}Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.${priceOfProducts[4]}ADD TO CART`)
            expect(text).to.include(`${listOfProducts[0]}This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.${priceOfProducts[5]}ADD TO CART`)
        })
    })

    it('Purchase one item, review that item and do a complete checkout', () => {
        productPage.orderItem(listOfProducts[4]);
        cy.get(product.productLocator.addToCart).click()
        productPage.checkout();
        productPage.completeCheckoutDetails();
        cy.contains(listOfProducts[4])
        productPage.completeThePurchase();
        cy.get(product.productLocator.orderConfirmation).invoke('text').then((text) => {
            expect(text).to.contain("THANK YOU FOR YOUR ORDER");
        })
    })

    it('Purchase few items, review them and do a complete checkout', () => {
        cy.get(product.productLocator.productList).find(product.productLocator.productItem).each(($el) => {
            const productName = $el.find(product.productLocator.productName).text()
            if (productName.includes(listOfProducts[0])) {
                cy.wrap($el).find(product.productLocator.addToCart).click()
            }
            if (productName.includes(listOfProducts[1])) {
                cy.wrap($el).find(product.productLocator.addToCart).click()
            }
            if (productName.includes(listOfProducts[5])) {
                cy.wrap($el).find(product.productLocator.addToCart).click()
            }
        })
        productPage.checkout();
        productPage.completeCheckoutDetails();
        cy.contains(listOfProducts[0])
        cy.contains(listOfProducts[1])
        cy.contains(listOfProducts[5])
        productPage.completeThePurchase();
        cy.get(product.productLocator.orderConfirmation).invoke('text').then((text) => {
            expect(text).to.contain("THANK YOU FOR YOUR ORDER");
        })
    })

    it('Add few items to the cart, review them, remove one item from thecart and then do a checkout', () => {
        cy.get(product.productLocator.productList).find(product.productLocator.productItem).each(($el, index, list) => {
            const productName = $el.find(product.productLocator.productName).text()
            if (productName.includes(listOfProducts[4])) {
                cy.wrap($el).find(product.productLocator.addToCart).click()
            }
            if (productName.includes(listOfProducts[1])) {
                cy.wrap($el).find(product.productLocator.addToCart).click()
            }
            if (productName.includes(listOfProducts[5])) {
                cy.wrap($el).find(product.productLocator.addToCart).click()
            }
        })
        cy.get(product.productLocator.shoppingCart).click();
        cy.get(product.productLocator.cartList).find(product.productLocator.cartItem).each(($el, index, list) => {
            const cartItemName = $el.find(product.productLocator.cartItemName).text()
            if (cartItemName.includes(listOfProducts[4])) {
                cy.wrap($el).find(product.productLocator.removeItem).click()
            }
        })
        productPage.checkout();
        productPage.completeCheckoutDetails();
        cy.contains(listOfProducts[1])
        cy.contains(listOfProducts[5])
        productPage.completeThePurchase();
        cy.get(product.productLocator.orderConfirmation).invoke('text').then((text) => {
            expect(text).to.contain("THANK YOU FOR YOUR ORDER");
        })
    })

    it('Try to purchase couple of items, review them, and go back for further shopping and do a checkout', () => {
        cy.get(product.productLocator.productList).find(product.productLocator.productItem).each(($el) => {
            const productName = $el.find(product.productLocator.productName).text()
            if (productName.includes(listOfProducts[2])) {
                cy.wrap($el).find(product.productLocator.addToCart).click()
            }
            if (productName.includes(listOfProducts[4])) {
                cy.wrap($el).find(product.productLocator.addToCart).click()
            }
        })
        productPage.checkout();
        productPage.cancelCheckout();
        productPage.continueShopping();
        cy.get(product.productLocator.productList).find(product.productLocator.productItem).each(($el) => {
            const productName = $el.find(product.productLocator.productName).text()
            if (productName.includes(listOfProducts[1])) {
                cy.wrap($el).find(product.productLocator.addToCart).click()
            }
        })
        productPage.checkout();
        productPage.completeCheckoutDetails();
        cy.contains(listOfProducts[1])
        cy.contains(listOfProducts[2])
        cy.contains(listOfProducts[4])
        productPage.completeThePurchase();
        cy.get(product.productLocator.orderConfirmation).invoke('text').then((text) => {
            expect(text).to.contain("THANK YOU FOR YOUR ORDER");
        })
    })
})
