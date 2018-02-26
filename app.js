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

        orderConfirmModalTemplate: function() {
            return '' +
                '        <div class="modal-header-container">' +
                '            <img src="done.svg"/>' +
                '        </div>' +
                '        <div class="modal-body-container">' +
                '            <h1>YOUR ORDER IS ON <br>IT\'S WAY</h1>' +
                '        </div>' +
                '        <div class="modal-footer-container">' +
                '            <button type="button" class="button__link close-modal-link">Back to menu</button>' +
                '        </div>';
        },

        /**
         * Fetches and renders menu layout for given drinks.
         * @param drinks, list of drinks
         */
        renderMenu: function (drinks) {
            $('#menu').html(View.menuItemTemplate(drinks));
            View.registerMenuItemListeners();
        },

        renderModal: function (modalType) {
            var modalContainer = $('.modal-container');
            var modalOverlay = $('.modal-overlay');

            if (modalType === 'orderConfirm') {
                $(modalContainer).html(View.orderConfirmModalTemplate());
            } else if (modalType === 'creditPayment') {
                //TODO: implement creditPayment template and render here
                console.log("Credit payment modal needed here now");
            }

            $(modalContainer).removeClass('closed');
            $(modalOverlay).removeClass('closed');
            $('.close-modal-link, .modal-overlay').on('click', function() {
                $(modalContainer).addClass('closed');
                $(modalOverlay).addClass('closed');
            });

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
            var removeButton = $('<img class="remove-order-item" src="remove.svg"/>');
            var newOrderItemHtml = $('<div class="order-item"><div><p class="order-item__name">' + name + '</p></div><p class="order-item__price">' + price + '.-</p></div>');
            $(View.orderItemsContainer).append(newOrderItemHtml);
            newOrderItemHtml.children('div').prepend(removeButton);

            var orderTotalPrice = $('.order-total__price');
            var currentTotalPrice = $(orderTotalPrice).html().length
                ? parseInt($(orderTotalPrice).html().split('.')[0])
                : 0;
            currentTotalPrice += parseInt(price);
            $(orderTotalPrice).html(currentTotalPrice + '.-');

            $(removeButton).on('click', function(e) {
                var orderItemPrice = $(e.target).parent().parent().find('.order-item__price')[0].innerHTML.split('.')[0];
                var currentTotalPrice = $(orderTotalPrice).html().length
                    ? parseInt($(orderTotalPrice).html().split('.')[0])
                    : 0;
                var newOrderTotalPrice = currentTotalPrice - orderItemPrice;
                $(orderTotalPrice).html(newOrderTotalPrice + '.-');
                $(e.target).parents('.order-item').remove();
            });
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
                    Controller.loadWhiskeys()
                }

                else if(filter === 'wines'){
                    Controller.loadWines()
                }

                else if (filter === 'beers'){
                    Controller.loadBeers()
                }
            });

            /**
             * Registers listener in View, handles payment option button clicks.
             */
            View.registerEventHandler('paymentOptionClicked', function (option) {
                if (option === 'card') {
                    setTimeout(function() {
                        View.renderModal('orderConfirm');
                    }, 5000);
                } else if (option === 'credit') {
                    View.renderModal('creditPayment');
                }
            });
        },

        /**
         * Loads whiskey type drinks from Model and renders them in the View.
         */
        loadWhiskeys: function () {
            var whiskeyDrinks = Model.fetchWhiskeys();
            View.renderMenu(whiskeyDrinks);
        },

        /**
         * Loads wine type drinks from Model and renders them in the View.
         */
        loadWines: function () {
            var wineDrinks = Model.fetchWines();
            View.renderMenu(wineDrinks);
        },

        /**
         * Loads beer type drinks from Model and renders them in the View.
         */
        loadBeers: function () {
            var beerDrinks = Model.fetchBeers();
            View.renderMenu(beerDrinks)
        }

    };


    var Model = {

        /**
         * Fetches whiskey type drinks from the DB.
         * @returns {{name: string, price: string, category: string, alcoholContent: string}[]}, list of drink objects
         */
        fetchWhiskeys: function() {
            return window.app.dbLoader.allWhiskeyBeverages();
        },

        /**
         * Fetches wine type drinks from the DB.
         * @returns {{name: string, price: string, category: string, alcoholContent: string}[]}, list of drink objects
         */
        fetchWines: function() {
            return window.app.dbLoader.allWineBeverages();
        },

        /**
         * Fetches beer type drinks from the DB.
         * @returns {{name: string, price: string, category: string, alcoholContent: string}[]}, list of drink objects
         */
        fetchBeers: function(){
            return window.app.dbLoader.allBeerBeverages();
        }
    };

    // Registers namespaces in window object.
    window.app = window.app || {};
    window.app.View = View;
    window.app.Controller = Controller;
    window.app.Model = Model;
    $(document).ready(function() {
       Controller.onLoaded();

        $(function() {
            $('#en').click();
        });
    });

})(window);
