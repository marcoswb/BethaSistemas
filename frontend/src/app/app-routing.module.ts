import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: 'add-user',
    component: AddUserComponent,
    data: { title: 'Adicionar usuário' }
  },
  {
    path: 'edit-user',
    component: EditUserComponent,
    data: { title: 'Editar usuário' }
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
