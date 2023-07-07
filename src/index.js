// write your code here
// Fetch all ramens from the API
function fetchAllRamens() {
    return fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .catch(error => console.log(error));
  }
  
  // Fetch a single ramen by ID from the API
  function fetchRamenById(id) {
    return fetch(`http://localhost:3000/ramens/${id}`)
      .then(response => response.json())
      .catch(error => console.log(error));
  }
  
  // Display the ramen details in the ramen-detail section
  function displayRamenDetails(ramen) {
    const detailImage = document.querySelector('.detail-image');
    const nameElement = document.querySelector('.name');
    const restaurantElement = document.querySelector('.restaurant');
    const ratingDisplay = document.getElementById('rating-display');
    const commentDisplay = document.getElementById('comment-display');
  
    detailImage.src = ramen.image;
    detailImage.alt = ramen.name;
    nameElement.textContent = ramen.name;
    restaurantElement.textContent = ramen.restaurant;
    ratingDisplay.textContent = ramen.rating;
    commentDisplay.textContent = ramen.comment;
  }
  
  // Event listener for clicking on a ramen image in the ramen-menu section
  document.getElementById('ramen-menu').addEventListener('click', event => {
    if (event.target.tagName === 'IMG') {
      const ramenId = event.target.dataset.id;
      fetchRamenById(ramenId)
        .then(ramen => displayRamenDetails(ramen))
        .catch(error => console.log(error));
    }
  });
  
  // Event listener for submitting the new-ramen form
  document.getElementById('new-ramen').addEventListener('submit', event => {
    event.preventDefault();
    
    const name = document.getElementById('new-name').value;
    const restaurant = document.getElementById('new-restaurant').value;
    const image = document.getElementById('new-image').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;
  
    const newRamen = {
      name,
      restaurant,
      image,
      rating,
      comment
    };
  
    // Add the new ramen to the ramen-menu section
    const ramenMenu = document.getElementById('ramen-menu');
    const ramenImage = document.createElement('img');
    ramenImage.src = newRamen.image;
    ramenImage.alt = newRamen.name;
    ramenImage.dataset.id = Math.random().toString(36).substr(2, 9); // Generate a random ID
    ramenMenu.appendChild(ramenImage);
  
    // Clear the form inputs
    document.getElementById('new-name').value = '';
    document.getElementById('new-restaurant').value = '';
    document.getElementById('new-image').value = '';
    document.getElementById('new-rating').value = '';
    document.getElementById('new-comment').value = '';
  });
  
  // Get all ramens and display their images in the ramen-menu section
  fetchAllRamens()
    .then(ramens => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramens.forEach(ramen => {
        const ramenImage = document.createElement('img');
        ramenImage.src = ramen.image;
        ramenImage.alt = ramen.name;
        ramenImage.dataset.id = ramen.id;
        ramenMenu.appendChild(ramenImage);
      });
    })
    .catch(error => console.log(error));
  