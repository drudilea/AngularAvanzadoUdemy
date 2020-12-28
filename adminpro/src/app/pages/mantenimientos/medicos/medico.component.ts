import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { delay } from "rxjs/operators";
import Swal from "sweetalert2";

import { Hospital } from "src/app/models/hospital.model";
import { Medico } from "src/app/models/medico.model";

import { HospitalService } from "src/app/services/hospital.service";
import { MedicoService } from "src/app/services/medico.service";
import { ModalImagenService } from "src/app/services/modal-imagen.service";

@Component({
  selector: "app-medico",
  templateUrl: "./medico.component.html",
  styles: [],
})
export class MedicoComponent implements OnInit, OnDestroy {
  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado: Medico;
  public hospitalSeleccionado: Hospital;

  private imgSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre: ["", Validators.required],
      hospital: ["", Validators.required],
    });

    this.cargarHospitales();

    this.medicoForm
      .get("hospital")
      .valueChanges.subscribe((hospitalId: string) => {
        this.hospitalSeleccionado = this.hospitales.find(
          (hospital) => hospital._id === hospitalId
        );
      });

    this.activatedRoute.params.subscribe(({ id }) => this.cargarMedico(id));

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(500))
      .subscribe((img) => {
        // Recargo la imagen cuando es cambiada
        this.cargarMedico(this.medicoSeleccionado._id);
      });
  }

  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }

  private cargarMedico(id: string) {
    if (id === "nuevo" || !id) {
      return;
    }

    this.medicoService
      .getMedicoById(id)
      .pipe(delay(100))
      .subscribe((medico) => {
        if (!medico) {
          return this.router.navigateByUrl("/dashboard/medicos");
        }

        const {
          nombre,
          hospital: { _id },
        } = medico;

        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
      });
  }

  private cargarHospitales() {
    this.hospitalService
      .cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      // Actualizar

      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id,
      };
      this.medicoService.actualizarMedico(data).subscribe((resp: any) => {
        Swal.fire(
          "Actualizado",
          `El médico ${nombre} ha sido actualizado con éxito`,
          "success"
        );
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
      });
    } else {
      // Crear

      this.medicoService
        .crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire(
            "Creado",
            `El médico ${nombre} ha sido creado con éxito`,
            "success"
          );
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        });
    }
  }

  openImageModal(medico: Medico) {
    this.modalImagenService.abrirModal("medicos", medico._id, medico.img);
  }
}
