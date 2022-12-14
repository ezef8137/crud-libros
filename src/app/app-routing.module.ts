import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateLibroComponent } from './components/create-libro/create-libro.component';
import { ListLibrosComponent } from './components/list-libros/list-libros.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-libros', pathMatch: 'full' },
  { path: 'list-libros', component: ListLibrosComponent },
  { path: 'create-libro', component: CreateLibroComponent },
  { path: 'editLibro/:id', component: CreateLibroComponent },
  { path: '**', redirectTo: 'list-libros', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
