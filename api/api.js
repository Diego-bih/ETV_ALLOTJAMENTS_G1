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
        let image = $(`<div class="card_image"><img src="${obj.url}"></div>`)
        let cardcontent = $(`<div class="card_content"></div>`)
        let cardtitle = $(`<h2 class="card_title">${obj.allotjament.nom}</h2>`)
        let text = $(`<p class="card_text">${obj.allotjament.descripcio}</p>`)
        let button = $(`<button class="btn card_btn">Read More</button>`)
        container.append(li.append(card.append(image,cardcontent.append(cardtitle,text,button))))
      }
  }

module.exports = {
  getInfo
}

