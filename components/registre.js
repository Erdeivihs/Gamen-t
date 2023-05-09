let access_token = ";"

import { registerUser } from "../services/users.js";

export { Registre }

class Registre {

	constructor() { }

	renderRegistre() {
		let div = document.querySelector("#principal");
		div.innerHTML = `
			
			<div class="registre">
            <h1>Registro</h1>
            <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email</label>
              <input type="email" class="form-control" id="signupemail" name="signupemail" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" id="signuppassword" name="signuppassword" class="form-control" id="exampleInputPassword1">
            </div>
            <button type="button" id="registrar" class="btn btn-primary">Submit</button>
          </form>
				
			</div>`
	
		;

		//REGISTRE SUPABASE

		document.querySelector("#registrar").addEventListener("click", async ()=>{
			
            let email = document.querySelector('#signupemail').value;
            let password = document.querySelector('#signuppassword').value;
            let dataLogin = registerUser(email, password);
            console.log(dataLogin);
            window.location.hash = '#/login';
    });

	}

	

}