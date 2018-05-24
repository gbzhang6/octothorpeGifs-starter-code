const userId = 5;
document.addEventListener("DOMContentLoaded", function(event){


fetch('https://fetch-message-in-the-bottle.herokuapp.com/api/v2/gifs').then(res => res.json()).then(json => renderJson(json))
})

function renderJson(json){
  json.forEach((gifObj)=> {
    const createDiv = document.createElement('div')
    const createImg = document.createElement('img')
    createDiv.append(createImg)
    createImg.src = gifObj.url
    createImg.id = gifObj.id
    createImg.setAttribute("user_id", gifObj.user_id)
    const container = document.getElementById('gifs-container')
    container.append(createImg)
  })
}
//POST GIF

const gifInput = document.getElementById('new-gif-input')
gifInput.addEventListener("keydown", (e)=>{
  if (e.keyCode === 13){
    fetch('https://fetch-message-in-the-bottle.herokuapp.com/api/v2/gifs',{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        'url': gifInput.value,
        'user_id': userId
      })
    })
  }
})

//DELETE GIF

document.addEventListener("click", (e)=>{
  if (e.target.tagName === "IMG"){
    if (e.target.getAttribute("user_id") == userId) {
      fetch(`https://fetch-message-in-the-bottle.herokuapp.com/api/v2/gifs/${e.target.id}`, {
        method: "DELETE",
        headers: {"Content-Type":"application/json"},
      })
      e.target.remove()
    } else {
      alert("This ain't yours!");
    }
  }
})
