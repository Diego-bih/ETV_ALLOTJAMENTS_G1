const { ipcRenderer } = require("electron");

let $ = { jQuery } = require('jquery');


ipcRenderer.on("request-res", (e, args) => {

    let image = $(`<div id="img"><img src="${args.data.fotos[0].url}" style="width:100%"></div>`)
    let cardcontent = $(`<div id="cont"></div>`)
    let cardtitle = $(`<h2 id="title">${args.data.nom}</h2>`)
    let text = $(`<p id="municipi">${args.data.municipi.municipi}</p>`)
    let text2 = $(`<p id="pax">Per ${args.data.npersones} persones</p>`)
    let text3 = $(`<p id="desc">${args.data.descripcio}</p>`)
    let text4 = $(`<p id="valoracion">Valoració: ${args.data.valoracio} estrelles</p>`)
    $("#info").append(cardtitle, image, cardcontent.append(text, text2, text3, text4))

    //document.getElementById("title").innerText = args.data.nom
    /*
     $("#img").attr('src', args.data.fotos[0].url)
        $("#descr").val(args.data.descripcio)
        $("#num-toilet").val(args.data.nbanys)
        $("#num-hab").val(args.data.nhabitacions)
        $("#num-lits").val(args.data.descripcio)
    */


    var map = L.map('map').setView([3.035578, 39.746220], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([3.035578, 39.746220]).addTo(map);


})




