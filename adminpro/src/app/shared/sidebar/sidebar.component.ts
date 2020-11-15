import { Component } from "@angular/core";
import { SidebarService, UsuarioService } from "../../services/service.index";
import { Usuario } from "src/app/models/usuario.model";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: [],
})
export class SidebarComponent {
  public usuario: Usuario;

  constructor(
    public sideBarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
  }
}
