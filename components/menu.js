import { logout } from "../services/users.js";

export { Menu };

class Menu {
  constructor() {}

  rendermenu() {
    let div = document.querySelector("#principal");
    div.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#/menu">Gamen't</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#/games(Shooter)">Shooter</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#/games(ARPG)">ARPG</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#/games(Strategy)">Strategy</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#/games(MMORPG)">MMORPG</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#/games(Fighting)">Fighting</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#/games(Battle Royale)">Battle Royale</a>
          </li>
          <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#/games(MOBA)">MOBA</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#/games(Card Game)">Card Game</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#/games(Sports)">Sports</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#/games(MMO)">MMO</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#/games(Racing)">Racing</a>
          </li>
          <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#/games(Fantasy)">Fantasy</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#/games(Social)">Social</a>
          </li>        
        </ul>
          <a href="#/perfil" class="btn btn-outline-danger" type="button">Perfil</a>
          <button id="logout" class="btn btn-outline-danger" type="button">LogOut</button>
      </div>
    </div>
  </nav>

  <div id="contenido"></div>
    `;

        document.querySelector("#logout").addEventListener("click", logout);
  }
}