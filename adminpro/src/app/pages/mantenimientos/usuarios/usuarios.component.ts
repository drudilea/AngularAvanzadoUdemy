import { Component, OnDestroy, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Subscription } from "rxjs";
import { delay } from "rxjs/operators";

import { Usuario } from "src/app/models/usuario.model";
import { BusquedasService } from "src/app/services/busquedas.service";
import { ModalImagenService } from "src/app/services/modal-imagen.service";
import { UsuarioService } from "src/app/services/service.index";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;
  public desde: number = 0;
  public loading: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(500))
      .subscribe((img) => {
        // Recargo la imagen cuando es cambiada
        this.cargarUsuarios();
      });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarUsuarios() {
    this.loading = true;
    this.usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.loading = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length === 0) {
      return (this.usuarios = this.usuariosTemp);
    }
    this.busquedasService
      .buscar("usuarios", termino)
      .subscribe((resultados: Usuario[]) => {
        this.usuarios = resultados;
      });
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.uid)
      return Swal.fire("Error", "No puede eliminarse a si mismo", "error");

    Swal.fire({
      title: "¿Eliminar usuario?",
      text: `Está por borrar a ${usuario.nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe((resp) => {
          Swal.fire({
            title: "Usuario eliminado!",
            text: `${usuario.nombre} fue eliminado correctamente`,
            icon: "success",
          });
          this.cargarUsuarios();
        });
      }
    });
  }

  cambiarRol(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario).subscribe((resp) => {
      console.log("RESPONSE", resp);
    });
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal("usuarios", usuario.uid, usuario.img);
  }
}
