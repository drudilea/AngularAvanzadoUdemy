import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

// Modulos
import { SharedModule } from "../shared/shared.module";
import { ComponentsModule } from "../components/components.module";

// Componentes
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

// Rutas
import { PagesRoutingModule } from "./pages.routing";

// Temporal

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
  ],
  exports: [DashboardComponent, ProgressComponent, Graficas1Component],
  imports: [SharedModule, PagesRoutingModule, FormsModule, ComponentsModule],
})
export class PagesModule {}
