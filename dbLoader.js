(function(window) {
    /**
     *  Retrieves all beverages that belong to category "Whiskey, Malt" from the database.
     *  Returns:
     *  array of beverages, where each entry is an object containing:
     *    beverage name,
     *    price,
     *    type,
     *    alcohol content
     * @returns {{name: string, price: string, category: string, alcoholContent: string}[]}
     */
    function allWhiskeyBeverages() {

        var collector = [];

        for (var i = 0; i < DB2.spirits.length; i++) {
            // Retrieves first 22 items, because that's the amount of different whiskeys in a normal pub
            if (DB2.spirits[i].varugrupp.includes("Whisky")&& collector.length < 22) {
                collector.push({
                    name: DB2.spirits[i].namn,
                    price: DB2.spirits[i].prisinklmoms,
                    category: DB2.spirits[i].varugrupp,
                    alcoholContent: DB2.spirits[i].alkoholhalt
                });
            }
        }

        return collector;
    }


    window.app = window.app || {};
    window.app.dbLoader = {
        allWhiskeyBeverages: allWhiskeyBeverages
    };

})(window);