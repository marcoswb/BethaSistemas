import { Component, OnInit } from '@angular/core'

import { ApiService } from '../api.service'
import { User } from 'src/models/user'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(
    private service: ApiService,
    private router: Router
  ) { }

  users: User[] = []
  addressJson: string[] = []
  telephoneJson: string[] = []

  listAddress: any[] = []
  listTelephone: any[] = []

  id: string = ''

  ngOnInit() {
    
    this.onLoadAllUsers()
  }

  onLoadAllUsers() {
    this.service.getAllUsers().subscribe(
      (response) => {
        this.convertFields(response)
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
          alert('Usuário não existe!')
        }
      )
    } else {
      alert('Digite um ID para pesquisa!');
    }
  }

  onRemoveUser(id) {
    this.service.deleteUser(id).subscribe(
      success => {
        alert('Usuário apagado!')
        this.onLoadAllUsers()
      },
      error => {
        alert('Erro ao Apagar Usuário!')
      }
    )
  }

  onKeyPress(event) {
    this.id = event.target.value
  }
  
}
