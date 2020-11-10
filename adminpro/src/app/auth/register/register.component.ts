import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";

import { UsuarioService } from "src/app/services/service.index";

declare function init_plugins();

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      nombre: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      password2: ["", [Validators.required]],
      terminos: [false, [Validators.requiredTrue]],
    },
    {
      validators: this.camposDiferentesValidator("password", "password2"),
    }
  );

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    init_plugins();
  }

  crearUsuario() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) return;

    // Crear el usuario
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
      (res) => {
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

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) return true;
    else return false;
  }

  checkboxNoValido(campo: string): boolean {
    return !this.registerForm.get(campo).value && this.formSubmitted;
  }

  camposDiferentes(campo1: string, campo2: string): boolean {
    return (
      this.registerForm.get(campo1).value !==
        this.registerForm.get(campo2).value && this.formSubmitted
    );
  }

  camposDiferentesValidator(campo1: string, campo2: string) {
    return (formGroup: FormGroup) => {
      const campo1Control = formGroup.get(campo1);
      const campo2Control = formGroup.get(campo2);

      if (campo1Control.value === campo2Control.value) {
        campo2Control.setErrors(null);
      } else {
        campo2Control.setErrors({ esDiferente: true });
      }
    };
  }
}
