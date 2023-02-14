const { ipcRenderer } = require("electron");

let $ = {jQuery} = require('jquery');

function verAlojamiento(id){
    ipcRenderer.send("request1",(e,id))
}
ipcRenderer.on("request-res",(e,args)=>{
    
})