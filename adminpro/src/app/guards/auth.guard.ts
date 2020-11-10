import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { tap } from "rxjs/operators";
import { UsuarioService } from "../services/service.index";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.usuarioService.verificarToken().pipe(
      tap((estaAutenticado) => {
        if (!estaAutenticado) this.router.navigateByUrl("login");
      })
    );
  }
}
