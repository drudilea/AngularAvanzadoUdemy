import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { delay } from "rxjs/operators";
import Swal from "sweetalert2";

import { Medico } from "src/app/models/medico.model";
import { BusquedasService } from "src/app/services/busquedas.service";
import { MedicoService } from "src/app/services/medico.service";
import { ModalImagenService } from "src/app/services/modal-imagen.service";

@Component({
  selector: "app-medicos",
  templateUrl: "./medicos.component.html",
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando: boolean = true;

  private imgSubs: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(500))
      .subscribe((img) => {
        // Recargo la imagen cuando es cambiada
        this.cargarMedicos();
      });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  buscarMedico(termino: string) {
    if (termino.length === 0) {
      return (this.medicos = this.medicosTemp);
    }
    this.busquedasService
      .buscar("medicos", termino)
      .subscribe((resultados: Medico[]) => {
        this.medicos = resultados;
      });
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((medicos) => {
      this.cargando = false;
      this.medicos = medicos;
      this.medicosTemp = medicos;
    });
  }

  openImageModal(medico: Medico) {
    this.modalImagenService.abrirModal("medicos", medico._id, medico.img);
  }

  eliminarMedico(medico: Medico) {
    Swal.fire({
      title: "¿Eliminar médico?",
      text: `Está por borrar a ${medico.nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(medico._id).subscribe((resp) => {
          Swal.fire({
            title: "Médico eliminado!",
            text: `${medico.nombre} fue eliminado correctamente`,
            icon: "success",
          });
          this.cargarMedicos();
        });
      }
    });
  }
}
