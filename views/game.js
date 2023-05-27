import { getFiltro, getFileRequest, addGame, getButtonValue } from "../services/http.js";

export { Game };

async function Game(params) {
  let access_token = localStorage.getItem("access_token");
  let games = await getFiltro('Games?select=*&genre=eq.' + params, access_token);
  console.log(games);
  let divPrincipal = document.querySelector("#contenido");

  divPrincipal.innerHTML = `
    <link rel="stylesheet" type="text/css" href="./assets/css/cards.css"> 
    <link rel="stylesheet" type="text/css" href="./assets/css/search.css"> 
    <link rel="stylesheet" type="text/css" href="./assets/css/botones.css">
    <label for="inp" class="inp">
    <input type="text" id="searchInput" class="searchInput" placeholder="&nbsp;">
    <span class="label">Buscar</span>
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
        <button id="add" data-gameid="${game.id}" class="button-glitch" >Add</button>
        </li>
        </ul>
    `;
   
    divPrincipal.querySelector("#container").append(card);
    const button = card.querySelector("#add");
    getButtonValue("User_games?id_games=eq."+game.id, access_token)
      .then((result) => {
        console.log(result);
        const buttonValue = result[0]?.id_games;
        console.log(buttonValue);
        
        if (buttonValue === game.id) {
          console.log(buttonValue === game.id);
          button.disabled = true;

        }
      })
      .catch((error) => {
        console.error("Error al obtener el valor del botón:", error);
      });
    
    card.querySelector("#add").addEventListener("click", function () {
      let gameid = this.getAttribute("data-gameid");
      addGame("User_games", [{"id_games": gameid , "id_profiles": localStorage.getItem("id")}], localStorage.getItem("access_token"));
      console.log(this);
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