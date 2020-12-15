import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { AuthGuard } from "../guards/auth.guard";
import { PerfilComponent } from "./perfil/perfil.component";

// Mantenimientos
import { UsuariosComponent } from "./mantenimientos/usuarios/usuarios.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: DashboardComponent,
        data: { titulo: "Dashboard" },
      },
      {
        path: "progress",
        component: ProgressComponent,
        data: { titulo: "Progress" },
      },
      {
        path: "graficas1",
        component: Graficas1Component,
        data: { titulo: "Graficas" },
      },
      {
        path: "promesas",
        component: PromesasComponent,
        data: { titulo: "Promesas" },
      },
      {
        path: "perfil",
        component: PerfilComponent,
        data: { titulo: "Perfil de usuario" },
      },
      { path: "rxjs", component: RxjsComponent, data: { titulo: "RxJs" } },
      {
        path: "account-settings",
        component: AccountSettingsComponent,
        data: { titulo: "Ajustes del tema" },
      },

      // Mantenimientos
      {
        path: "usuarios",
        component: UsuariosComponent,
        data: { titulo: "Usuarios de la aplicación" },
      },
      // {
      //   path: "medicos",
      //   component: MedicosComponent,
      //   data: { titulo: "Médicos de la aplicación" },
      // },
      // {
      //   path: "hospitales",
      //   component: HospitalesComponent,
      //   data: { titulo: "Hospitales de la aplicación" },
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
