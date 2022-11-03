
import { refs } from './refs';

export function emptyMarkup () {
    refs.gallery.innerHTML = '';
}

export function renderMarkup (response) {
    //console.log('it is responce.data.hits inside renderMarkup(): ', response.data.hits);

    const responseArray = response.data.hits;
    
    const markup = responseArray.reduce((acc, {webformatURL, largeImageURL, tags, likes, views, comments, downloads } = picture) => 
    acc + ` <a class="gallery__link" href="${largeImageURL}">
                <div class="photo-card">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b> ${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b> ${views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b> ${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b> ${downloads}
                        </p>
                    </div>
                </div>
            </a>`, "");
    return markup;
}