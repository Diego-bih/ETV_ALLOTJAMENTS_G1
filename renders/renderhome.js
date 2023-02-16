const { ipcRenderer } = require("electron");
let $ = {jQuery} = require('jquery');

var api = require('../api/api.js');



ipcRenderer.send('channelInfo','Give me the image')
ipcRenderer.on("channelInfo-r1",(e,args) => {
    console.log(args)
    api.getInfo(args);
})


