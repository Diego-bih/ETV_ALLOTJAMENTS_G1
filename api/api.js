const { Grid, h } = require('gridjs')

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
              className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
              onClick: () =>{
                console.log(row.cells[4].data)
                if(row.cells[4].data == id){
                  console.log('klk')
                }
                }
            }, 'Edit')
          {
         ;}
        }
        } },
      ],
      search: true,
      pagination: true,
      sort: true,
      //width: 1000,
      data: () => {
        return new Promise(resolve => {
          setTimeout(()=> resolve(info),1000)
        })
      }
    }
  ).render(document.getElementById("wrapper"))
  

}

module.exports = {
  getInfo,
  getList
}

