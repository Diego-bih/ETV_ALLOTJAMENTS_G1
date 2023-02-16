const { ipcRenderer } = require("electron");

let $ = {jQuery} = require('jquery');

function verAlojamiento(id){
    ipcRenderer.send("request1",(id))
}

ipcRenderer.on("request-res",(e,args)=>{

    console.log("en request res")
    const respuesta = JSON.parse(args);
    console.log(respuesta.data.fotos[0].url)
    let image = $(`<div class="card_image"><img src="${respuesta.data.fotos[0].url}" style="width:100%"></div>`)
    let cardcontent = $(`<div class="card_content"></div>`)
    let cardtitle = $(`<h2 class="card_title">${respuesta.data.nom}</h2>`)
    let text = $(`<p class="card_text">${respuesta.data.municipi.municipi}</p>`)
    let text2 = $(`<p class="card_text">Per ${respuesta.data.npersones} persones</p>`)
    let text3 = $(`<p class="card_text">${respuesta.data.descripcio}</p>`)
    let text4 = $(`<p class="card_text">Valoració: ${respuesta.data.valoracio} estrelles</p>`)
    $(".info").append(image,cardcontent.append(cardtitle,text,text2,text3,text4))

     /*$("#img").attr('src', respuesta.data.fotos[0].url)
        $("#descr").val(respuesta.data.descripcio)
        $("#num-toilet").val(respuesta.data.nbanys)
        $("#num-hab").val(respuesta.data.nhabitacions)
        $("#num-lits").val(respuesta.data.descripcio)
    */

})

var map = L.map('map').setView([3.035578, 39.746220], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([3.035578, 39.746220]).addTo(map);


module.exports.verAlojamiento = verAlojamiento;
