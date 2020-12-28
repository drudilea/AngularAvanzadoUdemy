import { Injectable, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import Swal from "sweetalert2";

import { environment } from "src/environments/environment";

import { RegisterForm } from "src/app/interfaces/register-form.interface";
import { LoginForm } from "src/app/interfaces/login-form.interface";
import { CargarUsuario } from "src/app/interfaces/cargar-usuarios.interface";

import { Usuario } from "src/app/models/usuario.model";

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem("token") || "";
  }

  get role(): "ADMIN_ROLE" | "USER_ROLE" {
    return this.usuario.role;
  }

  get uid(): string {
    return this.usuario.uid || "";
  }

  get headers() {
    return {
      headers: {
        "x-token": this.token,
      },
    };
  }

  private guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem("token", token);
    localStorage.setItem("menu", JSON.stringify(menu));
  }

  googleInit() {
    return new Promise((resolve) => {
      gapi.load("auth2", () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id:
            "92260652024-j99d87g8kqo7mp63nme3bcnfphji2kas.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin",
        });
        resolve(this.auth2);
      });
    });
  }

  verificarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, this.headers).pipe(
      map((resp: any) => {
        const { email, google, img = "", nombre, role, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, uid, "", img, role, google);
        this.guardarLocalStorage(resp.token, resp.menu);
        return true;
      }),
      // Devuelvo un Observable con el valor de false
      // en caso de que no pueda autenticar
      catchError((error) => of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
        return resp;
      }),
      catchError((err) =>
        of(Swal.fire("Error en registro", err.error.mensaje, "error"))
      )
    );
  }

  updateProfile(data: { email: string; nombre: string; role: string }) {
    data = {
      ...data,
      role: this.usuario.role,
    };

    return this.http.put(
      `${base_url}/usuarios/${this.uid}`,
      data,
      this.headers
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("menu");
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl("/login");
      });
    });
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;

    return this.http.get<CargarUsuario>(url, this.headers).pipe(
      map((resp) => {
        const usuarios = resp.usuarios.map(
          (user) =>
            new Usuario(
              user.nombre,
              user.email,
              user.uid,
              "",
              user.img,
              user.role,
              user.google
            )
        );
        return { total: resp.total, usuarios };
      })
    );
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`;

    return this.http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put(
      `${base_url}/usuarios/${usuario.uid}`,
      usuario,
      this.headers
    );
  }
}
