console.log("Hola Mundooo!! Jejeje");

const url = "https://api.thecatapi.com/v1/images/search";

const img = document.querySelector("img");
const btnChange = document.querySelector("#button")

async function aleatorio(urlAPI) {

    try {
        const response = await fetch(urlAPI)
        const data = await response.json();
        return data;
    } catch (er) {
        console.log(er);
    }
}

const changeImg = async () => {
    try {
        const imgResponse = await aleatorio(url);
        img.src = imgResponse[0].url;
    } catch (er) {
        console.log("Error: " + er);
    }
}


btnChange.onclick = changeImg;
