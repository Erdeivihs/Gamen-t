import { getFiltro, getFileRequest, deleteGame } from "../services/http.js";

export { Perfil };

async function Perfil() {
  let access_token = localStorage.getItem("access_token");
  let filtroid = await getFiltro('User_games?select=*&id_profiles=eq.' + localStorage.getItem("id"), access_token);
  const idGamesList = filtroid.map(obj => obj.id_games);
  let games = await getFiltro('Games?select=*&id=in.(' + idGamesList.join(',')+")", access_token)
  let divPrincipal = document.querySelector("#contenido");

  divPrincipal.innerHTML = `
  <link rel="stylesheet" type="text/css" href="./assets/css/cards.css"> 
  <link rel="stylesheet" type="text/css" href="./assets/css/search.css"> 
  <link rel="stylesheet" type="text/css" href="./assets/css/botones.css">
  <link rel="stylesheet" type="text/css" href="./assets/css/perfil.css">
  <head>
  <link href="https://fonts.googleapis.com/css?family=Fira+Sans+Condensed:300,400,600i&display=swap" rel="stylesheet">
</head>
<div class="infocardContainer">
  <div id="main">
    <img src="../assets/img/perfil.png"></img>
  </div>
  <div id="textbois">
    

    <h2>${localStorage.getItem("username")}</h2>
    <h3>${localStorage.getItem("email")}</h3>
    <div id="hotlinks">
      <a href="#"><img id="codepenio" src="https://blog.codepen.io/wp-content/uploads/2012/06/Button-Fill-Black-Small.png" target="_blank"></img>
      </a>
      <a href="#">
        <img id="codepenio" src="https://blog.codepen.io/wp-content/uploads/2012/06/Button-Fill-Black-Small.png" target="_blank"></img>
      </a>
      <a href="#">
        <img id="codepenio" src="https://blog.codepen.io/wp-content/uploads/2012/06/Button-Fill-Black-Small.png" target="_blank"></img>
      </a>
    </div>
  </div>
</div>
  <label for="inp" class="inp">
  <input type="text" id="searchInput" class="searchInput" placeholder="&nbsp;">
  <span class="label">Search</span>
  <span class="focus-bg"></span>
  </label>

  <div class="container card-group" id="container">
  </div>
  `;

  async function createCard(game) {
    async function getCaratula(game) {
      console.log(game.id);
      let img = game.thumbnail;
      game.image_blob = false;
      if (img) {
        let imageBlob = await getFileRequest(img, access_token);
        if (imageBlob instanceof Blob) {
          game.image_blob = URL.createObjectURL(imageBlob);
        }
      }
      return game.image_blob;
    }

    let card = document.createElement("div");

    card.innerHTML = `
        <div class="center">
          <div class="article-card">
            <div class="content">
              <p class="title">${game.title}</p>
            </div>
              <img src="${await getCaratula(game)}" />
          </div>
        </div>
        <ul>
        <li>
        <button id="add" data-gameid="${game.id}" class="button-glitch" role="button">Delete</button>
        </li>
        </ul>
    `;

    divPrincipal.querySelector("#container").append(card);

    card.querySelector("#add").addEventListener("click", function () {
        let gameid = this.getAttribute("data-gameid");
        deleteGame("User_games?id_games=eq."+gameid+"&id_profiles=eq."+localStorage.getItem("id"), localStorage.getItem("access_token"));
        Perfil();
      });
  }

  function renderGames() {
    divPrincipal.querySelector("#container").innerHTML = "";
    games.forEach(createCard);
  }

  renderGames();

  // Buscador reactivo
  const searchInput = document.querySelector("#searchInput");

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredGames = games.filter((game) =>
      game.title.toLowerCase().includes(searchTerm)
    );
    divPrincipal.querySelector("#container").innerHTML = "";
    filteredGames.forEach(createCard);
  });
}