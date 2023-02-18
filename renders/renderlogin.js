const { ipcRenderer } = require("electron")
//var api = require('../api/api.js')
let $ = { jQuery } = require('jquery');

var login = $('#login')

login.on("click", function () {

    var email = $("#email").val()
    var password = $("#password").val()

    var obj = new Object()
    obj.email = email
    obj.password = password

    var json = JSON.stringify(obj)

    ipcRenderer.send("channelPost", json)

})

ipcRenderer.on("channelPost-r", (e, args) => {
    var t = true
    if (args == t) {
        console.log("Ha ocurrit un problema")
    } else if (args != t) {
        console.log("Hello: " + args)
    }
})