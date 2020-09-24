import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

// Modulos
import { SharedModule } from "../shared/shared.module";
import { ChartsModule } from "ng2-charts";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";

// Rutas
import { PagesRoutingModule } from "./pages.routing";

import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { GraficaDonaComponent } from "../components/grafica-dona/grafica-dona.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
// Temporal

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent,
    GraficaDonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
  ],
  exports: [DashboardComponent, ProgressComponent, Graficas1Component],
  imports: [SharedModule, PagesRoutingModule, FormsModule, ChartsModule],
})
export class PagesModule {}
