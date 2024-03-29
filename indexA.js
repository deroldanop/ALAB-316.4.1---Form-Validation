//document.addEventListener("DOMContentLoaded", function () {

    const registrationForm = document.getElementById("registration");
    const loginForm = document.getElementById("login");
    const errorDisplay = document.getElementById("errorDisplay");
    
    const usernameInput = registrationForm.elements["username"];

    // const name = form.elements["name"];
    // const email = form.elements["email"];
    // const zip = form.elements["zip"];
    // const country = form.elements["country"];
    // const password = form.elements["password"];
    


    // registrationForm.addEventListener("submit", (e) => {
    //   e.preventDefault();
    //   alert(`You submitted: 
    //   ${myForm.querySelector("input").value}`);
    // });
    


    // Function to display errors
    function displayError(message, inputElement) {
      errorDisplay.innerHTML = message;
      errorDisplay.style.display = "block";
      inputElement.focus();
    }

    // Registration Form Validation
    registrationForm.addEventListener("submit", function(event) {
      // Reset error display
      errorDisplay.style.display = "none";

      // Username Validation
      //const usernameInput = registrationForm.elements["username"];
      const usernameValue = usernameInput.value.trim().toLowerCase();
      if (usernameValue === "") {
        displayError("Username cannot be blank.", usernameInput);
        event.preventDefault();
        return;
      }

      // Check username uniqueness
      if (localStorage.getItem(usernameValue)) {
        displayError("Username is already taken.", usernameInput);
        event.preventDefault();
        return;
      }

      // Add other username validations...

      // Email Validation
      const emailInput = registrationForm.elements["email"];
      const emailValue = emailInput.value.trim().toLowerCase();
      if (emailValue === "") {
        displayError("Email cannot be blank.", emailInput);
        event.preventDefault();
        emailInput.focus();
        return;
      }

      // Add other email validations...
      const atpos = emailValue.indexOf("@");
      const dotpos = emailValue.lastIndexOf(".");

      if (atpos < 1) {
        displayError("Your email must include an @ symbol which must not be at the beginning of the email.", emailInput);
        event.preventDefault();
        emailInput.focus();
        return false;
      }
    
      if (dotpos - atpos < 2) {
        displayError("Invalid structure: @.\nYou must include a domain name after the @ symbol.", emailInput);
        event.preventDefault();
        emailInput.focus();
        return false;
      }
    
      return emailValue;
    



      // Password Validation
      const passwordInput = registrationForm.elements["password"];
      const passwordValue = passwordInput.value.trim();
      if (passwordValue.length < 8) {
        displayError("Password must be at least 8 characters long.", passwordInput);
        event.preventDefault();
        passwordInput.focus();
        return;
      }

      // Add other password validations...

      // Terms and Conditions Validation
      const termsCheckbox = registrationForm.elements["terms"];
      if (!termsCheckbox.checked) {
        displayError("Please accept the Terms and Conditions.", termsCheckbox);
        event.preventDefault();
        termsCheckbox.focus();
        return;
      }

      // Successful validation - store data and clear form
      localStorage.setItem(usernameValue, JSON.stringify({
        username: usernameValue,
        email: emailValue,
        password: passwordValue
      }));

      // Clear form fields
      registrationForm.reset();

      // Show success message
      errorDisplay.innerHTML = "Registration successful!";
      errorDisplay.style.display = "block";

      event.preventDefault();
    });

    // Login Form Validation
    loginForm.addEventListener("submit", function (event) {
      // Reset error display
      errorDisplay.style.display = "none";

      // Username Validation
      const usernameInput = loginForm.elements["username"];
      const usernameValue = usernameInput.value.trim().toLowerCase();
      if (usernameValue === "") {
        displayError("Username cannot be blank.", usernameInput);
        event.preventDefault();
        return;
      }

      // Check if username exists in localStorage
      if (!localStorage.getItem(usernameValue)) {
        displayError("Invalid username.", usernameInput);
        event.preventDefault();
        return;
      }

      // Password Validation
      const passwordInput = loginForm.elements["password"];
      const passwordValue = passwordInput.value.trim();
      if (passwordValue === "") {
        displayError("Password cannot be blank.", passwordInput);
        event.preventDefault();
        return;
      }

      // Validate password against stored data
      const userData = JSON.parse(localStorage.getItem(usernameValue));
      if (userData.password !== passwordValue) {
        displayError("Invalid password.", passwordInput);
        event.preventDefault();
        return;
      }

      // Successful validation - clear form
      // (Add your login logic here)

      // Clear form fields
      loginForm.reset();

      // Show success message with "Keep me logged in" indication
      const successMessage = "Login successful!" + (loginForm.elements["persist"].checked ? " (Keep me logged in)" : "");
      errorDisplay.innerHTML = successMessage;
      errorDisplay.style.display = "block";

      event.preventDefault();
    });
  //});