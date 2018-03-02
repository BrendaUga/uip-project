    /**
     *  Checks if loginForm has been filled properly and redirects to index.html
     *  Returns:
     *       boolean
     */

    function validateUser(form) {
        if (form.userId.value === "Thomas (Client)" && form.pwd.value === "123") {
            window.location.href = "index.html";
        }
        else if (form.userId.value === "Alice (Manager)" && form.pwd.value === "123") {
            window.location.href = "index.html";
        }
        else if (form.userId.value === "Bob (VIP Client)" && form.pwd.value === "123") {
            window.location.href = "index.html";
        }
        else {
            alert("Bad Username or Password");
            return false
        }
    }
