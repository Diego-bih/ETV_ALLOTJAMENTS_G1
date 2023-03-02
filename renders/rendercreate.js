const { ipcRenderer } = require("electron");
//We ask the ipcMain to give us the user's id
ipcRenderer.send("channelIdCreate","Give me the id")
//ipcRender where we obtain the user's id
ipcRenderer.on("channelIdCreate-r", (e,args) =>{
    //The owners id input is always gonna be the user's id
    document.getElementById("propietari_id").value = args
    document.getElementById('propietari_id').readOnly = true
    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
  .forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        console.log('hola')
      }else{
        form.classList.add('was-validated')
        //We obtain the values from the inputs
        var nom = document.getElementById("nom").value
        var descripcio = document.getElementById("descripcio").value
        var nregistre = document.getElementById("nregistre").value
        var npersones = document.getElementById("npersones").value
        var nbanys = document.getElementById("nbanys").value
        var nllits = document.getElementById("nllits").value
        var nhabitacions = document.getElementById("nhabitacions").value
        var carrer = document.getElementById("carrer").value
        var numero = document.getElementById("numero").value
        var pisporta = document.getElementById("pisporta").value
        var municipi_id = document.getElementById("municipi_id").value
        var tipus_allotjament_id = document.getElementById("tipus_allotjament_id").value
        var tipus_vacances_id = document.getElementById("tipus_vacances_id").value
        var propietari_id = document.getElementById("propietari_id").value
        var categoria_id = document.getElementById("categoria_id").value
        var longitud = document.getElementById("longitud").value
        var latitud = document.getElementById("latitud").value

        //And turn the values into an object
        var obj = new Object()
        obj.nom = nom
        obj.descripcio = descripcio
        obj.nregistre = nregistre
        obj.npersones = npersones
        obj.nbanys = nbanys
        obj.nllits= nllits
        obj.nhabitacions = nhabitacions
        obj.carrer = carrer
        obj.numero = numero
        obj.pisporta = pisporta
        obj.municipi_id= municipi_id
        obj.tipus_allotjament_id = tipus_allotjament_id
        obj.tipus_vacances_id =tipus_vacances_id
        obj.propietari_id = propietari_id
        obj.categoria_id = categoria_id
        obj.longitud  = longitud
        obj.latitud = latitud
        console.log(obj)
        
        //And then we turn it into a JSON
        var json = JSON.stringify(obj)
        
        //Sends the information to the ipcMain
        e.sender.send("channelCreate",json)
      }
    }, false)
  })
    
})

//After the creation of the accomodation the window will close
ipcRenderer.on("channelCreate-r",(e,args) => {
    console.log(args)
    window.close() 
})
