let access_token = ";"

import { loginUser } from "../services/users.js";

export { Login }

class Login {

	constructor() { }

	renderLogin() {
		let div = document.querySelector("#principal");
		div.innerHTML = `
			
			<div class="login">
            <h1>Login</h1>
            <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" id="password" name="password" class="form-control" id="exampleInputPassword1">
            </div>
            <button type="button" id="login" class="btn btn-primary">Submit</button>
          </form>
				
			</div>`
	
		;

		//LOGIN SUPABASE

		document.querySelector("#login").addEventListener("click", async ()=>{
				let email = document.querySelector("#email").value;
				let password = document.querySelector("#password").value;

				loginUser(email,password).then(status =>{
					if (status.success) window.location.hash = '#/menu';
                    
					 else {
						divLogin.querySelector('#errors').innerHTML = status.errorText;
					}
				})
			
		});

	}

	

}