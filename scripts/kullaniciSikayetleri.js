// Function to fetch entries from the database
const fetcher = async (type) => {
    try {
      const response = await fetch('../php/fetch.php?type='+type);
      if (!response.ok) {
        throw new Error('Error fetching entries: ' + response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      document.getElementById('notification').innerHTML = error;
      showNotificationButton();
      return [];
    }
  };
  
  // Function to add entries to the HTML
  async function addEntries() {
    try {
      const entries = await fetcher('userEntries');
      const advices = await fetcher('userAdvices');
        
      // Clear existing content
      $('#leftColIn').empty();
      $('#leftColInS').empty();
      // Iterate through entries and create HTML elements
      entries.forEach((entry) => {
        const { entryID, entry_title, entry_desc, status} = entry;
        if (status === 1) { cardCreator('leftColIn', entry_title, entry_desc, 'card-aktiv', entryID); }
        else { cardCreator('leftColIn', entry_title, entry_desc, 'card-inaktiv', entryID); }
      });

      advices.forEach((advice) => {
        const { adviceID, advice_title, advice_desc, status} = advice;
        if (status == true) { cardCreator('leftColInS', advice_title, advice_desc, 'card-aktiv', adviceID); }
        else { cardCreator('leftColInS', advice_title, advice_desc, 'card-inaktiv', adviceID); }
      });

    } catch (error) {
      document.getElementById('notification').innerHTML = error;
      showNotificationButton();
    }
  }
  
  function cardCreator(divName, entry_title, entry_desc, className, entryID) {
    const htmlEntries = document.createElement('div');
    const htmlDesc = document.createElement('h3');
    const htmlTitle = document.createElement('h1');
    const htmlButton = document.createElement('button');

    htmlEntries.classList.add(className);

    htmlTitle.innerHTML = entry_title;
    htmlDesc.innerHTML = entry_desc;
    htmlButton.innerHTML = "Düzenle";
    htmlButton.classList.add("cardButton");
    htmlButton.addEventListener('click', () => openMenu(entryID));
    document.getElementById(divName).appendChild(htmlEntries);
    htmlEntries.appendChild(htmlTitle);
    htmlEntries.appendChild(htmlDesc);
    htmlEntries.appendChild(htmlButton);
  }

function openMenu(entryID) {

  // Create the menu element
  const menu = document.createElement('div');
  menu.classList.add('menu');

  fetch('hesabimMenu.php?entryID='+entryID)
  .then(response => response.text())
  .then(content => {
    // Insert the PHP file content into the menu
    menu.innerHTML += content;
  })
  .catch(error => {
    document.getElementById('notification').innerHTML = error;
    showNotificationButton();
  });
        // Calculate the top position to center the menu
        const windowHeight = window.innerHeight;
        const menuHeight = menu.offsetHeight;
        const top = Math.max(0, (windowHeight - (menuHeight)) / 2);
  
        // Set the top position of the menu
        menu.style.top = `${top/2}px`;
  // Append the menu to the document body
  document.body.appendChild(menu);
  
  // Block scrolling while the menu is open
  document.body.style.overflow = 'hidden';

  // Blur the background
  const elementsToBlur = document.querySelectorAll('body > *:not(.menu)');
  elementsToBlur.forEach((element) => {
    element.style.filter = 'blur(5px)';
  });

  // Close the menu when clicking outside of it
  document.body.addEventListener('mousedown', handleMouseDown);
  function handleMouseDown(event) {
    if (!menu.contains(event.target)) {
      document.body.removeEventListener('mousedown', handleMouseDown);
      setTimeout(() => {
        removeMenu();
      }, 0);
    }
  }
}

function removeMenu() {
  // Remove the menu from the DOM
  const menu = document.querySelector('.menu');
  menu.parentNode.removeChild(menu);

  // Unblur the background
  const elementsToUnblur = document.querySelectorAll('body > *:not(.menu)');
  elementsToUnblur.forEach((element) => {
    element.style.filter = 'none';
  });

  // Restore scrolling
  document.body.style.overflow = 'auto';
}

$(document).ready(function () {
    addEntries();
});

document.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  var form = event.target;
  var formData = new FormData(form);

  // Check if the form button with type value "entryRemove" was clicked
  if (formData.get('type') === 'entryRemove') {
    var entryID = formData.get('entryID');

    formData.append('type', 'entryRemove'); // Add the "type" field to the form data
    formData.append('entryID', entryID);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Request was successful
          var response = JSON.parse(xhr.responseText);
          // Handle the response data as needed
          document.getElementById('notification').innerHTML = response;
          showNotificationButton();
        } else {
          // Request failed
          document.getElementById('notification').innerHTML = xhr.status;
          showNotificationButton();
        }
      }
    };
        
    xhr.open('GET', '../php/fetch.php?type=entryRemove&entryID=' + entryID);
    xhr.send(formData);
  } else if (formData.get('type') === 'entryEdit') {
      var entryID = formData.get('entryID');
      var newTitle = formData.get('newtitle');
      var newDesc = formData.get('newdesc');
      var state = formData.get('status');
      if (state === "on") {state = 1;}
      else {state = 0;}
  
      formData.append('type', 'entryEdit'); // Add the "type" field to the form data
      formData.append('entryID', entryID);
      formData.append('newtitle', newTitle);
      formData.append('newtitle', newDesc);
      formData.append('status', state);
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            // Request was successful
            var response = JSON.parse(xhr.responseText);
            // Handle the response data as needed
            document.getElementById('notification').innerHTML = response;
            showNotificationButton();
          } else {
            // Request failed
            document.getElementById('notification').innerHTML = xhr.status;
            showNotificationButton();
          }
        }
      };
      xhr.open('POST', '../php/fetch.php?type=entryEdit&entryID=' + entryID);
      xhr.send(formData);
  } else {
    // Make AJAX request to the PHP script
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Request was successful
          var response = JSON.parse(xhr.responseText);
          // Handle the response data as needed
          document.getElementById('notification').innerHTML = response;
          showNotificationButton();
        } else {
          // Request failed
          document.getElementById('notification').innerHTML = xhr.status;
          showNotificationButton();
        }
      }
    };
    xhr.open(form.method, form.action);
    xhr.send(formData);
  }
});

function showNotificationButton() {
  var notificationButton = document.getElementById("notification");
  notificationButton.classList.add("show-button");

  setTimeout(function() {
    notificationButton.classList.remove("show-button");
  }, 10000);
}
