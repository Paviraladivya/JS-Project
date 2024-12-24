// Elements
const signUpContainer = document.getElementById('signUpContainer');
const loginContainer = document.getElementById('loginContainer');
const appContainer = document.getElementById('appContainer');

// Sign-up elements
const signUpForm = document.getElementById('signUpForm');
const signUpUsername = document.getElementById('signUpUsername');
const signUpPassword = document.getElementById('signUpPassword');
const signUpMessage = document.getElementById('signUpMessage');

// Login elements
const loginForm = document.getElementById('loginForm');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginErrorMessage = document.getElementById('loginErrorMessage');

// Switch to sign-up page
const goToSignUp = document.getElementById('goToSignUp');
goToSignUp.addEventListener('click', function() {
    loginContainer.style.display = 'none';
    signUpContainer.style.display = 'block';
});

// Switch to login page
const goToLogin = document.getElementById('goToLogin');
goToLogin.addEventListener('click', function() {
    signUpContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

// Handle sign-up form submission
signUpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Store credentials in localStorage (only for demo purposes)
    localStorage.setItem('username', signUpUsername.value);
    localStorage.setItem('password', signUpPassword.value);
    
    // Display success message and hide sign-up form
    signUpMessage.textContent = 'Sign up successful! You can now log in.';
    signUpContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

// Handle login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get stored credentials
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    
    // Check if credentials match
    if (loginUsername.value === storedUsername && loginPassword.value === storedPassword) {
        // Successful login: hide login form, show app
        loginContainer.style.display = 'none';
        appContainer.style.display = 'block';
    } else {
        loginErrorMessage.textContent = 'Invalid username or password';
    }
});

// API and Number Info App Logic

// Get the form and the display elements
const numberForm = document.getElementById('numberForm');
const numberInput = document.getElementById('numberInput');
const factType = document.getElementById('factType');
const factText = document.getElementById('factText');

// API endpoint and API key
const apiUrl = 'https://numbersapi.p.rapidapi.com';
const apiKey = '4fa35b9400msh0cb99b69537a67fp119528jsn5c284df35587';  // Replace with your actual RapidAPI key

// Handle form submission for number fact
numberForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const number = numberInput.value;      // Get the input number
    const type = factType.value;           // Get the selected fact type

    // Make API call to fetch the fact
    fetchFact(number, type);
});

// Function to fetch number fact from the API
function fetchFact(number, type) {
    const url = `${apiUrl}/${number}/${type}?json`;

    // Fetching data using the API key
    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,     // Use your API key
            'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Display the fact in the factText element
        factText.textContent = data.text;
    })
    .catch(error => {
        console.error('Error fetching fact:', error);
        factText.textContent = 'Failed to retrieve fact. Please try again later.';
    });
}
