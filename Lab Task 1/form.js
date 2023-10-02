 // Initialize the jQuery Validate Plugin
 $(document).ready(function () {
    $("#registrationForm").validate({
      rules: {
        username: {
          required: true,
          minlength: 5,
        },
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 6,
        },
        confirmPassword: {
          required: true,
          equalTo: "#password",
        },
      },
      messages: {
        username: {
          required: "Please enter your username",
          minlength: "Username must be at least 5 characters long",
        },
        email: {
          required: "Please enter your email",
          email: "Please enter a valid email address",
        },
        password: {
          required: "Please enter your password",
          minlength: "Password must be at least 6 characters long",
        },
        confirmPassword: {
          required: "Please confirm your password",
          equalTo: "Passwords do not match",
        },
      },
      submitHandler: function (form, event) {
        // Here you can handle the form submission, for example, by sending an AJAX request
        // This function will be called only if the form is valid
        event.preventDefault();

        alert("Form submitted successfully!");
      },
    });
  });