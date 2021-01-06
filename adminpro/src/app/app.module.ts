import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

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
import { TokenInterceptorService } from "./interceptors/token-interceptor.service";

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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
