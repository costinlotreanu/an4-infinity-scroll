const imageContainer = document.querySelector('#image-container');
let photosArray = [];
let photosLoaded = 0;

// Unsplash API
const imageCount = 3;
// Normally, don't store API Keys like this, but an exception made here because it is free, and the data is publicly available!
const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imageCount}`;

getPhotos();
window.addEventListener('scroll', loadMorePhotos);

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    photosArray = [...data];
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

function displayPhotos() {
  photosArray.forEach(image => {
    const img = document.createElement('img');
    img.setAttribute('src', image.urls.small_s3);
    img.setAttribute('alt', image.alt_description);
    img.setAttribute('title', image.alt_description);
    img.addEventListener('load', checkPhotos);
    imageContainer.appendChild(img);
  });
}

function loadMorePhotos() {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    getPhotos();
    checkPhotos();
  }
}

function checkPhotos() {
  photosLoaded++;
  console.log(photosLoaded);
}
