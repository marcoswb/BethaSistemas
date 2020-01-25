import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AddUserComponent } from './add-user/add-user.component'
import { EditUserComponent } from './edit-user/edit-user.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: 'add-user',
    component: AddUserComponent,
    data: { title: 'Adicionar usuário' }
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    data: { title: 'Editar usuário' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home page' }
  },
  {
    path: '',
    component: LoginComponent,
    data: { title: 'Login Usuário' }
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
