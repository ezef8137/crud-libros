import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-create-libro',
  templateUrl: './create-libro.component.html',
  styleUrls: ['./create-libro.component.css']
})
export class CreateLibroComponent implements OnInit {
  createLibro: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Nuevo Libro';

  constructor(private fb:FormBuilder,
    private _libroService: LibroService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.createLibro = this.fb.group({
      nombre: ['', Validators.required],
      autor: ['', Validators.required],
      edicion: ['', Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarLibro() {
    this.submitted = true;

    if (this.createLibro.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarLibro();
    } else {
      this.editarLibro(this.id);
    }

  }

  agregarLibro() {
    const libro: any = {
      nombre: this.createLibro.value.nombre,
      autor: this.createLibro.value.autor,
      edicion: this.createLibro.value.edicion,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._libroService.agregarLibro(libro).then(() => {
      this.toastr.success('El libro fue registrado con exito!', 'Empleado Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/list-libros']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  editarLibro(id: string) {

    const libro: any = {
      nombre: this.createLibro.value.nombre,
      autor: this.createLibro.value.autor,
      edicion: this.createLibro.value.edicion,     
      fechaActualizacion: new Date()
    }

    this.loading = true;

    this._libroService.actualizarLibro(id, libro).then(() => {
      this.loading = false;
      this.toastr.info('El empleado fue modificado con exito', 'Empleado modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-libros']);
    })
  }


  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Libro'
      this.loading = true;
      this._libroService.getLibro(this.id).subscribe(data => {
        this.loading = false;
        this.createLibro.setValue({
          nombre: data.payload.data()['nombre'],
          autor: data.payload.data()['autor'],
          edicion: data.payload.data()['edicion'],
        })
      })
    }
  }

}
