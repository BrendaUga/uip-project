(function(window) {

    var View = {
        /**
         * HTML element (.order-items-container)
         */
        orderItemsContainer: null,

        /**
         * Creates the menu item template that is used to display all the different drinks.
         * @param drinks, list of drinks in one tab
         * @returns {string}, HTML string to append to the DOM
         */
        menuItemTemplate: function (drinks) {
            var htmlString = '';
            for (var i = 0; i < drinks.length; i++) {
                htmlString += '<div class="menu-item" draggable="true">' +
                    '              <div class="dragger-container">' +
                    '                  <img src="dragger.svg"/>' +
                    '              </div>' +
                    '              <div class="menu-item-info-container">' +
                    '                  <p class="menu-item__name">' +
                                            drinks[i].name +
                    '                  </p>' +
                    '                  <p class="menu-item__price">' + drinks[i].price + '.-' + '</p>' +
                    '                  <p class="menu-item__info">' + drinks[i].category + ', alc. ' + drinks[i].alcoholContent + '</p>' +
                    '              </div>' +
                    '          </div>'
            }
            return htmlString;
        },

        /**
         * Fetches and renders menu layout for given drinks.
         * @param drinks, list of drinks
         */
        renderMenu: function (drinks) {
            $('#menu').html(View.menuItemTemplate(drinks));
            View.registerMenuItemListeners();
        },

        /**
         * Registers menu item listeners. Registers 'dragstart', 'dragend' and 'click' listeners currently.
         */
        registerMenuItemListeners: function() {
            var menuItems = $('.menu-item');

            menuItems.on('dragstart', function(e) {
                var source = e.target;
                var targetName = $(source).find('.menu-item__name').html();
                var targetPrice = $(source).find('.menu-item__price').html();

                e.originalEvent.dataTransfer.effectAllowed = 'copy';
                e.originalEvent.dataTransfer.setData('name', targetName);
                e.originalEvent.dataTransfer.setData('price', targetPrice.split('.')[0]);
                $('.order-items-container').addClass('over');
            });

            menuItems.on('dragend', function(e) {
                $(View.orderItemsContainer).removeClass('over');
            });

            menuItems.on('click', function (e) {
                var source = e.target;
                var targetName = $(source).find('.menu-item__name').html();
                var targetPrice = $(source).find('.menu-item__price').html().split('.')[0];

                View.addNewOrderItem(targetName, targetPrice);
            });
        },

        /**
         * Contains functions to be run when document is loaded.
         * Registers drag events (dragover, dragenter and drop) on orderItemsContainer.
         */
        onLoaded: function() {
            View.orderItemsContainer = $('.order-items-container');

            $(View.orderItemsContainer).on('dragover', function(e) {
                return false;
            });

            $(View.orderItemsContainer).on('dragenter', function(e) {
                e.preventDefault();
            });

            $(View.orderItemsContainer).on('drop', function(e) {
                var newOrderItemPrice = e.originalEvent.dataTransfer.getData('price');
                var newOrderItemName = e.originalEvent.dataTransfer.getData('name');

                View.addNewOrderItem(newOrderItemName, newOrderItemPrice);

                $(View.orderItemsContainer).removeClass('over');
                e.stopPropagation();
                return false;
            });

        },

        /**
         * Adds new order item to order sidebar.
         * Takes in name and price of item to be added, creates HTML template and appends it to orderItemsContainer.
         * Additionally, calculates new total of order and renders it.
         * @param name, name of new item
         * @param price, price of new item
         */
        addNewOrderItem: function (name, price) {
            var newOrderItemHtml = '<div class="order-item"><p class="order-item__name">' + name + '</p><p class="order-item__price">' + price + '.-</p>';
            $(View.orderItemsContainer).append(newOrderItemHtml);

            var orderTotalPrice = $('.order-total__price');
            var currentTotalPrice = $(orderTotalPrice).html().length
                ? parseInt($(orderTotalPrice).html().split('.')[0])
                : 0;
            currentTotalPrice += parseInt(price);
            $(orderTotalPrice).html(currentTotalPrice + '.-');
        },

        /**
         * Registers event handlers in View.
         * Types of events supported:
         *      menuFilterClicked - whenever a menu filter (tab) gets clicked
         *      paymentOptionClicked - when a payment option button gets clicked
         *
         * @param {string} eventType, event type name
         * @param {Function} callback, callback to be run in Controller when event happens
         */
        registerEventHandler: function(eventType, callback) {
            if (eventType === 'menuFilterClicked') {
                $('.nav-tab').on('click', function (e) {
                    $('.nav-tab').removeClass('active');
                    $(this).addClass('active');
                    var filter = e.target.dataset.filter;
                    callback(filter);
                });
            } else if (eventType === 'paymentOptionClicked') {
                $('.sidebar-button').on('click', function (e) {
                    var paymentOption = e.target.dataset.option;
                    callback(paymentOption);
                });
            }
        },
    };

    var Controller = {
        /**
         * Contains functions to be run when document is loaded.
         */
        onLoaded: function() {
            View.onLoaded();

            /**
             * Registers listener in View, handles menu tab clicks.
             */
            View.registerEventHandler('menuFilterClicked', function (filter) {
                if (filter === 'whiskeys') {
                    Controller.loadWhiskeys();
                }
            });

            /**
             * Registers listener in View, handles payment option button clicks.
             */
            View.registerEventHandler('paymentOptionClicked', function (option) {
                if (option === 'card') {
                    // TODO: implement card payment modal here
                    console.log('Want to pay by card');
                } else if (option === 'credit') {
                    // TODO: implement credit payment flow here
                    console.log('Want to pay by credit');
                }
            });
        },

        /**
         * Loads whiskey type drinks from Model and renders them in the View.
         */
        loadWhiskeys: function () {
            var whiskeyDrinks = Model.fetchWhiskeys();
            View.renderMenu(whiskeyDrinks);
        }
    };

    var Model = {

        /**
         * Fetches whiskey type drinks from the DB.
         * @returns {{name: string, price: string, category: string, alcoholContent: string}[]}, list of drink objects
         */
        fetchWhiskeys: function() {
            return window.app.dbLoader.allWhiskeyBeverages();
        }
    };

    // Registers namespaces in window object.
    window.app = window.app || {};
    window.app.View = View;
    window.app.Controller = Controller;
    window.app.Model = Model;

    $(document).ready(function() {
       Controller.onLoaded();
    });

})(window);
