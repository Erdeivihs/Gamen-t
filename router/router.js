export { router };
import { Login } from "../components/login.js";
import { Registre } from "../components/registre.js";

const router = (route) => {
  console.log(route);
  
    switch (route) {
      case "#/menu":
        let M = new Menu();
        M.rendermenu();
        break;
      case "#/login":
        console.log("login");
        let login = new Login();
        login.renderLogin();
        break;
      case "#/registre":
        let regsitro = new Registre();
        regsitro.renderRegistre();
        break;
      case "#/shooter":
        shootergame();
        break;
      case "#/plataformeo":
          plataformeogame();
          break;
      case "#/deportes":
        deportesgame();
          break;
      case "#/carreras":
          carrerasgame();
          break;

    }
  
};