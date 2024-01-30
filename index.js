// const registrationForm = document.getElementById("registration");
// const loginForm = document.getElementById("login");


const errorDisplay = document.getElementById("errorDisplay");

const form = document.getElementById("registration");
const name = form.elements["username"];
const email = form.elements["email"];
//const zip = form.elements["zip"];
//const country = form.elements["country"];
const password = form.elements["password"];

form.addEventListener("submit", validate);

function displayError(message, inputElement) {
  errorDisplay.innerHTML = message;
  errorDisplay.style.display = "block";
  inputElement.focus();
}

// The big validation function.
// While this may seem like a lot of functions we
// need to build, most will be very simple!
function validate(evt) {
  const nameVal = validateName();
  if (nameVal === false) {
    evt.returnValue = false;
    return false;
  }

  const emailVal = validateEmail();
  if (emailVal === false) {
    evt.returnValue = false;
    return false;
  }

  const passwordVal = validatePassword();
  if (passwordVal === false) {
    evt.returnValue = false;
    return false;
  }
  
alert(`Name: ${nameVal}
Email: ${emailVal}
Password: ...that's a secret.`);

  return true;
}

// Simple email validation.
// We added a check to make sure the name exists!
// Note that this could also be solved via adding
// the "required" attribute to the HTML, but the
// focus of this activity is DOM events.
function validateEmail() {
  const emailInput = registrationForm.elements["email"];
  let emailVal = emailInput.value.trim().toLowerCase();

  if (emailVal === "") {
    displayError("Please provide an email.", email);
    //alert("Please provide an email.");
    email.focus();
    return false;
  }

  const atpos = emailVal.indexOf("@");
  const dotpos = emailVal.lastIndexOf(".");

  if (atpos < 1) {
    displayError("Your email must include an @ symbol which must not be at the beginning of the email.", emailInput);
    // alert(
    //   "Your email must include an @ symbol which must not be at the beginning of the email."
    // );
    email.focus();
    return false;
  }

  if (dotpos - atpos < 2) {
    displayError("Invalid structure: @.\nYou must include a domain name after the @ symbol.", emailInput);
    
    // alert(
    //   "Invalid structure: @.\nYou must include a domain name after the @ symbol."
    // );
    email.focus();
    return false;
  }

  return emailVal;
}

// Name Validation
function validateName() {
  if (name.value === "") {
    alert("Please provide a name.");
    name.focus();
    return false;
  }
  return name.value;
}

// Password Validation
function validatePassword() {
  if (password.value === "") {
    alert("Please provide a password.");
    password.focus();
    return false;
  }
  return password.value;
}

// Country Validation
function validateCountry() {
  if (country.value === "") {
    alert("Please provide a country.");
    country.focus();
    return false;
  }
  return country.value;
}

// Zip Code Validation
function validateZip() {
  if (zip.value === "") {
    alert("Please provide a zip code.");
    zip.focus();
    return false;
  }

  if (zip.value.length !== 5 || isNaN(Number(zip.value))) {
    alert("Zip codes must be in the format #####.");
    zip.focus();
    return false;
  }

  return zip.value;
}
