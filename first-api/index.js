
const API_KEY = "live_OMB0I4nmHzquFFmeLFuVaL3vFxJ1GYxYiQO1MxgUrAZu1Ko7UL9updsUd97bsBH7";
const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3&api_key=" + API_KEY;
const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?&api_key=" + API_KEY;
const API_URL_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=${API_KEY}`;

const img1 = document.querySelector("#img1");
const img2 = document.querySelector("#img2");
const img3 = document.querySelector("#img3");
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
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

        btn1.onclick = () => saveFavoritesPics(data[0].id);
        btn2.onclick = () => saveFavoritesPics(data[1].id);
        btn3.onclick = () => saveFavoritesPics(data[2].id);
    }
}

async function loadFavoritesMichis() {

    const response = await fetch(API_URL_FAVORITES);

    if(response.status !== 200) {
        spanError.innerHTML = "Hubo un error al cargar Fotos Favoritas: " + response.status;
    } else {
        const data = await response.json();
        const section = document.getElementById('favoritesMichis');

        section.innerHTML = "";

        data.forEach(michi => {
            const article = document.createElement('article')
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Eliminar de favoritos')

            btn.appendChild(btnText);
            btn.onclick = () => deleteFavoriteMichi(michi.id);
            img.src = michi.image.url;
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        })
        
    }
}

async function saveFavoritesPics(id) {
    const response = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                image_id: id
            }
        )
    })

    loadFavoritesMichis();

}

async function deleteFavoriteMichi(id) {
    const response = await fetch(API_URL_DELETE(id), {
        method: 'DELETE'
    });

    if(response.status !== 200) {
        spanError.innerHTML = "No se pudo eliminar. Error" + response.status;
    }else {
        alert("Michi eliminado!");
        loadFavoritesMichis();
    }
}

loadRandomMichis();
loadFavoritesMichis();