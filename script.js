function showValidation(input) {
    if (input.checkValidity()) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    } else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }

    return input.checkValidity();
}

// Task 3: Contact form
const validationForm = document.getElementById("validationForm");

if (validationForm) {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const result = document.getElementById("formResult");

    const fields = [name, email, message];

    validationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let valid = true;

        fields.forEach(function (field) {
            if (!showValidation(field)) {
                valid = false;
            }
        });

        if (valid) {
            result.textContent = "Form is valid! Thank you.";
            result.className = "mt-3 text-success";
        } else {
            result.textContent = "Please correct the errors.";
            result.className = "mt-3 text-danger";
        }
    });

    fields.forEach(function (field) {
        field.addEventListener("input", function () {
            showValidation(field);
        });
    });

    validationForm.addEventListener("reset", function () {
        setTimeout(function () {
            fields.forEach(function (field) {
                field.classList.remove("is-valid", "is-invalid");
            });

            result.textContent = "";
        }, 0);
    });
}

// Task 4: Registration form
const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const regEmail = document.getElementById("regEmail");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const country = document.getElementById("country");
    const genderError = document.getElementById("genderError");
    const result = document.getElementById("registrationResult");

    const fields = [
        firstName,
        lastName,
        regEmail,
        password,
        confirmPassword,
        country
    ];

    function checkPasswords() {
        confirmPassword.setCustomValidity(
            confirmPassword.value === password.value ? "" : "Passwords do not match"
        );

        return showValidation(confirmPassword);
    }

    function checkGender() {
        const selected = registrationForm.querySelector(
            'input[name="gender"]:checked'
        );

        genderError.textContent = selected ? "" : "Please select your gender.";

        return Boolean(selected);
    }

    function validateRegistration() {
        let valid = true;

        fields.forEach(function (field) {
            if (field === confirmPassword) {
                if (!checkPasswords()) {
                    valid = false;
                }
            } else if (!showValidation(field)) {
                valid = false;
            }
        });

        if (!checkGender()) {
            valid = false;
        }

        return valid;
    }

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (validateRegistration()) {
            result.textContent = "Registration form is valid!";
            result.className = "mt-3 text-success";
        } else {
            result.textContent = "Please correct the errors above.";
            result.className = "mt-3 text-danger";
        }
    });

    fields.forEach(function (field) {
        field.addEventListener("input", function () {
            if (field === confirmPassword) {
                checkPasswords();
            } else {
                showValidation(field);
            }

            if (field === password && confirmPassword.value !== "") {
                checkPasswords();
            }
        });

        field.addEventListener("change", function () {
            if (field === country) {
                showValidation(field);
            }
        });
    });

    registrationForm.querySelectorAll('input[name="gender"]').forEach(
        function (radio) {
            radio.addEventListener("change", checkGender);
        }
    );

    registrationForm.addEventListener("reset", function () {
        setTimeout(function () {
            fields.forEach(function (field) {
                field.classList.remove("is-valid", "is-invalid");
                field.setCustomValidity("");
            });

            genderError.textContent = "";
            result.textContent = "";
        }, 0);
    });
}
