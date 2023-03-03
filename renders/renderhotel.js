const { ipcRenderer } = require("electron");

let $ = { jQuery } = require('jquery');


ipcRenderer.on("request-res", (e, args) => {
    var alojamiento = args.data;
    
    let images = $("#images-container")
    for(var i = 0; i< alojamiento.fotos.length;i++){
        images.append(`<img class="image" src="${alojamiento.fotos[i].url}" style="width:80%">`)
    }
    let cardcontent = $(`<div id="cont"></div>`)
    let descrTop = $(`<div id="descrTop"></div>`)
    let title = $(`<h2 id="title">${alojamiento.nom}</h2>`)
    let municipi = $(`<img class="icon" src="../assets/marcador-def.png">&nbsp<span class="item" id="municipi">Municipio ${alojamiento.municipi.municipi}</span>`)
    let personas = $(`<img class="icon"  src="../assets/persona.png">&nbsp<span class="item" id="pax">Per ${alojamiento.npersones} persones</span>`)
    let banys = $(`<img class="icon"  src="../assets/bany.png">&nbsp;<span class="item" id="municipi">Baños:  ${alojamiento.nbanys}</span>`)
    let llits = $(`<img class="icon"  src="../assets/camas.png">&nbsp;<span class="item" id="municipi">Camas: ${alojamiento.nllits}</span>`)
    let descr = $(`<p id="desc">${alojamiento.descripcio}</p>`)
    let valoracio = $(`<span class="item" id="valoracion">Valoració: ${alojamiento.valoracio}</span>&nbsp;<img class="icon" src="../assets/star.png">`)
    let mapa = $("#map");
    descrTop.append(valoracio,"&nbsp;&nbsp;&nbsp;&nbsp;",municipi,"&nbsp;&nbsp;&nbsp;&nbsp;",personas,"<br>",banys,"&nbsp;&nbsp;&nbsp;&nbsp;",llits)
    $("#info").append(title, images, cardcontent.append(descrTop, descr).append("<br></br>",mapa))

    
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




