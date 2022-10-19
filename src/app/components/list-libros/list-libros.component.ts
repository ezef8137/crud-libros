import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-list-libros',
  templateUrl: './list-libros.component.html',
  styleUrls: ['./list-libros.component.css']
})
export class ListLibrosComponent implements OnInit {
  libros: any[] = [];

  constructor(private _libroService:LibroService,
                private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getLibros()
  }

  getLibros() {
    this._libroService.getLibros().subscribe(data => {
      this.libros = [];
      console.log(this.libros)
      data.forEach((element: any) => {
        console.log(element )
        this.libros.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.libros);
    });
  }

  eliminarLibro(id: string) {
    this._libroService.eliminarLibro(id).then(() => {
      this.toastr.error('El libro fue eliminado con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })
  }

}
