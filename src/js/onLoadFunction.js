import {refs} from './refs';
import { renderMarkup } from "./markupFunctions"; 
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from "notiflix";

const axios = require('axios').default;

const URL = 'https://pixabay.com/api/';
const KEY = '30822963-d0fd13470d1d847e8cb7d7e51';


const lightbox = new SimpleLightbox ('.gallery a', {
    showCounter: false});

let page = 1;

export async function onLoad() {
    page += 1;

    const searchName = localStorage.getItem('searchName');

    console.log("searchName inside onLoad: ", searchName);
   
    const response = await axios.get(`${URL}?key=${KEY}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
    
    refs.gallery.insertAdjacentHTML('beforeend', renderMarkup(response, page));
    
    lightbox.refresh();

        //    console.log(`refs.gallery.childElementCount after onLoad page ${page}: `, refs.gallery.childElementCount);

    if (response.status === 400 
        || refs.gallery.childElementCount >= response.data.totalHits ) {
    
        refs.loadMoreBtn.hidden = true;

        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        
    }
}

          
