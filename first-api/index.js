
const API_KEY = "live_OMB0I4nmHzquFFmeLFuVaL3vFxJ1GYxYiQO1MxgUrAZu1Ko7UL9updsUd97bsBH7";
const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3&api_key=" + API_KEY;
const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?limit=3&api_key="

const img1 = document.querySelector("#img1");
const img2 = document.querySelector("#img2");
const img3 = document.querySelector("#img3");
const spanError = document.querySelector("#error");


async function loadRandomMichis() {
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();
    if(response.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + response.status;
    } else {
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
    }
}

async function loadFavoritesMichis() {

    const response = await fetch(API_URL_FAVORITES);

    if(response.status !== 200) {
        spanError.innerHTML = "Hubo un error al cargar Fotos Favoritas: " + response.status;
    } else {
        const data = await response.json();

    }
}

loadRandomMichis();
loadFavoritesMichis();