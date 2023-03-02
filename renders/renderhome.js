const { ipcRenderer } = require("electron");

var api = require('../api/api.js')

//ipcRender calls main to obtain the information
ipcRenderer.send('channelInfo','Give me the image')

//ipcRender where we obtain the data from the api and call the function which is gonna display the information in the homepage
ipcRenderer.on("channelInfo-r1",(e,args) => {
    console.log(args)
    api.getInfo(args);
})
