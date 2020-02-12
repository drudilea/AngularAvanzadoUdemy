import { Component, OnInit, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document) {}

  ngOnInit() {}

  cambiarColor(tema: string, link: any) {
    const url = `assets/css/colors/${tema}.css`;
    this.document.getElementById("theme").setAttribute("href", url);
    this.aplicarCheck(link);
  }

  aplicarCheck(link: any) {
    // Uso vanilla javascript
    const selectores: any = document.getElementsByClassName("selector");
    selectores.forEach(element => {
      // Elimino la clase working de todos los links
      element.classList.remove("working");
    });
    // Le agrego la clase working al seleccionado
    link.classList.add("working");
  }
}
