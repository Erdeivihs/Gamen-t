import { getFiltro, getFileRequest, addGame, getButtonValue, añadir } from "../services/http.js";

export { Details };

async function Details(params) {
    let access_token = localStorage.getItem("access_token");
    let game = await getFiltro('Games?id=eq.' + params, access_token);
    console.log(game);
  let divPrincipal = document.querySelector("#contenido");

  divPrincipal.innerHTML = `
  <link rel="stylesheet" type="text/css" href="./assets/css/details.css"> 
  <div class="container">
	<!-- code here -->
	<div class="card">
		<div class="card-image" id="card-image">	
			<h2 class="card-heading">
				${game[0].title}
				
			</h2>
		</div>
		<div class="card-form">
			<div class="input">
				<input type="text" id="hours" class="input-field" required/>
				<label class="input-label">Hours</label>
			</div>
						<div class="input">
				<input type="text" id="rank" class="input-field" required/>
				<label class="input-label">Rank</label>
			</div>
            <br>
            <div class="select">
            <select id="stat" class="select-field" required>
              <option value="" selected disabled></option>
              <!-- Opciones del select -->
              <option value="Played">Played</option>
              <option value="Plan to play">Plan to play</option>
              <option value="Completed">Completed</option>
            </select>
            <label class="select-label">Select</label>
          </div>
          
			<div class="action">
				<button id="edit" class="action-button">Edit</button>
			</div>
		
	</div>
</div>

  `;

  let element = document.getElementById("card-image");
    element.style.backgroundImage = `url("${game[0].thumbnail}")`;

    divPrincipal.querySelector("#edit").addEventListener("click", async function () {
        let filtro = await getFiltro('User_games?id_games=eq.' + game[0].id + "&id_profiles=eq."+ localStorage.getItem("id"), access_token);
        console.log(filtro);
            let hours = document.querySelector("#hours").value;
		    let rank = document.querySelector("#rank").value;
            let stat = document.querySelector("#stat").value;
        let update = await  añadir("User_games?id=eq."+filtro[0].id,[{"hores": hours , "nota": rank, "estat": stat}]).then(a=>{console.log(a);}); 
        console.log(update);
        window.location.hash = "#/perfil";
    });
    
  
  }

  