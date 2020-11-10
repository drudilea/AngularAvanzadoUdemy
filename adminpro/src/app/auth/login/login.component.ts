import { Component, NgZone, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

import { UsuarioService } from "src/app/services/service.index";

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem("email") || "",
      [Validators.required, Validators.email],
    ],
    password: ["", [Validators.required]],
    rememberMe: [localStorage.getItem("rememberMe") || false],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    init_plugins();
    this.renderButton();
  }

  login() {
    this.formSubmitted = true;

    if (this.loginForm.invalid) return;

    // Autenticar el usuario
    this.usuarioService.login(this.loginForm.value).subscribe(
      (res) => {
        if (this.loginForm.get("rememberMe").value) {
          localStorage.setItem("email", this.loginForm.get("email").value);
          localStorage.setItem(
            "rememberMe",
            this.loginForm.get("rememberMe").value
          );
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("rememberMe");
        }

        // Navegar al dashboard
        this.router.navigateByUrl("/");
      },
      (error) => {
        // Si sucede un error
        console.error(error);
        Swal.fire("Error", error.error.mensaje, "error");
      }
    );
  }

  renderButton() {
    gapi.signin2.render("my-signin2", {
      scope: "profile email",
      width: 240,
      height: 50,
      longtitle: true,
      theme: "dark",
    });

    this.startApp();
  }

  async startApp() {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById("my-signin2"));
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle(id_token).subscribe(() => {
          // Navegar al dashboard
          this.ngZone.run(() => {
            this.router.navigateByUrl("/");
          });
        });
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
