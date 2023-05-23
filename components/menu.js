import { logout } from "../services/users.js";

export { Menu };

class Menu {
  constructor() {}

  rendermenu() {
    let div = document.querySelector("#principal");
    div.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#/games">Games</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Enlace</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Acción</a></li>
              <li><a class="dropdown-item" href="#">Otra acción</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Algo más aquí</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Deshabilitado</a>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar">
          <button id="logout" class="btn btn-outline-danger" type="button">LogOut</button>
        </form>
      </div>
    </div>
  </nav>

  <div id="contenido"></div>
    `;

        document.querySelector("#logout").addEventListener("click", logout);
  }
}