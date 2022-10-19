import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private firestore: AngularFirestore) { }

  agregarLibro(empleado: any): Promise<any> {
    return this.firestore.collection('libros').add(empleado);
  }

  getLibros(): Observable<any> {
    return this.firestore.collection('libros', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarLibro(id: string): Promise<any> {
    return this.firestore.collection('libros').doc(id).delete();
  }

  getLibro(id: string): Observable<any> {
    return this.firestore.collection('libros').doc(id).snapshotChanges();
  }

  actualizarLibro(id: string, data:any): Promise<any> {
    return this.firestore.collection('libros').doc(id).update(data);
  }

}
