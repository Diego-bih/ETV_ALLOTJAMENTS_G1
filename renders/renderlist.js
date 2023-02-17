const { ipcRenderer } = require("electron");

var api = require('../api/api.js')

ipcRenderer.send('channelList','Give me the info')
ipcRenderer.on("channelList-r1",(e,args) => {
    api.getList(args)
})
