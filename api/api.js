const { ipcRenderer } = require('electron');
const { Grid, h,html } = require('gridjs')

//File of functions that are gonna render information dinamically

//Function which is gonna display the information in the homepage
function getInfo(info){
        //Callback which is gonna set the data without duplicated information. Only just one photo for an accomodation
        var uniphoto = {}
        info = info.filter(function(cb) {
          if(cb.allotjament_id in uniphoto){
            return false
          }
          else{
            uniphoto[cb.allotjament_id] = true;
            return true
          }
        })
        console.log(info)
        let container = $('.cards')
        //Iterating in the data and setting information inside the html code which means the information is gonna be displayed dinamically.
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
        let button = $(`<button class="btn">Llegir Més</button>`)
        container.append(li.append(card.append(image,cardcontent.append(cardtitle,text,text2,text3,text4,button))))
      }
  }

//Function which is gonna display the information of all the accomodations in a list
function getList(id,info) {
  console.log(id)
  console.log(info[0].propietari.id)
  //Use of grid.js library to make the table
  const grid = new Grid(
    {
      columns: [
       "id",
       "nom",
       "descripcio",
       "nregistre",
       {
        //Data for this column must be the owners id.
        data: (row) => row.propietari.id,
        name: 'Propietari',

       },
       { 
        name: 'Actions',
        formatter: (cell, row) => {
          //If the row's data id is equal to the user's id
          if(row.cells[4].data == id){
            //Return a button
            return h('button', {
              onClick: () =>{
                //Iterating in the data array of json
                for(var i =0;i< info.length;i++){ 
                  //If the rows owners id of the accomodation is equal to the id of the accomodation in the array of json
                  if(row.cells[0].data == info[i].id ){
                    var data = info[i]
                    console.log(data)
                    //Child window to open the html that is gonna work as an edit page
                    var childwindow = window.open('../html/create.html','edit', 'width=1000,height=1000,maxWidth=1000,maxHeight=1000,minWidth=320,minHeight=200')
                    //Load the respective data on the page
                    childwindow.onload = function(){
                      //First we change some elements of the page to make it as an edit page
                    childwindow.document.getElementById('title').innerText= "Editar Allotjament"
                    childwindow.document.getElementById('h1').innerText= "Editar Allotjament"
                    childwindow.document.getElementById('nomlabel').innerText= "Nom (Must Change)"
                    childwindow.document.getElementById('labelregistre').innerText= "Nº Registre (Must Change)"
                    
                    //The element value will be the respective value from the array. Done with the index
                    var nom = childwindow.document.getElementById("nom").value = data.nom
                    //When the value is changed on the input, the new value is gonna be setted to the variable
                    childwindow.document.getElementById('nom').oninput = function() {
                      nom = childwindow.document.getElementById('nom').value
                    }    
                    var descripcio = childwindow.document.getElementById("descripcio").value = data.descripcio
                    childwindow.document.getElementById('descripcio').oninput = function() {
                      descripcio = childwindow.document.getElementById('descripcio').value
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
                      categoria_id = childwindow.document.getElementById('categoria_id').value
                    }
                    var longitud = childwindow.document.getElementById("longitud").value = data.longitud
                    childwindow.document.getElementById('longitud').oninput = function() {
                      longitud = childwindow.document.getElementById('longitud').value
                    }
                    var latitud = childwindow.document.getElementById("latitud").value = data.latitud
                    childwindow.document.getElementById('latitud').oninput = function() {
                      latitud = childwindow.document.getElementById('latitud').value
                    }
                      var forms = childwindow.document.querySelectorAll('.needs-validation')
                    
                      Array.prototype.slice.call(forms)
                        .forEach(function (form) {
                          form.addEventListener('submit', function (event) {
                            if (!form.checkValidity()) {
                              event.preventDefault()
                              event.stopPropagation()
                            }else{
                              form.classList.add('was-validated')
                              //Turn the values into an object
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
                              //The accomodation's id is send to the main with the data
                              ipcRenderer.send("channelEdit",[data.id,json])
                            }
                          }, false)
                        })
                    
                    //If the accomodation is succesfully edited, we receive the permit to close the child window and refresh the page with the new data
                    ipcRenderer.on("channelEdit-r",(e,args) => {
                      //Timeout to handle the child window closing before receiving context
                        setTimeout(() => {
                          childwindow.close()
                          document.location = document.location
                        }, 1000);     
                    })
                    }
                  }
                }
                }
            }, 'Edit')
          {
         ;}
        }
        //If rows owner id isn't the same as the user's id, we can not edit any other accomodation. Only the ones that we create.
        else{
          return html('<div>No editable</div>')
        }
        } },
      ],
      search: true,
      language: {
        'search': {
          'placeholder': `La teva ID de propietari es: ${id}`
        }
      },
      pagination: {
        limit:8
      },
      sort: true,
      //We handle the json data and it will automatically fit into their respective column.
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

