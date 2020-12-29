import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { UsuarioService } from "../services/service.index";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.usuarioService.verificarToken().pipe(
      tap((estaAutenticado) => {
        if (!estaAutenticado) this.router.navigateByUrl("login");
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.usuarioService.verificarToken().pipe(
      tap((estaAutenticado) => {
        if (!estaAutenticado) this.router.navigateByUrl("login");
      })
    );
  }
}
