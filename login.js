        document.addEventListener('DOMContentLoaded', function() {
            const form = document.querySelector('form');
            const emailInput = document.querySelector('input[type="email"]');
            const passwordInput = document.querySelector('input[type="password"]');

            form.addEventListener('submit', function(e) {
                e.preventDefault();

                // Validate email
                if (!isValidEmail(emailInput.value)) {
                    alert('Please enter a valid email address.');
                    return;
                }

                // Validate password
                if (passwordInput.value.trim() === '') {
                    alert('Please enter a password.');
                    return;
                }

                // If validation passes, you can proceed with form submission or other actions.
                alert('Login successful!');
            });

            function isValidEmail(email) {
                // A simple email validation using regular expression
                const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
                return emailRegex.test(email);
            }
        });
