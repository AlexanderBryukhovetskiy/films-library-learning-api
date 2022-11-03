import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

import { refs } from './js/refs';
import { emptyMarkup, renderMarkup } from './js/markupFunctions';
import { getPictures } from './js/searchFunction';
import { onLoad } from './js/onLoadFunction';

refs.loadMoreBtn.hidden = true;

localStorage.setItem('searchName', '');// для функції onLoad (рядок пошуку після відповіді сервера буде очищатися)

refs.searchForm.addEventListener('submit', onSearch);

async function onSearch (event) { 
    event.preventDefault();
    emptyMarkup();
    
    const searchName = refs.input.value.trim();

    try {
      const response = await getPictures(searchName);
         
      if ( response.data.totalHits > 0 ) {

        // console.log('response:  ', response);
        //console.log('response.data.totalHits (after SUBMIT): ' , response.data.totalHits);
        
        Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);

        refs.gallery.insertAdjacentHTML('beforeend', renderMarkup(response));

        const lightbox = new SimpleLightbox ('.gallery a', {
              showCounter: false});

        refs.input.value = "";
        
          if (response.data.totalHits > 40) {

          refs.loadMoreBtn.hidden = false;

          localStorage.setItem('searchName', searchName);

          // console.log('searchName from localStorage : ', localStorage.getItem('searchName'));

          refs.loadMoreBtn.addEventListener('click', onLoad);

          lightbox.refresh();
          }
      }       
      else {
          emptyMarkup();
          throw new Error();
      }
    }

    catch (error) { 
     //console.log(error)    
    }  
}