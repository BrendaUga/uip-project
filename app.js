(function(window) {
    /**
     * String containing the username of the current user
     * @author Guillermo Martinez
     */
    var activeUser = null;

    var View = {
        /**
         * HTML element (.order-items-container)
         * @author Brenda Uga
         */
        orderItemsContainer: null,

        /**
         * Currently selected language, by key.
         * @author Brenda Uga
         */
        selectedLanguage: null,

        /**
         * Creates the menu item template that is used to display all the different drinks.
         * @author Brenda Uga
         * @param drinks, list of drinks in one tab
         * @returns {string}, HTML string to append to the DOM
         */
        menuItemTemplate: function (drinks) {
            var htmlString = '';
            for (var i = 0; i < drinks.length; i++) {
                htmlString += '<div class="menu-item' + (drinks[i].quantity === "0" ? ' out-of-stock' : '') + '" draggable="' + (drinks[i].quantity === "0" ? 'false' : 'true') +'">' +
                    '              <div class="dragger-container">' +
                    '                  <img src="dragger.svg"/>' +
                    '              </div>' +
                    '              <div class="menu-item-info-container">' +
                    '                  <p class="menu-item__name">' + drinks[i].name + '</p>' +
                    '                  <p class="menu-item__price">' + drinks[i].price + '.-' + '</p>' +
                    '                  <p class="menu-item__info">' + drinks[i].category + ', alc. ' + drinks[i].alcoholContent + '</p>' +
                    '                  <p class="menu-item__quantity">' + drinks[i].quantity + '</p>' +
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
         * @author Brenda Uga
         * @returns {string} HTML of modal with type 'orderConfirmed', to be appended to DOM
         */
        orderConfirmModalTemplate: function() {
            return '' +
                '        <div class="modal-header-container">' +
                '            <img src="done.svg"/>' +
                '        </div>' +
                '        <div class="modal-body-container">' +
                '            <h1 class="tr" key="orderConfirmed">' + View.translate("orderConfirmed") + '</h1>' +
                '        </div>' +
                '        <div class="modal-footer-container">' +
                '            <button type="button" class="button__link close-modal-link tr" key="backToMenu">' + View.translate("backToMenu") + '</button>' +
                '        </div>';
        },

        /**
         * Creates the HTML for the restock confirmed modal.
         * @author Brenda Uga
         * @returns {string} HTML of modal with type 'restockConfirmed', to be appended to DOM
         */
        restockConfirmedModalTemplate: function() {
            return '' +
                '        <div class="modal-header-container">' +
                '            <img src="done.svg"/>' +
                '        </div>' +
                '        <div class="modal-body-container">' +
                '            <h1 class="tr" key="restockConfirmed">' + View.translate("restockConfirmed") + '</h1>' +
                '        </div>' +
                '        <div class="modal-footer-container">' +
                '            <button type="button" class="button__link close-modal-link tr" key="backToMenu">' + View.translate("backToMenu") + '</button>' +
                '        </div>';
        },

        /**
         * Creates the HTML for the not enough stock modal.
         * @author Brenda Uga
         * @returns {string} HTML of modal with type 'notEnoughStock', to be appended to DOM
         */
        notEnoughStockModalTemplate: function () {
            return '' +
                '        <div class="modal-header-container">' +
                '            <img src="cancel-button.svg"/>' +
                '        </div>' +
                '        <div class="modal-body-container">' +
                '            <h1 class="tr" key="notEnoughStock">' + View.translate("notEnoughStock") + '</h1>' +
                '        </div>' +
                '        <div class="modal-footer-container">' +
                '            <button type="button" class="button__link close-modal-link tr" key="backToMenu">' + View.translate("backToMenu") + '</button>' +
                '        </div>';
        },

        /**
         * Creates the HTML for the login modal.
         * @author Guillermo Martinez
         * @returns {string} HTML of modal with type 'login',
         */
        loginModalTemplate: function () {
            return '' +
                '    <div id="loginModal" class="loginModal">' +
                '       <div class="modal_content">' +
                /*'            <div class="modal_header">' +
                '                <span class="closeBtn">&times;</span>' +
                '            </div>' +*/
                '            <div class="modal_body">' +
                '                <h1 id="modalHeaderH1" key="loginWelcome">' + View.translate("loginWelcome") + '</h1>' +
                '                <form name="loginForm" method="post" id="loginForm">' +
                '                   <div id="form_elements" style="width: 100%">' +
                '                        <div id="userPassWrapper">' +
                '                           <div class="login_text" key="username">' + View.translate("username") + '</div>' +
                '                           <input id="usernameField" type=text list=users name="userId" >' +
                '                           <datalist id=users>' +
                '                               <option> Charlie (VIP Client)' +
                '                               <option> Bob (VIP Client)' +
                '                               <option> Alice (Manager)' +
                '                           </datalist>' +
                '                           <div class="login_text" key="password">' + View.translate("password") + '</div>' +
                '                           <input id="passwordField" type="Password" name="pwd"></td>' +
                '                        </div>' +
                '                        <div id="sendLogInBtnWrapper">' +
                '                            <button id="sendLogInBtn" type="button" class="tr" key="login">' + View.translate("login") + '</button>' +
                '                        </div>' +
                '                    </div>' +
                '                </form>' +
                '            </div>' +
                '       </div>' +
                '   </div>';
        },

        /**
         * Creates the HTML for current orders.
         * @author Brenda Uga
         * @param currentOrders List of current orders, where each item is a list of order items in that order.
         * The inner list represents an order item, which has the properties (name, quantity).
         */
        currentOrdersTemplate: function (currentOrders) {
            var htmlString = '';
            for (var i = 0; i < currentOrders.length; i++) {
                htmlString += '<div class="order-container"><h2 class="order__number"><span class="tr" key="order">Order</span> ' + i +'</h2>';

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
         * @author Brenda Uga
         * @param currentOrders List of current outstanding orders
         */
        renderCurrentOrders: function (currentOrders) {
            $('.order-items-container').html(View.currentOrdersTemplate(currentOrders));
        },

        /**
         * Fetches and renders menu layout for given drinks.
         * @author Brenda Uga
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
         * @author Brenda Uga
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
            } else if (modalType === 'restockConfirmed') {
                $(modalContainer).html(View.restockConfirmedModalTemplate());
            } else if (modalType === 'notEnoughStock') {
                $(modalContainer).html(View.notEnoughStockModalTemplate());
            } else if (modalType === 'login') {
                $(modalContainer).html(View.loginModalTemplate());
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
         * @author Brenda Uga
         */
        renderSpinner: function () {
            $('.modal-overlay').removeClass('closed');
            $('.spinner').removeClass('closed');
        },

        /**
         * Closes spinner and dark overlay.
         * @author Brenda Uga
         */
        closeSpinner: function () {
            $('.spinner').addClass('closed');
            $('.modal-overlay').addClass('closed');
        },

        /**
         * Registers menu item listeners. Registers 'dragstart' and 'dragend' listeners currently.
         * @author Brenda Uga
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

                if (window.matchMedia('(max-width: 768px)').matches) {
                    menuItems.on('click', function (e) {
                        if (!$(e.target).parent().hasClass('out-of-stock')) {
                            var source = e.target;
                            var targetName = $(source).find('.menu-item__name').html();
                            var targetPrice = $(source).find('.menu-item__price').html().split('.')[0];

                            View.addNewOrderItem(targetName, targetPrice);
                        }
                    });
                }
            }
        },

        /**
         * Contains functions to be run when document is loaded.
         * Registers drag events (dragover, dragenter and drop) on orderItemsContainer.
         * Registers language selection click listener.
         * @author Brenda Uga
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

            $('.lang').on('click', function() {
                var lang = $(this).attr('id'); // obtain language id
                View.selectedLanguage = lang;
                // translate all translatable elements
                $('.tr').each(function() {
                    $(this).text(LangTrans[lang][ $(this).attr('key') ]);
                });
            });

            $(function() {
                $('#en').trigger('click');
            });
          
            $(function() {
                $('#beerbutton').trigger('click');
            });

        },

        /**
         * Translate function for when we need a specific string translated to current selected language.
         * @author Brenda Uga
         */
        translate: function(key) {
            return LangTrans[View.selectedLanguage][key];
        },

        /**
         * Functions to be run when manager view is loaded.
         * This is different from client view onLoaded, because we render different things onLoad.
         * @author Brenda Uga
         */
        onManagerViewLoaded: function() {
            $(function() {
                $('#en').trigger('click');
            });
            $(function() {
                $('.nav-tab[data-filter="beers"]').trigger('click');
            });

            $('.lang').on('click', function() {
                var lang = $(this).attr('id'); // obtain language id
                View.selectedLanguage = lang;
                // translate all translatable elements
                $('.tr').each(function() {
                    $(this).text(LangTrans[lang][ $(this).attr('key') ]);
                });
            });
        },

        /**
         * Adds new order item to order sidebar.
         * Takes in name and price of item to be added, creates HTML template and appends it to orderItemsContainer.
         * Additionally, calculates new total of order and renders it.
         * @author Brenda Uga
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
                $(e.target).parents('.order-item').remove();
                View.updateTotalInSidebar();
            });
        },

        /**
         * Updates total sum in sidebar.
         * @author Brenda Uga
         */
        updateTotalInSidebar: function () {
            var orderItemPriceElems = $('.order-item__price');
            if (orderItemPriceElems.length === 0) {
                $('.order-total__price').html('');
            } else {
                var orderTotalPrice = $('.order-total__price');
                var total = 0;
                orderItemPriceElems.each(function () {
                    total += parseInt($( this ).html().split('.')[0]);
                });
                orderTotalPrice.html(total + '.-');
            }
        },

        /**
         * Registers event handlers in View.
         * Types of events supported:
         *      menuFilterClicked - whenever a menu filter (tab) gets clicked
         *      paymentOptionClicked - when a payment option button gets clicked
         *      markedAsDone - when 'Mark as done' is clicked
         *      undo - when 'Undo' is clicked
         *      redo - when 'Redo' is clicked
         *      restock - when 'Restock' is clicked
         * @author Brenda Uga
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
                $('.sidebar-button:not(.manager_button)').on('click', function (e) {
                    var paymentOption = e.target.dataset.option;

                    var orders = document.querySelectorAll('.order-item__name');
                    var activeTab = $('.nav-tab.active').html();
                    callback(paymentOption, orders, activeTab);
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
            } else if (eventType === 'restock') {
                $('.restock-button').on('click', function () {
                    View.renderModal('restockConfirmed');
                    var activeTab = $('.nav-tab.active').html();
                    callback(activeTab);
                });
            }
        },

        /**
         * Listener for the login button
         * @author Guillermo Martinez
         */
        loginButtonListener: function(callback) {
            $('#login_button').on('click', function () {
                callback();
            });
        },

        /**
         * Send the login information collected by the form
         * @author Guillermo Martinez
         */
        sendLogin: function(callback) {
            $('#sendLogInBtn').on('click', function () {
                callback();
            });
        },

        /**
         * Disables undo button in manager view.
         * @author Brenda Uga
         */
        disableUndoButton: function () {
            $('.manager_button[data-option="undo"]').addClass('hidden');
        },

        /**
         * Enables undo button in manager view.
         * @author Brenda Uga
         */
        enableUndoButton: function () {
            $('.manager_button[data-option="undo"]').removeClass('hidden');
        },

        /**
         * Disables redo button in manager view.
         * @author Brenda Uga
         */
        disableRedoButton: function () {
            $('.manager_button[data-option="redo"]').addClass('hidden');
        },

        /**
         * Enables redo button in manager view.
         * @author Brenda Uga
         */
        enableRedoButton: function () {
            $('.manager_button[data-option="redo"]').removeClass('hidden');
        },

        /**
         * Empties the order sidebar after order is placed
         * @author Brenda Uga
         */
        emptySidebar: function () {
            $('.order-items-container').html('');
        }

    };

    var Controller = {

        /**
         * Boolean representing whether we are currently in manager view or not.
         * @author Brenda Uga
         */
        isManager: false,

        /**
         * Holds state of current orders and history.
         * @author Brenda Uga
         */
        state: {
            currentOrders: [],
            history: [],
            position: 0
        },

        /**
         * Boolean representing whether the modal for the login is openned from the specials tab or the login button
         * @author Guillermo Martinez
         */
        modalFromSpecials: true,

        /**
         * Contains functions to be run when document is loaded.
         * @author Brenda Uga
         */
        onLoaded: function() {
            // Checks whether we are in client or manager view, needed to display correct sidebar.
            if (window.location.href.indexOf('manager.html') === -1) {
                View.onLoaded();
            } else if (window.location.href.indexOf('manager.html') !== -1) {
                View.onManagerViewLoaded();
                Controller.isManager = true;

                View.renderCurrentOrders(Controller.calculateCurrentOrders());
            }

            /**
             * Registers listener in View, handles menu tab clicks.
             * @author Brenda Uga
             */
            View.registerEventHandler('menuFilterClicked', function (filter) {
                if (filter === 'whiskeys') {
                    Controller.loadWhiskeys()
                } else if(filter === 'wines') {
                    Controller.loadWines()
                } else if (filter === 'beers') {
                    Controller.loadBeers()
                } else if (filter === 'specials') {
                    if (activeUser == null && !Controller.isManager) {
                        Controller.modalFromSpecials = true;
                        View.renderModal('login');
                        /**
                         * Handles click on login button from the login modal
                         * @author Guillermo Martinez
                         */
                        View.sendLogin(function () {
                            /* Find a way to access the form from here*/
                            var username = $('#usernameField').val();
                            var pass = $('#passwordField').val();
                            if (Model.checkLogin(username, pass)) {
                                if (username === "Alice (Manager)" && pass === "123") {
                                    activeUser = username;
                                    window.location.href = "manager.html";
                                } else {
                                    $('#loggedUsername').text(username + ',');
                                    activeUser = username;
                                    $('#login_button').html(View.translate("logout"));
                                    $('.modal-container').addClass('closed');
                                    $('.modal-overlay').addClass('closed');
                                    if (Controller.modalFromSpecials) {
                                        window.app.Controller.loadSpecials();
                                    }
                                }
                            }
                        });
                    } else {
                        Controller.loadSpecials();
                    }
                } else if (filter === 'foods') {
                        Controller.loadFoods();
                }
            });

            /**
             * Handles click on login button. Logs out if there is already a logged in user
             * @author Guillermo Martinez
             */
            View.loginButtonListener(function() {
                if (Controller.isManager) {
                    window.location.href = "index.html";
                    activeUser = null;
                    $('#loggedUsername').text("");
                    $('#usernameField').val("");
                    $('#login_button').html(View.translate("login"));
                    window.app.Controller.loadBeers();
                    $('.nav-tab').removeClass('active');
                    $('.nav-tab[data-filter="beers"]').addClass('active');
                } else if (activeUser == null) {
                    /*View.showLoginModal(function() {
                        modalFromSpecials = false;
                    });*/
                    Controller.modalFromSpecials = false;
                    View.renderModal('login');
                } else {
                    activeUser = null;
                    $('#loggedUsername').text("");
                    $('#usernameField').val("");
                    $('#login_button').html(View.translate("login"));
                    window.app.Controller.loadBeers();
                    $('.nav-tab').removeClass('active');
                    $('.nav-tab[data-filter="beers"]').addClass('active');
                }

                /**
                 * Handles click on login button from the login modal
                 * @author Guillermo Martinez
                 */
                View.sendLogin(function() {
                    /* Find a way to access the form from here*/
                    var username = $('#usernameField').val();
                    var pass = $('#passwordField').val();
                    if (Model.checkLogin(username, pass)) {
                        if (username === "Alice (Manager)" && pass === "123") {
                            activeUser = username;
                            window.location.href = "manager.html";
                        } else {
                            $('#loggedUsername').text(username + ',');
                            activeUser = username;
                            $('#login_button').html(View.translate("logout"));
                            $('.modal-container').addClass('closed');
                            $('.modal-overlay').addClass('closed');
                            if (Controller.modalFromSpecials) {
                                window.app.Controller.loadSpecials();
                            }
                        }
                    } else {
                        alert("Bad Username or Password");
                    }
                });
            });



            /**
             * Registers listener in View, handles payment option button clicks.
             * Saves order to localStorage, so we can access it in manager view.
             * @author Brenda Uga
             */
            View.registerEventHandler('paymentOptionClicked', function (option, order, activeTab) {
                var beverages = window.app.Model.fetchAllBeverages();

                // Create suitable data structure for manager view to parse orders from.
                var storedOrder = [];
                [].forEach.call(order, function(item) {
                    var name = item.innerText;
                    var found = false;
                    for (var i = 0; i < storedOrder.length; i++) {
                        if (storedOrder[i].name === name) {
                            storedOrder[i].quantity++;
                            found = true;
                        }
                    }
                    if (!found) {
                        var orderItem =  {"name": name, "quantity": 1};
                        storedOrder.push(orderItem);
                    }
                });

                var orderCorrect = storedOrder.every(function (orderItem) {
                    var beverage = beverages.find(function (beverage) {
                        return beverage.name === orderItem.name && beverage.quantity >= orderItem.quantity;
                    });
                    return !!beverage;
                });

                // If the order contains more of any item than it has in stock, we display warning and break out of checkout flow.
                if (!orderCorrect) {
                    View.renderModal('notEnoughStock');
                    return;
                }

                if (option === 'card') {
                    View.renderSpinner();
                    setTimeout(function() {
                        View.closeSpinner();
                        View.renderModal('orderConfirm');
                    }, 5000);
                } else if (option === 'credit') {
                    View.renderModal('creditPayment');
                    // TODO: check if credit is enough, if yes then decrease credit, otherwise show message that not enough funds
                }

                // Save to localStorage
                window.localStorage.setItem('order', JSON.stringify(storedOrder));

                // Decrease amounts in stock
                window.app.Model.decreaseAmounts(storedOrder);

                // Render active tab again to show updated quantities
                Controller['load' + activeTab + 's']();

                // Empty the orders sidebar
                View.emptySidebar();
                View.updateTotalInSidebar();

            });

            /**
             * Registers listener in View, handles 'Mark as done' button click in manager view.
             * Checks for items that remain after being marked done and creates a new state with those.
             * New state is pushed to currentOrders and state history.
             * @author Brenda Uga
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
             * @author Brenda Uga
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
             * @author Brenda Uga
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
                if (Controller.canUndo()) {
                    View.enableUndoButton();
                }
            });

            /**
             * Registers listener in View, handles 'Undo' button click in manager view.
             * Manages state history and current state to enable undo functionality.
             * @author Brenda Uga
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
             * @author Brenda Uga
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

            /**
             * Registers listener in View, handles 'Restock' button click in manager view.
             * Sets the quantity of items to max in database.
             * @author Brenda Uga
             */
            View.registerEventHandler('restock', function (activeTab) {
                Model.restock();
                Controller['load' + activeTab + 's']();
                View.renderCurrentOrders(Controller.calculateCurrentOrders());
            });

        },

        /**
         * Gets last order from localStorage and combines with a previous existing order.
         * Sets the current orders object to history.
         * @author Brenda Uga
         */
        calculateCurrentOrders: function() {
            var currentOrders = [
                [
                    { 'name': 'Nils Oscar', 'quantity': 1 },
                    { 'name': 'Brunello di Montalcino', 'quantity': 2 }
                ]
            ];
            if (window.localStorage.getItem('order') !== null) {
                currentOrders.push(JSON.parse(window.localStorage.getItem('order')));
            }

            Controller.state.currentOrders = currentOrders;
            Controller.state.history.push(currentOrders);
            return currentOrders;
        },

        /**
         * Loads whiskey type drinks from Model and renders them in the View.
         * @author Brenda Uga
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
         * @author Brenda Uga
         * @returns {boolean} Whether undo can be done
         */
        canUndo: function() {
            return Controller.state.position > 0;
        },

        /**
         * Checks if redo is possible.
         * @author Brenda Uga
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
            View.renderMenu(specialDrinks, Controller.isManager);
        }
    };


    var Model = {

        /**
         * Fetches whiskey type drinks from the DB.
         * @author Brenda Uga
         * @returns {{name: string, price: string, category: string, alcoholContent: string, quantity: string}[]}, list of drink objects
         */
        fetchWhiskeys: function() {
            return window.app.dbLoader.allWhiskeyBeverages();
        },

        /**
         * Fetches wine type drinks from the DB.
         * @returns {{name: string, price: string, category: string, alcoholContent: string, quantity: string}[]}, list of drink objects
         */
        fetchWines: function() {
            return window.app.dbLoader.allWineBeverages();
        },

        /**
         * Fetches beer type drinks from the DB.
         * @returns {{name: string, price: string, category: string, alcoholContent: string, quantity: string}[]}, list of drink objects
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
         * @returns {{name: string, price: string, category: string, alcoholContent: string, quantity: string}[]}
         */
        fetchSpecials: function(){
            return window.app.dbLoader.allSpecialBeverages();
        },

        /**
         * Restocks quantities in database.
         * @author Brenda Uga
         */
        restock: function() {
            window.app.dbLoader.restock();
        },

        /**
         * Restocks quantities in database.
         * @author Brenda Uga
         */
        restock: function() {
            window.app.dbLoader.restock();
        },

        /**
         * Decreases amounts in DB on items in orderedItems, by the quantity specified in orderedItems.
         * @author Brenda Uga
         * @param orderedItems object of names and quantities
         */
        decreaseAmounts: function (orderedItems) {
            window.app.dbLoader.decreaseAmounts(orderedItems);
        },

        /**
         * Fetches all beverages from the DB.
         * @author Brenda Uga
         */
        fetchAllBeverages: function () {
            return window.app.dbLoader.allBeverages();
        },

        /**
         * Check Login
         * @author Guillermo Martinez
         */
        checkLogin: function (user, pass) {
            if (user === "Charlie (VIP Client)" && pass === "123") {
                return true;
            } else if (user === "Alice (Manager)" && pass === "123") {
                return true;
            } else if (user === "Bob (VIP Client)" && pass === "123") {
                return true;
            } else {
                return false;
            }
        }

    };

    // Registers namespaces in window object.
    // @author Brenda Uga
    window.app = window.app || {};
    window.app.View = View;
    window.app.Controller = Controller;
    window.app.Model = Model;
    $(document).ready(function() {
       Controller.onLoaded();
    });

})(window);
