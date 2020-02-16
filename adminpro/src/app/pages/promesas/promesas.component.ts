import { Component, OnInit } from "@angular/core";
import { resolve } from "url";

@Component({
  selector: "app-promesas",
  templateUrl: "./promesas.component.html",
  styles: []
})
export class PromesasComponent implements OnInit {
  constructor() {
    this.contarTres()
      .then(msj => console.log("Termino!", msj))
      .catch(
        // El mensaje dentro de la llamada a reject("...") lo recibo como la variable error
        error => console.error("Error en la promesa")
      );
  }

  ngOnInit() {}

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }
}
