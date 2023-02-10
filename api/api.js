function getInfo(info){
  /*
    document.getElementById("nom").innerText = info.data.nom
    document.getElementById("municipi").innerText = info.data.municipi.municipi
    document.getElementById("image").setAttribute('src', info.data.fotos[0].url)*/

    let container = $('.card')
    //info.forEach(info => {
    let a = $(`<img src="${info.data.fotos[0].url}" id="image" style="width:100%">`)
    let b = $(`<div class="container"></div>`)
    let c = $(`<h4 id ="nom"><b>${info.data.nom}</b></h4>`)
    let d = $(`<p id ="municipi">${info.data.municipi.municipi}</p>`)
    container.append(a,b.append(c,d))
  
   // });
  
    /*
    const grid = new Grid({
      data: [info]
    }).render(document.getElementById("wrapper"));*/
          
    /*let container = $(".image")
          //For every year, append in the container
          let a = $(`<p>${info}</p>`)
          container.append(a)*/
  }

module.exports = {
  getInfo
}

