// This is the main JavaScript file that will handle navigation and page loading.

// Function to load the form page
function loadForm() {
  // Use history.pushState to change the URL without reloading the page
  history.pushState({ page: 'form' }, 'Form Page', 'form.html');
  
  // Load the content of the form page into the #app div
  document.getElementById('app').innerHTML = fetchContent('form.html');
}

// Function to submit the form and load the images page
function submitForm(event) {
  event.preventDefault();
  // Process your form data here
  
  // Use history.pushState to change the URL without reloading the page
  history.pushState({ page: 'images' }, 'Images Page', 'images.html');
  
  // Load the content of the images page into the #app div
  document.getElementById('app').innerHTML = fetchContent('images.html');
}

// Function to show the images
function showImages() {
  // Your logic to display images goes here
  
  // Use history.pushState to change the URL without reloading the page
  history.pushState({ page: 'about' }, 'About Page', 'about.html');
  
  // Load the content of the about page into the #app div
  document.getElementById('app').innerHTML = fetchContent('about.html');
}

// Function to fetch the content of a page using AJAX or Fetch API
function fetchContent(page) {
  // Your logic to fetch content goes here
  // You can use AJAX or Fetch API to get the content of the specified page
  // For simplicity, you can use a synchronous XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.open('GET', page, false);
  xhr.send(null);
  return xhr.responseText;
}

// Event listener for the browser back button
window.onpopstate = function(event) {
  if (event.state) {
      // Load the content of the previous page when the back button is pressed
      document.getElementById('app').innerHTML = fetchContent(event.state.page + '.html');
  }
};

// Initial setup: Load the initial content when the page is first loaded
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('app').innerHTML = fetchContent('index.html');
});