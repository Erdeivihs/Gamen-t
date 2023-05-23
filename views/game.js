import { getFiltro, getFileRequest } from "../services/http.js";

export { Game };

// async function borrar(dato) {
//   await getEliminar("carreras", dato, localStorage.getItem("access_token"));
// }

async function Game() {
  let access_token = localStorage.getItem("access_token");
  let games = await getFiltro('Games?select=*&genre=eq.Shooter', access_token);
  let divPrincipal = document.querySelector("#contenido");

  divPrincipal.innerHTML = `
    <link rel="stylesheet" type="text/css" href="./assets/css/cards.css"> 
    <div class="container" id="container">
    </div>
  `;

  games.forEach(async game => {
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
      <div class="card">
        <div class="center">
          <div class="article-card">
            <div class="content">
              <p class="title">${game.title}</p>
            </div>
              <img src="${await getCaratula(game)}" />
          </div>
        </div>
      </div>

      
    `;

    divPrincipal.querySelector("#container").append(card);
  });
}


{/* <div class="card">
        <button type="button" id="borrar" data-gameid="${game.id}"><i class="fa-solid fa-trash"></i></button>
        <figure class="card__thumb">
          <img src="${await getCaratula(game)}" alt="Resoldre imatge" class="card__image">
          <figcaption class="card__caption">
            <h2 class="card__title">${game.title}</h2>
            <p class="card__snippet">${game.descripcio}</p>
            <a href="${game.steam}" class="card__button"><img src="./assets/img/steam.png" /></a>
          </figcaption>
        </figure>
      </div>
      <p id="demo"></p> */}