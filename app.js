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
         * Creates the menu item template that is used to display all the different foods.
         * @param foods, list of foods in one tab
         * @returns {string}, HTML string to append to the DOM
         */
        menuItemFoodTemplate: function (foods) {
            var htmlString = '';
            for (var i = 0; i < foods.length; i++) {
                htmlString += '<div class="menu-item" draggable="true">' +
                    '              <div class="dragger-container">' +
                    '                  <img src="dragger.svg"/>' +
                    '              </div>' +
                    '              <div class="menu-item-info-container">' +
                    '                  <p class="menu-item__name">' +
                    foods[i].name +
                    '                  </p>' +
                    '                  <p class="menu-item__price">' + foods[i].price + '.-' + '</p>' +
                    '                  <p class="menu-item__info">' + foods[i].description + '</p>' +
                    '              </div>' +
                    '          </div>'
            }
            return htmlString;
        },

        /**
         * Creates the HTML for the order confirmed modal.
         * @returns {string} HTML of modal with type 'orderConfirmed', to be appended to DOM
         */
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
         * Creates the HTML for current orders.
         * @param currentOrders List of current orders, where each item is a list of order items in that order.
         * The inner list represents an order item, which has the properties (name, quantity).
         */
        currentOrdersTemplate: function (currentOrders) {
            var htmlString = '';
            for (var i = 0; i < currentOrders.length; i++) {
                htmlString += '<div class="order-container"><h2 class="order__number">Order ' + i + '</h2>';

                for (var j = 0; j < currentOrders[i].length; j++) {
                    htmlString += '<div class="order-item" data-index="' + i + '_' + j + '">' +
                        '<div><input type="checkbox" class="order-item__checkbox"/>' +
                        '<p class="order-item__name">' + currentOrders[i][j].name + '</p></div>' +
                        '<p class="order-item__quantity">x' + currentOrders[i][j].quantity + '</p>' +
                        '</div>'
                }

                htmlString += '</div>';
            }
            return htmlString;
        },

        /**
         * Renders current orders in manager sidebar.
         * @param currentOrders List of current outstanding orders
         */
        renderCurrentOrders: function (currentOrders) {
            $('.order-items-container').html(View.currentOrdersTemplate(currentOrders));
        },

        /**
         * Fetches and renders menu layout for given drinks.
         * @param drinks, list of drinks
         * @param isManager whether we are currently looking at the menu as manager, needed to remove drag and drop from manager view
         */
        renderMenu: function (drinks, isManager) {
            $('#menu').html(View.menuItemTemplate(drinks));
            View.registerMenuItemListeners(isManager);
        },

        /**
         * Fetches and renders menu layout for given foods.
         * @param foods, list of foods
         */
        renderFoodMenu: function (foods) {
            $('#menu').html(View.menuItemFoodTemplate(foods));
            View.registerMenuItemListeners();
        },
      
        /**
         * Renders modals of different types.
         * Toggles modal and modal overlay, and registers click listeners for closing modal.
         * @param modalType String representing type of modal wanted
         */
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
         * Renders spinner with dark overlay.
         */
        renderSpinner: function () {
            $('.modal-overlay').removeClass('closed');
            $('.spinner').removeClass('closed');
        },

        /**
         * Closes spinner and dark overlay.
         */
        closeSpinner: function () {
            $('.spinner').addClass('closed');
            $('.modal-overlay').addClass('closed');
        },

        /**
         * Registers menu item listeners. Registers 'dragstart', 'dragend' and 'click' listeners currently.
         */
        registerMenuItemListeners: function(isManager) {
            if (!isManager) {
                var menuItems = $('.menu-item');

                menuItems.on('dragstart', function (e) {
                    var source = e.target;
                    var targetName = $(source).find('.menu-item__name').html();
                    var targetPrice = $(source).find('.menu-item__price').html();

                    e.originalEvent.dataTransfer.effectAllowed = 'copy';
                    e.originalEvent.dataTransfer.setData('name', targetName);
                    e.originalEvent.dataTransfer.setData('price', targetPrice.split('.')[0]);
                    $('.order-items-container').addClass('over');
                });

                menuItems.on('dragend', function (e) {
                    $(View.orderItemsContainer).removeClass('over');
                });

                menuItems.on('click', function (e) {
                    var source = e.target;
                    var targetName = $(source).find('.menu-item__name').html();
                    var targetPrice = $(source).find('.menu-item__price').html().split('.')[0];

                    View.addNewOrderItem(targetName, targetPrice);
                });
            }
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

            $(function() {
                $('#en').trigger('click');
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
         *      markedAsDone - when 'Mark as done' is clicked
         *      undo - when 'Undo' is clicked
         *      redo - when 'Redo' is clicked
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
            } else if (eventType === 'markedAsDone') {
                $('.manager_button[data-option="done"]').on('click', function () {
                    var checkedItems = [];
                    var checkboxes = $('.order-item__checkbox:checked');
                    checkboxes.each(function (index, element) {
                        checkedItems.push($(element).parent().parent().attr('data-index'));
                    });
                    callback(checkedItems);
                });
            } else if (eventType === 'undo') {
                $('.manager_button[data-option="undo"]').on('click', function() {
                    callback();
                });
            } else if (eventType === 'redo') {
                $('.manager_button[data-option="redo"]').on('click', function() {
                    callback();
                });
            }
        },

        /**
         * Disables undo button in manager view.
         */
        disableUndoButton: function () {
            $('.manager_button[data-option="undo"]').addClass('hidden');
        },

        /**
         * Enables undo button in manager view.
         */
        enableUndoButton: function () {
            $('.manager_button[data-option="undo"]').removeClass('hidden');
        },

        /**
         * Disables redo button in manager view.
         */
        disableRedoButton: function () {
            $('.manager_button[data-option="redo"]').addClass('hidden');
        },

        /**
         * Enables redo button in manager view.
         */
        enableRedoButton: function () {
            $('.manager_button[data-option="redo"]').removeClass('hidden');
        }
    };

    var Controller = {

        /**
         * Boolean representing whether we are currently in manager view or not.
         */
        isManager: false,

        /**
         * Holds state of current orders and history.
         */
        state: {
            currentOrders: [],
            history: [],
            position: 0
        },

        /**
         * Contains functions to be run when document is loaded.
         */
        onLoaded: function() {
            // Checks whether we are in client or manager view, needed to display correct sidebar.
            if (window.location.href.indexOf('manager.html') === -1) {
                View.onLoaded();
            } else if (window.location.href.indexOf('manager.html') !== -1) {
                Controller.isManager = true;
                // TODO: Get current orders list from localStorage
                var currentOrders = [
                    [
                        { 'name': 'Ale', 'quantity': 2 },
                        { 'name': 'Lager', 'quantity': 1 }
                    ],
                    [
                        { 'name': 'White wine', 'quantity': 1 },
                        { 'name': 'Red wine', 'quantity': 2 }
                    ],
                ];

                Controller.state.currentOrders = currentOrders;
                Controller.state.history.push(currentOrders);
                View.renderCurrentOrders(currentOrders);
            }

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

                else if (filter === 'foods'){
                    Controller.loadFoods()
                }

                else if (filter ==='specials'){
                    Controller.loadSpecials()
                }
            });

            /**
             * Registers listener in View, handles payment option button clicks.
             */
            View.registerEventHandler('paymentOptionClicked', function (option) {
                if (option === 'card') {
                    View.renderSpinner();
                    setTimeout(function() {
                        View.closeSpinner();
                        View.renderModal('orderConfirm');
                    }, 5000);
                } else if (option === 'credit') {
                    View.renderModal('creditPayment');
                }
            });

            /**
             * Registers listener in View, handles 'Mark as done' button click in manager view.
             * Checks for items that remain after being marked done and creates a new state with those.
             * New state is pushed to currentOrders and state history.
             */
            View.registerEventHandler('markedAsDone', function (checkedItems) {
                var newOrdersList = [];
                for (var i = 0; i < Controller.state.currentOrders.length; i++) {

                    var newOrder = [];
                    for (var j = 0; j < Controller.state.currentOrders[i].length; j++) {
                        if (checkedItems.indexOf(i + "_" + j) === -1) { // finds the orders that remain after marked as done
                            newOrder.push(Object.assign({}, Controller.state.currentOrders[i][j])); // pushes these to new currentOrders
                        }

                    }
                    if (newOrder.length > 0) {
                        newOrdersList.push(newOrder);
                    }
                }
                //Update current state and history of states
                Controller.state.position = Math.min(Controller.state.position, Controller.state.history.length - 1);
                // Slice is needed to insert into current position after some undos (not into the state before undos)
                Controller.state.history = Controller.state.history.slice(0, Controller.state.position + 1);
                Controller.state.history.push(newOrdersList);
                Controller.state.position++;
                Controller.state.currentOrders = newOrdersList;
                View.renderCurrentOrders(newOrdersList);
                View.enableUndoButton();
                if (!Controller.canRedo()) {
                    View.disableRedoButton();
                }
            });

            /**
             * Registers listener in View, handles 'Undo' button click in manager view.
             * Manages state history and current state to enable undo functionality.
             */
            View.registerEventHandler('undo', function() {
                if (!Controller.canUndo()) {
                    return;
                }
                var newState = Controller.state.history[--Controller.state.position];
                Controller.state.currentOrders = newState;

                View.renderCurrentOrders(newState);
                View.enableRedoButton();
                if (!Controller.canUndo()) {

                    View.disableUndoButton();
                }
            });

            /**
             * Registers listener in View, handles 'Redo' button click in manager view.
             * Manages state history and current state to enable redo functionality.
             */
            View.registerEventHandler('redo', function() {
                if (!Controller.canRedo()) {
                    return;
                }

                var newState = Controller.state.history[++Controller.state.position];
                Controller.state.currentOrders = newState;
                View.renderCurrentOrders(newState);

                if (!Controller.canRedo()) {
                    View.disableRedoButton();
                }
            });

        },

        /**
         * Loads whiskey type drinks from Model and renders them in the View.
         */
        loadWhiskeys: function () {
            var whiskeyDrinks = Model.fetchWhiskeys();
            View.renderMenu(whiskeyDrinks, Controller.isManager);
        },

        /**
         * Loads wine type drinks from Model and renders them in the View.
         */
        loadWines: function () {
            var wineDrinks = Model.fetchWines();
            View.renderMenu(wineDrinks, Controller.isManager);
        },

        /**
         * Loads beer type drinks from Model and renders them in the View.
         */
        loadBeers: function () {
            var beerDrinks = Model.fetchBeers();
            View.renderMenu(beerDrinks, Controller.isManager)
        },

        /**
         * Checks if undo is possible.
         * @returns {boolean} Whether undo can be done
         */
        canUndo: function() {
            return Controller.state.position > 0;
        },

        /**
         * Checks if redo is possible.
         * @returns {boolean} Whether redo can be done
         */
        canRedo: function () {
            return Controller.state.position < Controller.state.history.length - 1;
        },

        /**
         * Loads foods from Model and renders them in the View.
         */
        loadFoods: function () {
            var food = Model.fetchFoods();
            View.renderFoodMenu(food)
        },

        /**
         * Loads special type drinks from Model and renders them in the View.
         */
        loadSpecials: function () {
            var specialDrinks = Model.fetchSpecials();
            View.renderMenu(specialDrinks)
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
        },

        /**
         * Fetches foods from the DB.
         * @returns {{name: string, price: string, category: string, description: string}[]}
         */
        fetchFoods: function(){
            return window.app.dbLoader.allFood();
        },

        /**
         * Fetches special type drinks from the DB.
         * @returns {{name: string, price: string, category: string, alcoholContent: string}[]}
         */
        fetchSpecials: function(){
            return window.app.dbLoader.allSpecialBeverages();
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
