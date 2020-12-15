import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

import { ModalImagenService } from "src/app/services/modal-imagen.service";
import { UploadFilesService } from "src/app/services/service.index";

@Component({
  selector: "app-modal-imagen",
  templateUrl: "./modal-imagen.component.html",
  styles: [],
})
export class ModalImagenComponent implements OnInit {
  public imageToUpload: File;
  public imageTemp: any = null;

  constructor(
    public modalImagenService: ModalImagenService,
    private uploadFileService: UploadFilesService
  ) {}

  ngOnInit(): void {}

  cerrarModal() {
    this.imageTemp = null;
    this.modalImagenService.cerrarModal();
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
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.uploadFileService
      .updatePhoto(this.imageToUpload, tipo, id)
      .then((img) => {
        Swal.fire("Listo", "La imagen se actualizó correctamente", "success");
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      })
      .catch((error) => {
        console.log("Error", error);
        Swal.fire("Error", "Hubo un problema al actualizar la imagen", "error");
      });
  }
}
