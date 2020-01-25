import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { ApiService } from '../api.service'
import { User } from 'src/models/user'
import { AlertModalService } from '../shared/alert-modal/alert-modal.service'


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})

export class ListUsersComponent implements OnInit {

  constructor(
    private service: ApiService,
    private router: Router,
    private alertService: AlertModalService
  ) { }

  users: User[] = []
  find_id: string = ''

  ngOnInit() {

    this.onLoadAllUsers()
  }

  onLoadAllUsers() {
    this.service.getAllUsers().subscribe(
      (response) => {
        this.convertFields(response)
      },
      error => {
        if(error.status == 404) {
          this.showMessageWarning('Nenhum usuário cadastrado no sistema!')
        } else {
          this.showMessageDanger('Erro ao listar alunos!')
        }
      }
    )
  }

  convertFields(users) {
    users.map(user => {
      user.address = JSON.parse(user.address)
      user.telephone = JSON.parse(user.telephone)
    })
    this.users = users
  }

  onFindUserById() {
    if(this.find_id.length != 0) {
      this.service.getUserById(this.find_id).subscribe(
        (response) => {
          this.router.navigate(['edit-user', response.id])
        },
        error => {
          if(error.status == 404) {
            this.showMessageWarning('Usuário não existe no sistema!')
          } else {
            this.showMessageDanger('Erro ao buscar usuário!')
          }
        }
      )
    } else {
      this.showMessageWarning('Digite um ID para pesquisa!');
    }
  }

  onUpdateUser(id) {
    this.router.navigate(['/edit-user/', id])
  }

  onRemoveUser(id) {
    this.service.deleteUser(id).subscribe(
      success => {
        this.showMessageSuccess('Usuário apagado com sucesso!')
        window.location.reload()
      },
      error => {
        if(error.status == 404) {
          this.showMessageWarning('Usuário não existe no sistema!')
        } else {
          this.showMessageDanger('Erro ao apagar usuário!')
        }
      }
    )
  }

  onKeyPress(event) {
    this.find_id = event.target.value
  }

  showMessageDanger(message) {
    this.alertService.showAlertDanger(message)
  }

  showMessageWarning(message) {
    this.alertService.showAlertWarning(message)
  }

  showMessageSuccess(message) {
    this.alertService.showAlertSuccess(message)
  }
}
