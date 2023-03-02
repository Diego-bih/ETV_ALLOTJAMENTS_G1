const { ipcRenderer } = require("electron");

var api = require('../api/api.js')

//ipcRender where we ask for the information of the accomodations to the ipcMain
ipcRenderer.send('channelList','Give me the info')

//ipcRender where we obtain the information and call the function that is gonna display the list of accomodations
ipcRenderer.on("channelList-r1",(e,args) => {
        api.getList(args[0],args[1])
})
    
