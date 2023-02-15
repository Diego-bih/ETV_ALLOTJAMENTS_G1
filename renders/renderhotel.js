const { ipcRenderer } = require("electron");

let $ = {jQuery} = require('jquery');

function verAlojamiento(id){
    ipcRenderer.send("request1",(e,id))
}
ipcRenderer.on("request-res",(e,args)=>{
    const respuesta = JSON.parse(args);
        $("#img").setAttribute('src', respuesta.data.fotos[0].url)
        $("#descr").add(`${respuesta.data.descripcio}`)
        $("#num-toilet").add(`${respuesta.data.nbanys}`)
        $("#num-hab").add(`${respuesta.data.nhabitacions}`)
        $("#num-lits").add(`${respuesta.data.descripcio}`)
})