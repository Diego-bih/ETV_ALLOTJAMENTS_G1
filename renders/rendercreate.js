const { ipcRenderer } = require("electron");
//var create = document.getElementById('create')
ipcRenderer.send("channelIdCreate","Give me the id")
ipcRenderer.on("channelIdCreate-r", (e,args) =>{
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
    var propietari_id = document.getElementById("propietari_id").value = args
    document.getElementById('propietari_id').readOnly = true
    var categoria_id = document.getElementById("categoria_id").value
    var longitud = document.getElementById("longitud").value
    var latitud = document.getElementById("latitud").value
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
        
        var json = JSON.stringify(obj)
        
        e.sender.send("channelCreate",json)
      }
    }, false)
  })
    

   /* create.addEventListener("click", function() {
    
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
        
        var json = JSON.stringify(obj)
        console.log(json)
        
        e.sender.send("channelCreate",json)
    
    })*/

})
    
ipcRenderer.on("channelCreate-r",(e,args) => {
    console.log(args)
    
})
