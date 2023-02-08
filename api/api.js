function getInfo(info){

    document.getElementById("nom").innerText = info.data.nom
    document.getElementById("municipi").innerText = info.data.municipi.municipi
    document.getElementById("image").setAttribute('src', info.data.fotos[0].url)
  
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

