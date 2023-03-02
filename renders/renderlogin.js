const { ipcRenderer } = require("electron")

//Get the localStorage value of the email
document.getElementById("email").value = localStorage.getItem("email")

//Get the form from the html
var forms = document.querySelectorAll('.needs-validation')

//Loop over the form and prevent submission
Array.prototype.slice.call(forms)
  .forEach(function (form) {
    //Event on submit
    form.addEventListener('submit', function (event) {
      //If the form is not valid by non filled input we prevent the form to submit
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }else{
        //Now form is valid
        form.classList.add('was-validated')
        //We get the values of the inputs
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        
        //Get the localStorage value of the email to prevent typing it everytime
        localStorage.setItem("email", email)
        
        //We put the values into an object
        var obj = new Object()
        obj.email = email
        obj.password = password
        
        //And then we turn it into a JSON
        var json = JSON.stringify(obj)
        
        //Sends the information to the ipcMain
        ipcRenderer.send("channelPost",json)
      }
    }, false)
  })

//ipcRender to handle what is gonna be showed after users logs in
ipcRenderer.on("channelPost-r",(e,args) => {
    var t = false
    if(args == t){
        console.log("Ha ocurrit un problema")
    }else if(args != t){
    //The current window is closed
    window.close()
    //We communicate with ipcMain to show a dialog
    e.sender.send("channelshowlogged", "Show message")
 
}
})