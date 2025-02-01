import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

import { serviceImages } from './js/pixabay-api';
import { createGallery } from './js/render-functions';


const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btn = document.querySelector('.load-btn')

const showLoader = () => {
    loader.classList.remove('hidden');
};
const hideLoader = () => {
    loader.classList.add('hidden');
};
hideLoader();

const showbtn = () => {
    btn.classList.remove('hidden');
};
const hidebtn = () => {
    btn.classList.add('hidden');
};
hidebtn();

let question = '';
let page = 1;
let limit = 15;
let totalHits = 0;

const galleryModal = new SimpleLightbox('.gallery a', { 
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});


function updateGallery(hits) {
  gallery.insertAdjacentHTML('beforeend', createGallery(hits));
  galleryModal.refresh();
}

btn.addEventListener('click', async () => {
  page += 1;
  btn.disabled = true;
  showLoader();

  try {
    const data = await serviceImages(question, page);
    const hits = data.hits;
    totalHits = data.totalHits;

    updateGallery(hits);
    
   
  
    const galleryItem = document.querySelector('.gallery-item');

    if (galleryItem) {
      const { height: cardHeight } = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
     if (Math.ceil(totalHits / limit) === page) {
        hidebtn();
      iziToast.show({
      title: '',
      backgroundColor: '#79fbff',
      messageColor: '#FFFFFF',
      message: `We're sorry, but you've reached the end of search results.`,
      position: 'topRight',
    });
    }
  } catch (error) {
  iziToast.error({
    position: "topRight",
    message: error.message,
  });
  } finally {
    btn.disabled = false;
    hideLoader();
}
})


form.addEventListener('submit', async (event) => {
  event.preventDefault();
  question = event.target.elements.query.value.trim();
  page = 1;
  gallery.innerHTML = '';

  if (!question) {
    hidebtn();
    iziToast.show({
      backgroundColor: '#EF4040',
      message: `Please enter a search query!`,
      messageColor: '#FFFFFF',
      position: 'topRight',
    });
    return;
  }

showLoader();

try {
  const data = await serviceImages(question, page);
  totalHits = data.totalHits;
  
  if (data.hits.length === 0) {
   
    iziToast.show({
      title: '',
      backgroundColor: '#EF4040',
      messageColor: '#FFFFFF',
      message: `Sorry, there are no images matching your search query. Please try again!`,
      position: 'topRight',
    });
    hidebtn();
    return;
  }
  updateGallery(data.hits);
  
if (totalHits > limit) {
    showbtn();
      } else {
        hidebtn();
      }
    }
   catch (error) {
  iziToast.error({
       position: "topRight",
      message: error.message,
    })
  } finally {
    hideLoader();
    form.reset();
  }
});