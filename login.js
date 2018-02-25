    /**
     *  Checks if loginForm has been filled properly and redirects to index.html
     *  Returns:
     *       boolean
     */

    function validateUser(form) {
        if (form.userId.value === "admin" && form.pwd.value === "") {
            window.location.href = "index.html";
        }
        else if (form.userId.value === "vip") {

        }
        else if (form.userId.value === "user") {

        }
        else {
            alert("Bad Username or Password");
            return false
        }
    }
