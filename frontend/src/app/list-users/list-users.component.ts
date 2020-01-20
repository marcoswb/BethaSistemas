import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { BsModalRef } from 'ngx-bootstrap/modal'

import { ApiService } from '../api.service'
import { User } from 'src/models/user'
import { AlertModalService } from '../shared/alert-modal.service'


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
  addressJson: string[] = []
  telephoneJson: string[] = []

  listAddress: any[] = []
  listTelephone: any[] = []

  id: string = ''

  bsModalRef: BsModalRef

  ngOnInit() {

    this.onLoadAllUsers()
  }

  onLoadAllUsers() {
    this.service.getAllUsers().subscribe(
      (response) => {
        this.convertFields(response)
      },
      error => {
        this.handleMessageDanger('Erro ao listar alunos!')
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
    if(this.id.length != 0) {
      this.service.getUserById(this.id).subscribe(
        (response) => {
          if(response != undefined) {
            this.router.navigate(['edit-user', response.id])
          }
        },
        error => {
          this.handleMessageDanger('Usuário não existe')
        }
      )
    } else {
      this.handleMessageWarning('Digite um ID para pesquisa!');
    }
  }

  onRemoveUser(id) {
    this.service.deleteUser(id).subscribe(
      success => {
        this.handleMessageSuccess('Usuário apagado com sucesso!')
        this.onLoadAllUsers()
      },
      error => {
        this.handleMessageDanger('Erro ao apagar Usuário!')
      }
    )
  }

  onKeyPress(event) {
    this.id = event.target.value
  }

  handleMessageDanger(message) {
    this.alertService.showAlertDanger(message)
  }

  handleMessageWarning(message) {
    this.alertService.showAlertWarning(message)
  }

  handleMessageSuccess(message) {
    this.alertService.showAlertSuccess(message)
  }
}
