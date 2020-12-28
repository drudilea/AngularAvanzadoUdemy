import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { PipesModule } from "../pipes/pipes.module";

import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";

@NgModule({
  imports: [RouterModule, CommonModule, PipesModule, FormsModule],
  declarations: [HeaderComponent, SidebarComponent, BreadcrumbsComponent],
  exports: [HeaderComponent, SidebarComponent, BreadcrumbsComponent],
})
export class SharedModule {}
