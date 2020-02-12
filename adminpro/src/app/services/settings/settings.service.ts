import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: "assets/css/colors/default.css",
    tema: "default"
  };

  constructor(@Inject(DOCUMENT) private document) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    // Para que funcione debo inicializarla en el constructor, e
    // inyetarla en el app.component.ts
    if (localStorage.getItem("ajustes")) {
      this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
    }
    // Si no hay nada en localStorage, carga el tema por defecto
    this.aplicartema(this.ajustes.tema);
  }

  aplicartema(tema: string) {
    const url = `assets/css/colors/${tema}.css`;
    this.document.getElementById("theme").setAttribute("href", url);
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }
}
interface Ajustes {
  temaUrl: string;
  tema: string;
}
