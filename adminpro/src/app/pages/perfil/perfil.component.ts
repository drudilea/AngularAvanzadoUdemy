import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";

import { Usuario } from "src/app/models/usuario.model";

import {
  UploadFilesService,
  UsuarioService,
} from "src/app/services/service.index";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styles: [],
})
export class PerfilComponent implements OnInit {
  public profileForm: FormGroup;
  public usuario: Usuario;
  public imageToUpload: File;
  public imageTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private uploadFileService: UploadFilesService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile() {
    this.usuarioService.updateProfile(this.profileForm.value).subscribe(
      () => {
        const { nombre, email } = this.profileForm.value;
        this.usuario.email = email;
        this.usuario.nombre = nombre;
        Swal.fire(
          "Listo",
          "El usuario fue modificado correctamente",
          "success"
        );
      },
      (error) => {
        console.log("Error", error);
        Swal.fire("Error", error.error.mensaje, "error");
      }
    );
  }

  changeImage(file: File) {
    this.imageToUpload = file;

    if (!file) return (this.imageTemp = null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imageTemp = reader.result;
    };
  }

  uploadImage() {
    this.uploadFileService
      .updatePhoto(this.imageToUpload, "usuarios", this.usuario.uid)
      .then((image) => {
        this.usuario.img = image;
        Swal.fire("Listo", "La imagen se actualizó correctamente", "success");
      })
      .catch((error) => {
        console.log("Error", error);
        Swal.fire("Error", "Hubo un problema al actualizar la imagen", "error");
      });
  }
}
