import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

// Modulos
import { PagesModule } from "./pages/pages.module";
import { AuthModule } from "./auth/auth.module";

// Rutas
import { AppRoutingModule } from "./app-routing.module";
import { AuthRoutingModule } from "./auth/auth.routing";

// Componentes
import { AppComponent } from "./app.component";

// Servicios
import { ServiceModule } from "./services/service.module";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";

// Temporal

@NgModule({
  declarations: [AppComponent, NopagefoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    FormsModule,
    ServiceModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
