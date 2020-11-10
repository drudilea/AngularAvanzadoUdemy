import { Component } from "@angular/core";
import { SidebarService, UsuarioService } from "../../services/service.index";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: [],
})
export class SidebarComponent {
  constructor(
    public sideBarService: SidebarService,
    private usuarioService: UsuarioService
  ) {}

  logout() {
    this.usuarioService.logout();
  }
}
