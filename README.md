# uip-project
UI programming I project. This project implements a client and manager ordering system in the Flying Dutchman pub.


All code is sufficiently commented and the contributors' names are shown on parts they wrote.


## Features
Required parts:
* undo-redo in manager view sidebar
* responsiveness for laptop and iPhone 7 sizes
* supports 4 languages - English, Swedish, Catalan and Estonian
* all implemented using MVC pattern

Features and flows:
* customer can be a regular client or a VIP client (needs to log in as VIP)
* customer can order drinks and foods
    * order is checked against quantities in stock
    * customer can pay by card (using external payment terminal) or credit (if VIP client)
    * ordering decreases amounts in database
* manager can keep an eye on the situation in the pub
    * manager needs to log in to see their view
    * manager sees outstanding orders and can mark them as done
    * manager can undo a done order when something goes wrong
    * manager can see quantities of items in stock
    * manager can restock items that are out of stock (it adds +5)

## Login credentials
All preset usernames are listed in the dropdown in login view. All users have the same password, which is '123'.
