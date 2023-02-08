const { ipcRenderer } = require("electron");

var api = require('../api/api.js')

ipcRenderer.send('channelInfo','Give me the image')
ipcRenderer.on("channelInfo-r",(e,args) => {
    api.getInfo(args)
})