
    //Variables
    var modal = document.getElementById("loginModal");
    var loginBtn = document.getElementById("login_button");
    var closeBtn = document.getElementsByClassName("closeBtn")[0];
    var usernameField = document.getElementById("usernameField");
    var passwordField = document.getElementById("passwordField");
    var loggedUserField = document.getElementById("loggedUsername");
    var modalFromSpecials = false;
    var activeUser = null;

    //Listeners
    loginBtn.addEventListener('click', loginOrLogout);
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', outsideModalClick);

    //Open modal if there is no active user, log out otherwise
    function loginOrLogout(event) {
        console.log(event);
        if (activeUser == null) {
            openModal(false);
        } else {
            activeUser = null;
            loggedUserField.textContent = "";
            loginBtn.value = "Log in";
        }
    }

    function openModal(fromSpecials) {
        modal.style.display = 'block';
        modalFromSpecials = fromSpecials;
    }

    function closeModal() {
        modal.style.display = 'none';
        usernameField.value = "";
        passwordField.value = "";
    }

    function outsideModalClick(e) {
        if (e.target == modal) {
            modal.style.display = 'none';
            usernameField.value = "";
            passwordField.value = "";
        }
    }


    function validateUser(form) {
        if (form.userId.value === "Charlie (VIP Client)" && form.pwd.value === "123") {
            loggedUserField.textContent = "Charlie (VIP Client),"
            activeUser = "Charlie (VIP Client)"
        } else if (form.userId.value === "Alice (Manager)" && form.pwd.value === "123") {
            loggedUserField.textContent = "Alice (Manager),";
            activeUser = "Alice (Manager)";
        } else if (form.userId.value === "Bob (VIP Client)" && form.pwd.value === "123") {
            loggedUserField.textContent = "Bob (VIP Client),";
            activeUser = "Bob (VIP Client)";
        } else {
            alert("Bad Username or Password");
            return false;
        }
        loginBtn.value = "Log out";
        closeModal();
        if (modalFromSpecials) {
            window.app.Controller.loadBeers();
        }
    }