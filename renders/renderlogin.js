const { ipcRenderer } = require("electron")
var login = document.getElementById('login')

document.getElementById("email").value = localStorage.getItem("email")

var forms = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
Array.prototype.slice.call(forms)
  .forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }else{
        form.classList.add('was-validated')
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
  
        localStorage.setItem("email", email)
  
        var obj = new Object()
        obj.email = email
        obj.password = password
        
        var json = JSON.stringify(obj)
        
        ipcRenderer.send("channelPost",json)
      }
    }, false)
  })


/*login.addEventListener("click", function() {

var email = document.getElementById("email").value
var password = document.getElementById("password").value

localStorage.setItem("email", email)

var obj = new Object()
obj.email = email
obj.password = password

var json = JSON.stringify(obj)

ipcRenderer.send("channelPost",json)

})*/

//var submit = document.getElementById("login")
ipcRenderer.on("channelPost-r",(e,args) => {
    var t = true
    if(args == t){
        console.log("Ha ocurrit un problema")
    }else if(args != t){
    const token = args
    e.sender.send("channellogin", token)
    window.close()
    e.sender.send("channelshowlogged", "Show message")
 
}
})