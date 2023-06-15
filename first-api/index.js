
const urlAPI = "https://api.thecatapi.com/v1/images/search?limit=3";

const img1 = document.querySelector("#img1");
const img2 = document.querySelector("#img2");
const img3 = document.querySelector("#img3");
const img4 = document.querySelector("#img4");
const btnChange = document.querySelector("#button")

async function changeImg() {
    const response = await fetch(urlAPI);
    const data = await response.json();
    // console.log(data)
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img4.src = data[3].url;

}

changeImg()