document.addEventListener('DOMContentLoaded', function () {
    //Get stored user data if any
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    
    //Greet user
    const userGreeting = document.getElementById('userGreeting');
    if (storedUserData) {
        //Write Username
        userGreeting.textContent = `Hi, ${storedUserData.name}!`;
    } else {
        //Write anonymous if no username
        userGreeting.textContent = 'Hi, Anonymous'; 
    }
    
    //Get signUpform in signUp.html
    const signUpForm = document.getElementById('signUpForm');
    signUpForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        //Get values of name and email when button clicked
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (name && email) {
            const userData = {
                name: name,
                email: email
            };
        
        //Save user data to local storage
        localStorage.setItem('userData', JSON.stringify(userData));
        userGreeting.textContent = `Hi, ${name}!`;
        } else {
            alert('Please fill in all fields with valid information.');
        }
    });
});
  