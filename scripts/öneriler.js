// Initialize and add the map
var map;
let markers = [];
let infoWindow;

let iconPath = "../mapicons/";

const icons = {
  Su: { icon: iconPath + "su.png" },
  Hayvan: { icon: iconPath + "hayvan.png" },
  Elektrik: { icon: iconPath + "elektrik.png" },
  Diger: { icon: iconPath + "diger.png" }
}

let isRunning = false; // Flag variable to track the execution status
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function orderASC(id) {
  if (isRunning) { return; }
  else {
    if (id == "diger-advice") {
      orderData(id, 'asc');
      const element = document.getElementById('diger-advice');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'glyphicon glyphicon-triangle-bottom';
      document.getElementById(id).addEventListener("click", function(e) { orderDESC(e.target.id);});
    } else if (id == "su-advice") {
      orderData(id, 'asc');
      const element = document.getElementById('su-advice');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'glyphicon glyphicon-triangle-bottom';
      document.getElementById(id).addEventListener("click", function(e) { orderDESC(e.target.id);});
    } else if (id == "advices") {
      orderData(id, 'asc');
      const element = document.getElementById('advices');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'glyphicon glyphicon-triangle-bottom';
      document.getElementById(id).addEventListener("click", function(e) { orderDESC(e.target.id);});
    } else if (id == "hayvan-advice") {
      orderData(id, 'asc');
      const element = document.getElementById('hayvan-advice');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'glyphicon glyphicon-triangle-bottom';
      document.getElementById(id).addEventListener("click", function(e) { orderDESC(e.target.id);});
    } else if (id == "elektrik-advice") {
      orderData(id, 'asc');
      const element = document.getElementById('elektrik-advice');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'glyphicon glyphicon-triangle-bottom';
      document.getElementById(id).addEventListener("click", function(e) { orderDESC(e.target.id);});
    }
  }
}
function orderDESC(id) {
  if (isRunning) { return; }
  else {
    if (id == "diger-advice") {
      orderData(id, 'desc');
      const element = document.getElementById('diger-advice');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'glyphicon glyphicon-triangle-top';
      document.getElementById(id).addEventListener("click", function(e) { orderASC(e.target.id);});
    } else if (id == "su-advice") {
      orderData(id, 'desc');
      const element = document.getElementById('su-advice');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'glyphicon glyphicon-triangle-top';
      document.getElementById(id).addEventListener("click", function(e) { orderASC(e.target.id);});
    } else if (id == "advices") {
      orderData(id, 'desc');
      const element = document.getElementById('advices');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'glyphicon glyphicon-triangle-top';
      document.getElementById(id).addEventListener("click", function(e) { orderASC(e.target.id);});
    } else if (id == "hayvan-advice") {
      orderData(id, 'desc');
      const element = document.getElementById('hayvan-advice');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'glyphicon glyphicon-triangle-top';
      document.getElementById(id).addEventListener("click", function(e) { orderASC(e.target.id);});
    } else if (id == "elektrik-advice") {
      orderData(id, 'desc');
      const element = document.getElementById('elektrik-advice');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'glyphicon glyphicon-triangle-top';
      document.getElementById(id).addEventListener("click", function(e) { orderASC(e.target.id);});
    }
  }
}

async function orderData(type, order) {
  infoWindow = new google.maps.InfoWindow();
  if (isRunning) return;

  isRunning = true;

  try {
    const [advices, usernames] = await Promise.all([
      fetcher(type, order),
      fetcher('username')
    ]);
    $('#leftColIn').empty();
    setMapOnServer(markers, null);
  
    const advicePromises = advices.map(async (advice) => {
      if (!isRunning) {
        return;
      }
  
      const { lat, lng, advice_title, advice_desc, advice_type, createdDate, status, userID, street_name} = advice;
      const usernameObj = usernames.find(user => user.userID === userID);
      const username = usernameObj ? usernameObj.username : "Unknown";
      const position = new google.maps.LatLng(lat, lng);

      const mark = addFetchedMarkers(position, map, advice_title, advice_type);
      mark.addListener('click', () => {
        infoWindow.setContent(advice_title);
        infoWindow.open(map, mark);
      });
  
      markers.push(mark);
 
      return { username, advice_title, advice_desc, createdDate, status, position, street_name };
    });
  
    const entriesData = await Promise.all(advicePromises);
    entriesData.forEach(({ username, advice_title, advice_desc, createdDate, status, position, street_name }) => {
      cardCreator(username, advice_title, advice_desc, createdDate, status, position, street_name);
    });
  } catch (error) {
    console.error('Error adding advices:', error);
  } finally {
    isRunning = false;
  }
}


const fetcher = (type, order) => {
  var url = "";
  if (order == null) { url = "../php/fetch.php?type="+type; }
  else { url = "../php/fetch.php?type="+type+"&order="+order }
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      success: function(response) {
        resolve(response);
      },
      error: function(xhr, status, error) {
        reject(error);
      }
    });
  });
};

function setMapOnServer(markers, map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

async function cardCreator(username, entry_title, entry_desc, createdDate, state, position, street) {
  let s = "";
  if (state === 1) { s = "Sorun Devam Ediyor";}
  else { s = "Sorun Çözüldü"; }
  const htmlEntries = document.createElement('div');
  const htmlAuthor = document.createElement('div');
  const htmlDesc = document.createElement('h3');
  const htmlTitle = document.createElement('h1');
  const htmlDate = document.createElement('b');
  const htmlStreet = document.createElement('h4');

  htmlEntries.classList.add('card');
  htmlAuthor.classList.add('comment-author');
  htmlAuthor.setAttribute('id', 'usernames-container');
  htmlDate.classList.add('comment-date');
  htmlStreet.classList.add('comment-date');

  htmlAuthor.innerHTML = username;
  htmlTitle.innerHTML = entry_title;
  htmlDesc.innerHTML = entry_desc;
  htmlDate.innerHTML = createdDate +"<br>"+s;
  htmlStreet.innerHTML = street;

  htmlEntries.addEventListener('mouseenter', () => {
    // Zoom to the marker
    const zoomOptions = {
      zoom: 18,
      center: position,
    };
       
    map.setOptions(zoomOptions);
    markers.forEach(marker => {
      if (marker.position.equals(position)) {
        if (marker.icon.includes('hayvan'))  { editMarkerIcons('in', marker, 'hayvan'); }
        else if (marker.icon.includes('elektrik')) { editMarkerIcons('in', marker, 'elektrik'); }
        else if (marker.icon.includes('su')) { editMarkerIcons('in', marker, 'su'); }
        else { editMarkerIcons('in', marker, 'diger'); }
        infoWindow.setContent(entry_title);
        infoWindow.open(map, marker);
        
      }
    });
  });

  htmlEntries.addEventListener('mouseleave', () => {
    // Restore the original map view and show all markers
    const options = {
      zoom: 13,
      center: position,
    };
    map.setOptions(options);
    markers.forEach(marker => {
      if (marker.position.equals(position)) {
        if (marker.icon.includes('hayvan'))  { editMarkerIcons('out', marker, 'hayvan'); }
        else if (marker.icon.includes('elektrik')) { editMarkerIcons('out', marker, 'elektrik'); }
        else if (marker.icon.includes('su')) { editMarkerIcons('out', marker, 'su'); }
        else { editMarkerIcons('out', marker, 'diger'); }
      }
    })
    infoWindow.close();
  });

  function editMarkerIcons(type, marker, markerType) {
    if (type === 'in') {
      marker.setIcon(iconPath + markerType + '_seçili.png');
    } else if (type === 'out') {
      marker.setIcon(iconPath + markerType + '.png');
    }
  } 

  document.getElementById('leftColIn').appendChild(htmlEntries);
  htmlEntries.appendChild(htmlAuthor);
  htmlEntries.appendChild(htmlTitle);
  htmlEntries.appendChild(htmlDesc);
  htmlEntries.appendChild(htmlStreet);
  htmlEntries.appendChild(htmlDate);
}

function endsWithInt(str) {
  const pat = /\d$/;
  return pat.test(str);
}

function getAddressFromLatLng(lat, lng) {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1] && results[2]) {
          const addressComponents = results[0].address_components;
          const addressComponents1 = results[1].address_components;
          const addressComponents2 = results[2].address_components;
          let streetName = '';
          for (let i = 0; i < addressComponents.length; i++) {
            if ( (addressComponents[i].types.includes('route') || addressComponents[i].types.includes('political')) ||
                  (addressComponents2[i].types.includes('route') || addressComponents2[i].types.includes('political')) ||
                  (addressComponents2[i].types.includes('route') || addressComponents2[i].types.includes('political'))
                ) {
              if (addressComponents[i].long_name.includes('+')) {
                if (addressComponents1[i].long_name === "İsimsiz Yol") {
                  streetName = addressComponents2[i].long_name;
                }  else { streetName = addressComponents1[i].long_name;                  }
              } else { streetName = addressComponents[i].long_name; }
              break;
            }
          }

          resolve(streetName);
        } else {
          reject('No results found');
        }
      } else {
        reject(`Geocoder failed with status: ${status}`);
      }
    });
  });
}


function initMap() {
  const seyrek = {
    lat: 38.584701,
    lng: 26.9700393
  };
  const izmir_bounds = {
    north: 38.657661,
    south: 38.452810,
    west: 26.803528,
    east: 27.153717
  };
  const options = {
    zoom: 13,
    center: seyrek,
    gestureHandling: 'cooperative',
    minZoom: 13,
    maxZoom: 20,
    restriction: { latLngBounds: izmir_bounds },
    streetViewControl: false,
    zoomControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
  }
  map = new google.maps.Map(document.getElementById("map3"), options);
  orderData('advices', 'desc');
  document.getElementById('advices').addEventListener("click", function(e) { orderASC(e.target.id);});
  document.getElementById('su-advice').addEventListener("click", function(e) { orderDESC(e.target.id);});
  document.getElementById('elektrik-advice').addEventListener("click", function(e) { orderDESC(e.target.id);});
  document.getElementById('hayvan-advice').addEventListener("click", function(e) { orderDESC(e.target.id);});
  document.getElementById('diger-advice').addEventListener("click", function(e) { orderDESC(e.target.id);});
}

function addFetchedMarkers(position, map, title, advice_type) {
  if (advice_type === "Su") {
    return new google.maps.Marker({
      position: position,
      map: map,
      title: title,
      icon: icons[advice_type].icon
    });
  } else if (advice_type === "Elektrik") {
    return new google.maps.Marker({
      position: position,
      map: map,
      title: title,
      icon: icons[advice_type].icon
    });
  } else if (advice_type === "Hayvan") {
    return new google.maps.Marker({
      position: position,
      map: map,
      title: title,
      icon: icons[advice_type].icon
    });
  } else if (advice_type === "Diger") {
    return new google.maps.Marker({
      position: position,
      map: map,
      title: title,
      icon: icons[advice_type].icon
    });
  }
}

async function handleButtons(type) {
  setMapOnServer(markers, null);
  markers = [];
  await addAdvices(map, type);
  setMapOnServer(markers, map);
}
