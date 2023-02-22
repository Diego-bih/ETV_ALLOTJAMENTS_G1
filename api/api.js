
let $ = {jQuery} = require('jquery');

function getInfo(info){
  /*
    document.getElementById("nom").innerText = info.data.nom
    document.getElementById("municipi").innerText = info.data.municipi.municipi
    document.getElementById("image").setAttribute('src', info.data.fotos[0].url)*/
      //console.log(info)
      //info.forEach(info => {
        let container = $('.cards')
        for(var i = 0; i< info.length;i++){
        let obj = info[i];
        let id = obj.allotjament.id;
        let li = $(`<li class="cards_item"></li>`)
        let card = $(`<div class ="card"></div>`)
        let image = $(`<div class="card_image"><img src="${obj.url}" style="width:100%"></div>`)
        let cardcontent = $(`<div class="card_content"></div>`)
        let cardtitle = $(`<h2 class="card_title">${obj.allotjament.nom}</h2>`)
        let text = $(`<p class="card_text">${obj.allotjament.municipi.municipi}</p>`)
        let text2 = $(`<p class="card_text">Per ${obj.allotjament.npersones} persones</p>`)
        let text3 = $(`<p class="card_text">${obj.allotjament.descripcio}</p>`)
        let text4 = $(`<p class="card_text">Valoració: ${obj.allotjament.valoracio} estrelles</p>`)
        let button = $(`<button class="btn card_btn" onclick="verAloja('${id}')" >Llegir Més</button>`)
        
        container.append(li.append(card.append(image,cardcontent.append(cardtitle,text,text2,text3,text4,button))))
      }
  }

  const { ipcRenderer } = require("electron");
  function verAloja(id){
    ipcRenderer.send("request1",(id))
  }


module.exports = {
  getInfo
}

