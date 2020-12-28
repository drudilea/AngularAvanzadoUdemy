import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../guards/auth.guard";
import { AdminGuard } from "../guards/admin.guard";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { BusquedaComponent } from "./busqueda/busqueda.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

// Mantenimientos
import { HospitalesComponent } from "./mantenimientos/hospitales/hospitales.component";
import { MedicosComponent } from "./mantenimientos/medicos/medicos.component";
import { MedicoComponent } from "./mantenimientos/medicos/medico.component";
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
        path: "account-settings",
        component: AccountSettingsComponent,
        data: { titulo: "Ajustes del tema" },
      },
      {
        path: "buscar/:termino",
        component: BusquedaComponent,
        data: { titulo: "Búsquedas" },
      },
      {
        path: "graficas1",
        component: Graficas1Component,
        data: { titulo: "Graficas" },
      },
      {
        path: "perfil",
        component: PerfilComponent,
        data: { titulo: "Perfil de usuario" },
      },
      {
        path: "progress",
        component: ProgressComponent,
        data: { titulo: "Progress" },
      },
      {
        path: "promesas",
        component: PromesasComponent,
        data: { titulo: "Promesas" },
      },
      { path: "rxjs", component: RxjsComponent, data: { titulo: "RxJs" } },

      // Rutas ADMIN
      // Mantenimientos
      {
        path: "hospitales",
        canActivate: [AdminGuard],
        component: HospitalesComponent,
        data: { titulo: "Mantenimiento de Hospitales" },
      },
      {
        path: "medicos",
        canActivate: [AdminGuard],
        component: MedicosComponent,
        data: { titulo: "Mantenimiento de Médicos" },
      },
      {
        path: "medico/:id",
        canActivate: [AdminGuard],
        component: MedicoComponent,
        data: { titulo: "Mantenimiento de Médicos" },
      },
      {
        path: "usuarios",
        canActivate: [AdminGuard],
        component: UsuariosComponent,
        data: { titulo: "Mantenimiento de Usuarios" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
