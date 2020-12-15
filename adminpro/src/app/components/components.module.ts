import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { PipesModule } from "../pipes/pipes.module";
import { GraficaDonaComponent } from "./grafica-dona/grafica-dona.component";
import { IncrementadorComponent } from "./incrementador/incrementador.component";
import { ModalImagenComponent } from "./modal-imagen/modal-imagen.component";

@NgModule({
  declarations: [
    GraficaDonaComponent,
    IncrementadorComponent,
    ModalImagenComponent,
  ],
  exports: [GraficaDonaComponent, IncrementadorComponent, ModalImagenComponent],
  imports: [CommonModule, FormsModule, ChartsModule, PipesModule],
})
export class ComponentsModule {}
