(function(window) {
    /**
     *  Retrieves all beverages that are "Whisky" from the database.
     *  Returns:
     *  array of beverages, where each entry is an object containing:
     *    beverage name,
     *    price,
     *    type,
     *    alcohol content,
     *    quantity
     * @author Brenda Uga
     * @returns {{name: string, price: string, category: string, alcoholContent: string, quantity: string}[]}
     */
    function allWhiskeyBeverages() {

        var collector = [];

        for (var i = 0; i < DB5.spirits.length; i++) {
            // Retrieves first 22 items, because that's the amount of different whiskeys in a normal pub
            if (DB5.spirits[i].varugrupp.includes("Whisky") && collector.length < 22) {
                collector.push({
                    name: DB5.spirits[i].namn,
                    price: DB5.spirits[i].prisinklmoms,
                    category: DB5.spirits[i].varugrupp,
                    alcoholContent: DB5.spirits[i].alkoholhalt,
                    quantity: DB5.spirits[i].quantity
                });
            }
        }
        return collector;
    }

    /**
     *  Retrieves all beverages that are "Wine" from the database.
     *  Returns:
     *  array of beverages, where each entry is an object containing:
     *    beverage name,
     *    price,
     *    type,
     *    alcohol content,
     *    quantity
     * @author Brenda Uga
     * @returns {{name: string, price: string, category: string, alcoholContent: string, quantity: string}[]}
     */
    function allWineBeverages() {

        var collector = [];

        for (var i = 0; i < DB5.spirits.length; i++) {
            // Retrieves first 22 items, because that's the amount of different wines in a normal pub
            if (DB5.spirits[i].varugrupp.includes("Vin") || DB5.spirits[i].varugrupp.includes("vin") && collector.length < 22) {
                collector.push({
                    name: DB5.spirits[i].namn,
                    price: DB5.spirits[i].prisinklmoms,
                    category: DB5.spirits[i].varugrupp,
                    alcoholContent: DB5.spirits[i].alkoholhalt,
                    quantity: DB5.spirits[i].quantity
                });
            }
        }
        return collector;
    }

    /**
     *  Retrieves all beverages that are "Öl" from the database.
     *  Returns:
     *  array of beverages, where each entry is an object containing:
     *    beverage name,
     *    price,
     *    type,
     *    alcohol content,
     *    quantity
     * @author Brenda Uga
     * @returns {{name: string, price: string, category: string, alcoholContent: string, quantity: string}[]}
     */
    function allBeerBeverages() {

        var collector = [];

        for (var i = 0; i < DB5.spirits.length; i++) {
            // Retrieves first 22 items, because that's the amount of different beers in a normal pub
            if (DB5.spirits[i].varugrupp.includes("Öl") && collector.length < 22) {
                collector.push({
                    name: DB5.spirits[i].namn,
                    price: DB5.spirits[i].prisinklmoms,
                    category: DB5.spirits[i].varugrupp,
                    alcoholContent: DB5.spirits[i].alkoholhalt,
                    quantity: DB5.spirits[i].quantity
                });
            }
        }
        return collector;
    }

    /**
     *  Retrieves all foods that are "Food" from the database.
     *  Returns:
     *  array of foods, where each entry is an object containing:
     *    food name,
     *    price,
     *    type,
     *    description
     * @returns {{name: string, price: string, category: string, description: string}[]}
     */
    function allFood() {

        var collector = [];

        for (var i = 0; i < DB5.foods.length; i++) {
            // Retrieves all food items
            if (DB5.foods[i].varugrupp.includes("food")) {
                collector.push({
                    name: DB5.foods[i].namn,
                    price: DB5.foods[i].prisinklmoms,
                    category: DB5.foods[i].varugrupp,
                    description: DB5.foods[i].beskrivning
                });
            }
        }
        return collector;
    }

    /**
     * Retrieves all beverages that are "Special" from the database.
     * Returns:
     * array of beverages, where each entry is an object containing:
     *    beverage name,
     *    price,
     *    type,
     *    alcohol content,
     *    quantity
     * @author Brenda Uga
     * @returns {{name: string, price: string, category: string, alcoholContent: string, quantity: string}[]}
     */
    function allSpecialBeverages() {

        var collector = [];

        for (var i = 0; i < DB5.spirits.length; i++) {
            // Retrieves first 22 items, because that's the amount of different beers in a normal pub
            if (DB5.spirits[i].special.includes("special") && collector.length < 22) {
                collector.push({
                    name: DB5.spirits[i].namn,
                    price: DB5.spirits[i].prisinklmoms,
                    category: DB5.spirits[i].varugrupp,
                    alcoholContent: DB5.spirits[i].alkoholhalt,
                    quantity: DB5.spirits[i].quantity
                });
            }
        }
        return collector;
    }

    /**
     * Adds 5 quantity to all items where the current quantity is 0.
     * @author Brenda Uga
     */
    function restock() {

        for (var i = 0; i < DB5.spirits.length; i++) {
            if (DB5.spirits[i].quantity === '0') {
                DB5.spirits[i].quantity = '5';
            }
        }
    }

    /**
     * Decreases the amounts on the specified drinks.
     * @author Brenda Uga
     * @param orderedItems object containing drink name and quantity ordered
     */
    function decreaseAmounts(orderedItems) {
        for (var i = 0; i < orderedItems.length; i++) {
            var drinkInDb = DB5.spirits.filter(drink => drink.namn === orderedItems[i].name)[0];
            var newQuantity = drinkInDb.quantity - orderedItems[i].quantity;
            drinkInDb.quantity = '' + newQuantity;
        }
    }

    /**
     * Retrieves all beverages and their quantities from the DB.
     * Returns:
     * array of beverages, where each entry is an object containing:
     *    beverage name,
     *    quantity
     * @author Brenda Uga
     * @returns {{name: string, quantity: string}[]}
     */
    function allBeverages() {

        var collector = [];

        for (var i = 0; i < DB5.spirits.length; i++) {
            collector.push({
                name: DB5.spirits[i].namn,
                quantity: DB5.spirits[i].quantity
            });
        }
        return collector;
    }

    //@author Brenda Uga
    window.app = window.app || {};
    window.app.dbLoader = {
        allWhiskeyBeverages: allWhiskeyBeverages,
        allWineBeverages: allWineBeverages,
        allBeerBeverages: allBeerBeverages,
        allFood: allFood,
        allSpecialBeverages: allSpecialBeverages,
        allBeverages: allBeverages,
        restock: restock,
        decreaseAmounts: decreaseAmounts
    };

})(window);