const { ipcRenderer } = require("electron");

let $ = { jQuery } = require('jquery');


ipcRenderer.on("request-res", (e, args) => {
    var alojamiento = args.data;
    let image = $(`<div id="img"><img src="${alojamiento.fotos[0].url}" style="width:80%"></div>`)
    let cardcontent = $(`<div id="cont"></div>`)
    let cardtitle = $(`<h2 id="title">${alojamiento.nom}</h2>`)
    let text = $(`<p id="municipi">Municipio ${alojamiento.municipi.municipi}</p>`)
    let text2 = $(`<p id="pax">Per ${alojamiento.npersones} persones</p>`)
    let text3 = $(`<p id="desc">${alojamiento.descripcio}</p>`)
    let text4 = $(`<p id="valoracion">Valoració: ${alojamiento.valoracio} estrelles</p>`)
    $("#info").append(cardtitle, image, cardcontent.append(text, text2, text4, text3))

    
    let latitud = parseFloat(alojamiento.latitud);
    let longitud = parseFloat(alojamiento.longitud);

    var map = L.map('map').setView([latitud, longitud], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 15,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([latitud, longitud])
        marker.bindTooltip(`<b>${alojamiento.nom}</b><br>${alojamiento.carrer}`).openPopup();
        marker.addTo(map);
})




