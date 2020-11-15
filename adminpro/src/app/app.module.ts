import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

// Modulos
import { PagesModule } from "./pages/pages.module";
import { AuthModule } from "./auth/auth.module";
import { SharedModule } from "./shared/shared.module";

// Rutas
import { AppRoutingModule } from "./app-routing.module";

// Componentes
import { AppComponent } from "./app.component";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";

// Servicios
import { ServiceModule } from "./services/service.module";

// Temporal

@NgModule({
  declarations: [AppComponent, NopagefoundComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    FormsModule,
    ServiceModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
