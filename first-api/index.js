
const API_KEY = "live_OMB0I4nmHzquFFmeLFuVaL3vFxJ1GYxYiQO1MxgUrAZu1Ko7UL9updsUd97bsBH7";
const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3";
const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites";
const API_URL_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload";

const img1 = document.querySelector("#img1");
const img2 = document.querySelector("#img2");
const img3 = document.querySelector("#img3");
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const spanError = document.querySelector("#error");


const api = axios.create({
    baseURL: "https://api.thecatapi.com/v1/",
})

api.defaults.headers.common['X-API-KEY'] = API_KEY;



async function loadRandomMichis() {
    const response = await fetch(API_URL_RANDOM, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY
        }
    });
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

    const response = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY
        }
    });

    if(response.status !== 200) {
        spanError.innerHTML = "Hubo un error al cargar Fotos Favoritas: " + response.status;
    } else {
        const data = await response.json();
        const section = document.getElementById('favoritesMichis');

        section.innerHTML = "";

        data.forEach(michi => {
            const article = document.createElement('article')
            const div = document.createElement('div');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Eliminar de favoritos')

            btn.appendChild(btnText);
            btn.onclick = () => deleteFavoriteMichi(michi.id);
            img.src = michi.image.url;
            article.classList.add("card--img");
            article.appendChild(div)
            div.classList.add("card-container__img")
            div.appendChild(img);
            article.appendChild(btn);
            btn.classList.add("btn", "btnEliminar")
            section.appendChild(article);
        })
        
    }
}

async function saveFavoritesPics(id) {

    const res = await api.post('/favourites', {
        image_id: id
    })

    // const response = await fetch(API_URL_FAVORITES, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-API-KEY': API_KEY
    //     },
    //     body: JSON.stringify(
    //         {
    //             image_id: id
    //         }
    //     )
    // })

    loadFavoritesMichis();

}

async function deleteFavoriteMichi(id) {
    const response = await fetch(API_URL_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': API_KEY
        }
    });

    if(response.status !== 200) {
        spanError.innerHTML = "No se pudo eliminar. Error" + response.status;
    }else {
        alert("Michi eliminado!");
        loadFavoritesMichis();
    }
}


async function uploadMichiPhoto() {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    const response = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data;boundary=---', //FormData ya lo hace por ti :)
            'X-API-KEY': API_KEY,
        },
        body: formData,
    });

    if(response.status !== 201) {
        console.log("Ocurrio un error al subir la imagen")
    }else {
        const data = await response.json();

        console.log('Foto subida!');
        console.log(data.url);
    }
}

loadRandomMichis();
loadFavoritesMichis();