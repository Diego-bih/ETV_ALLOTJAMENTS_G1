const { ipcRenderer } = require('electron');
const { Grid, h,html } = require('gridjs')

function getInfo(info){
  /*
    document.getElementById("nom").innerText = info.data.nom
    document.getElementById("municipi").innerText = info.data.municipi.municipi
    document.getElementById("image").setAttribute('src', info.data.fotos[0].url)*/
      console.log(info)
      //info.forEach(info => {
        let container = $('.cards')
        for(var i = 0; i< info.length;i++){
        let obj = info[i];
        let li = $(`<li class="cards_item"></li>`)
        let card = $(`<div class ="card"></div>`)
        let image = $(`<div class="card_image"><img src="${obj.url}" style="width:100%"></div>`)
        let cardcontent = $(`<div class="card_content"></div>`)
        let cardtitle = $(`<h2 class="card_title">${obj.allotjament.nom}</h2>`)
        let text = $(`<p class="card_text">${obj.allotjament.municipi.municipi}</p>`)
        let text2 = $(`<p class="card_text">Per ${obj.allotjament.npersones} persones</p>`)
        let text3 = $(`<p class="card_text">${obj.allotjament.descripcio}</p>`)
        let text4 = $(`<p class="card_text">Valoració: ${obj.allotjament.valoracio} estrelles</p>`)
        let button = $(`<button class="btn card_btn">Llegir Més</button>`)
        container.append(li.append(card.append(image,cardcontent.append(cardtitle,text,text2,text3,text4,button))))
      }
  }

function getList(id,info) {
  console.log(id)
  console.log(info[0].propietari.id)
  const grid = new Grid(
    {
      columns: [
       "id",
       "nom",
       "descripcio",
       "nregistre",
       {
        data: (row) => row.propietari.id,
        name: 'Propietari',

       },
       { 
        name: 'Actions',
        formatter: (cell, row) => {
          //Obtener id de creador. Hacer if y que solo salgan botones en los que haya creado.
          if(row.cells[4].data == id){
            return h('button', {
              onClick: () =>{
                //console.log(row.cells[4].data)
                for(var i =0;i< info.length;i++){ 
                  if(row.cells[0].data == info[i].id ){
                    var data = info[i]
                    console.log(data)
                    var childwindow = window.open('../html/create.html','edit',)
                    childwindow.onload = function(){
                    childwindow.document.getElementById('title').innerHTML= "Editar Allotjament"
                    childwindow.document.getElementById('h1').innerHTML= "Editar Allotjament"
                    var nom = childwindow.document.getElementById("nom").value = data.nom
                    childwindow.document.getElementById('nom').oninput = function() {
                      nom = childwindow.document.getElementById('nom').value
                    }    
                    var descripcio = childwindow.document.getElementById("descripcio").value = data.descripcio
                    childwindow.document.getElementById('descripcio').oninput = function() {
                      nom = childwindow.document.getElementById('nom').value
                    }
                    var nregistre = childwindow.document.getElementById("nregistre").value = data.nregistre
                    childwindow.document.getElementById('nregistre').oninput = function() {
                      nregistre = childwindow.document.getElementById('nregistre').value
                    }
                    var npersones = childwindow.document.getElementById("npersones").value = data.npersones
                    childwindow.document.getElementById('npersones').oninput = function() {
                      npersones = childwindow.document.getElementById('npersones').value
                    }
                    var nbanys = childwindow.document.getElementById("nbanys").value = data.nbanys
                    childwindow.document.getElementById('nbanys').oninput = function() {
                      nbanys = childwindow.document.getElementById('nbanys').value
                    }
                    var nllits = childwindow.document.getElementById("nllits").value = data.nllits
                    childwindow.document.getElementById('nllits').oninput = function() {
                      nllits = childwindow.document.getElementById('nllits').value
                    }
                    var nhabitacions = childwindow.document.getElementById("nhabitacions").value = data.nhabitacions
                    childwindow.document.getElementById('nhabitacions').oninput = function() {
                      nhabitacions = childwindow.document.getElementById('nhabitacions').value
                    }
                    var carrer = childwindow.document.getElementById("carrer").value = data.carrer
                    childwindow.document.getElementById('carrer').oninput = function() {
                      carrer = childwindow.document.getElementById('carrer').value
                    }
                    var numero = childwindow.document.getElementById("numero").value = data.numero
                    childwindow.document.getElementById('numero').oninput = function() {
                      numero = childwindow.document.getElementById('numero').value
                    }
                    var pisporta = childwindow.document.getElementById("pisporta").value = data.pisporta
                    childwindow.document.getElementById('pisporta').oninput = function() {
                      pisporta = childwindow.document.getElementById('pisporta').value
                    }
                    var municipi_id = childwindow.document.getElementById("municipi_id").value = data.municipi_id
                    childwindow.document.getElementById('municipi_id').oninput = function() {
                      municipi_id = childwindow.document.getElementById('municipi_id').value
                    }
                    var tipus_allotjament_id = childwindow.document.getElementById("tipus_allotjament_id").value = data.tipus_allotjament_id
                    childwindow.document.getElementById('tipus_allotjament_id').oninput = function() {
                      tipus_allotjament_id = childwindow.document.getElementById('tipus_allotjament_id').value
                    }
                    var tipus_vacances_id = childwindow. document.getElementById("tipus_vacances_id").value = data.tipus_vacances_id
                    childwindow.document.getElementById('tipus_vacances_id').oninput = function() {
                      tipus_vacances_id = childwindow.document.getElementById('tipus_vacances_id').value
                    }
                    var propietari_id = childwindow.document.getElementById("propietari_id").value = data.propietari_id
                    childwindow.document.getElementById('propietari_id').oninput = function() {
                      propietari_id = childwindow.document.getElementById('propietari_id').value
                    }
                    childwindow.document.getElementById('propietari_id').readOnly = true 
                    var categoria_id = childwindow.document.getElementById("categoria_id").value = data.categoria_id
                    childwindow.document.getElementById('categoria_id').oninput = function() {
                      nom = childwindow.document.getElementById('categoria_id').value
                    }
                    var longitud = childwindow.document.getElementById("longitud").value = data.longitud
                    childwindow.document.getElementById('longitud').oninput = function() {
                      longitud = childwindow.document.getElementById('longitud').value
                    }
                    var latitud = childwindow.document.getElementById("latitud").value = data.latitud
                    childwindow.document.getElementById('latitud').oninput = function() {
                      latitud = childwindow.document.getElementById('latitud').value
                    }
                    var edit = childwindow.document.getElementById('create')
                  
                    edit.addEventListener("click", function() {
                    
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
                        ipcRenderer.send("channelEdit",[data.id,json])
                    
                    })
                    }
                  }
                }
                /*console.log(info[12])
                console.log('klk')*/
                }
            }, 'Edit')
          {
         ;}
        }else{
          return html('<div>No editable</div>')
        }
        } },
      ],
      search: true,
      pagination: true,
      sort: true,
      //width: 1000,
      data: () => {
        return new Promise(resolve => {
          setTimeout(()=>resolve(info),1000)
        })
      }
    }
  ).render(document.getElementById("wrapper"))
  

}

module.exports = {
  getInfo,
  getList
}

