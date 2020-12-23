import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { delay } from "rxjs/operators";
import Swal from "sweetalert2";

import { Hospital } from "src/app/models/hospital.model";
import { HospitalService } from "src/app/services/hospital.service";
import { ModalImagenService } from "src/app/services/modal-imagen.service";
import { BusquedasService } from "src/app/services/busquedas.service";

@Component({
  selector: "app-hospitales",
  templateUrl: "./hospitales.component.html",
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;

  private imgSubs: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(500))
      .subscribe((img) => {
        // Recargo la imagen cuando es cambiada
        this.cargarHospitales();
      });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  buscarHospital(termino: string) {
    if (termino.length === 0) {
      return (this.hospitales = this.hospitalesTemp);
    }
    this.busquedasService
      .buscar("hospitales", termino)
      .subscribe((resultados: Hospital[]) => {
        this.hospitales = resultados;
      });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.cargando = false;
      this.hospitales = hospitales;
      this.hospitalesTemp = hospitales;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService
      .actualizarHospital(hospital._id, hospital.nombre)
      .subscribe((resp) => {
        Swal.fire(
          "Actualizado",
          `El nombre se cambió a <strong>${hospital.nombre}</strong>`,
          "success"
        );
      });
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.eliminarHospital(hospital._id).subscribe((resp) => {
      this.cargarHospitales();
      Swal.fire(
        "Eliminado",
        `${hospital.nombre} fue eliminado correctamente`,
        "success"
      );
    });
  }

  async openCreateHospitalModal() {
    const { value = "" } = await Swal.fire<string>({
      input: "text",
      title: "Crear hospital",
      inputLabel: "Ingrese el nombre del nuevo hospital",
      inputPlaceholder: "Nombre del hospital",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "El nombre no puede estar vacío";
        }
      },
    });

    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value).subscribe((resp: any) => {
        this.hospitales.push(resp.hospital);
        Swal.fire("Creado", `${value} ha sido creado con éxito`, "success");
      });
    }
  }

  openImageModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      "hospitales",
      hospital._id,
      hospital.img
    );
  }
}
