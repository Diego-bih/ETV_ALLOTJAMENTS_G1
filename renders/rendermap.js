const { ipcRenderer } = require("electron");


ipcRenderer.send("channelInfo", true);

ipcRenderer.on("channelInfo-r1", (e, args) => {
    console.log("en mapa grande")

    let latitud = parseFloat(args[0].allotjament.latitud);
    let longitud = parseFloat(args[0].allotjament.longitud);

    var map = L.map('map').setView([39.642221, 3.009480], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    args.forEach(alojamiento => {

        latitud = parseFloat(alojamiento.allotjament.latitud);
        longitud = parseFloat(alojamiento.allotjament.longitud);
        var marker = L.marker([latitud, longitud])
        marker.bindTooltip(`<b>${alojamiento.allotjament.nom}</b>
        <br><img src="${alojamiento.url}" style="width:80%">
        <br>Municipi: ${alojamiento.allotjament.municipi.municipi}
        <br>Direccion: ${alojamiento.allotjament.carrer}`).openPopup();
        marker.addEventListener("click",()=>{
            ipcRenderer.send("request1",alojamiento.allotjament_id)
        })
        marker.addTo(map);
    });
})