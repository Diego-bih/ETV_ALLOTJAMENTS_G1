const { ipcRenderer } = require("electron");

let $ = {jQuery} = require('jquery');

function verAlojamiento(id){
    ipcRenderer.send("request1",(e,id))
}
ipcRenderer.on("request-res",(e,args)=>{
    const respuesta = JSON.parse(args);
        $("#img")= <img src=args.img alt=''>
        //+`<div class="info">`
        //+`<p>Nom: ${element.nom}</p>`
        //+`<p>Municipi: ${element.municipi_id}</p>`
        //+`<p>Pax: ${element.npersones}</p>`
        //+`<p>Valoracio: ${element.valoracio}</p>`
        //+`<textarea cols="30" rows="5"> ${element.descripcio}</textarea></div></div>`
})