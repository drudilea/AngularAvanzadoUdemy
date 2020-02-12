import { Component, OnInit, Inject } from "@angular/core";
import { SettingsService } from "../../services/service.index";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  constructor(public ajustesService: SettingsService) {}

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {
    this.aplicarCheck(link);
    this.ajustesService.aplicartema(tema);
  }

  aplicarCheck(link: any) {
    // Uso vanilla javascript
    const selectores: any = document.getElementsByClassName("selector");
    for (const element of selectores) {
      // Elimino la clase working de todos los links
      element.classList.remove("working");
    }
    // Le agrego la clase working al seleccionado
    link.classList.add("working");
  }

  colocarCheck() {
    // Uso vanilla javascript
    const selectores: any = document.getElementsByClassName("selector");
    const tema = this.ajustesService.ajustes.tema;
    for (const element of selectores) {
      if (element.getAttribute("data-theme") === tema) {
        element.classList.add("working");
        break;
      }
    }
  }
}
