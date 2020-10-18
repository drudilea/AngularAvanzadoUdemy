import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { GraficaDonaComponent } from "./grafica-dona/grafica-dona.component";
import { IncrementadorComponent } from "./incrementador/incrementador.component";

@NgModule({
  declarations: [GraficaDonaComponent, IncrementadorComponent],
  exports: [GraficaDonaComponent, IncrementadorComponent],
  imports: [CommonModule, FormsModule, ChartsModule],
})
export class ComponentsModule {}
