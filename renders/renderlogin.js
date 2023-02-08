const { ipcRenderer } = require("electron")
//var api = require('../api/api.js')

var login = document.getElementById('login')

login.addEventListener("click", function() {

var email = document.getElementById("email").value
var password = document.getElementById("password").value

var obj = new Object()
obj.email = email
obj.password = password

var json = JSON.stringify(obj)

ipcRenderer.send("channelPost",json)
ipcRenderer.on("channelPost-r",(e,args) => {
    console.log("Success: " + args)
})



})