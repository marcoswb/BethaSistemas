import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { User } from 'src/models/user'
import { Address } from 'src/models/address'
import { ApiService } from '../api.service'
import { AlertModalService } from '../shared/alert-modal/alert-modal.service'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  form: FormGroup
  form_title: string = "Cadastrar Usuário"
  form_address: string = "Endereço"

  user_id: number
  edit_user: boolean = false

  list_address: Address[] = []
  list_telephone: Array<String> = []
  index_select: number = -1

  constructor(
    private formBuilder: FormBuilder,
    private service: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertModalService
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      cpf_cnpj: [null, Validators.required],
      address: [null, Validators.required],
      telephone: [null, Validators.required],
    })

    this.checkEditUser()
  }

  checkEditUser() {
    this.route.params.forEach((params: Params) => {
      this.user_id = params['id']
    })

    if(this.user_id != undefined) {
      this.form_title = "Atualizar Usuário"
      this.form_address = "Endereço principal escolhido anteriormente"
      this.edit_user = true
      this.getUserById(this.user_id)
    }
  }

  getUserById(id) {
    this.service.getUserById(id).subscribe(
      (response) => {
        this.populateForm(response)
      },
      error => {
        if(error.status == 404) {
          this.showMessageWarning('Usuário não existe no sistema!')
          this.router.navigate([''])
        } else {
          this.showMessageDanger('Erro ao buscar usuário!')
          this.router.navigate([''])
        }
      }
    )
  }

  populateForm(user) {
    let name_form = user.name
    let cpf_cnpj_form = null
    let address_form = null
    let telephone_form = null

    if(user.cpf != null) {
      cpf_cnpj_form = user.cpf
    } else if(user.cnpj != null) {
      cpf_cnpj_form = user.cnpj
    }

    this.list_address = JSON.parse(user.address)
    this.list_telephone = JSON.parse(user.telephone)

    this.list_address.map(address => {
      if(address.main = true) {
        this.index_select = address.id
        address_form = address.description
      }
    })

    this.form.patchValue({
      name: name_form,
      cpf_cnpj: cpf_cnpj_form,
      address: address_form,
      telephone: telephone_form
    })
  }

  onAddAddress() {
    let id = this.list_address.length

    const address = new Address(id, this.form.get('address').value, false)
    this.list_address.push(address)

    this.form.patchValue({
      address: ' '
    })
  }

  onAddressMain(event) {
    this.list_address.map((address, index) => {
      this.list_address[index].main = false
    })

    const select_option = event.target['options']
    this.index_select = select_option.selectedIndex
  }

  onAddTelephone() {
    this.list_telephone.push(this.form.get('telephone').value)
  }

  onSubmit(){
    let user = this.checkFields()

    if(this.edit_user == true) {
      this.service.updateUser(this.user_id, user).subscribe(
        success => {
          this.showMessageSuccess('Usuário atualizado com sucesso!')
          this.resetForm()
          this.router.navigate(['home'])
        },
        error => {
          if(error.status == 404) {
            this.showMessageWarning('Esse usuário já existe no sistema!')
          } else {
            this.showMessageDanger('Erro ao atualizar usuário!')
          }
        }
      )
    } else {
      this.service.createUser(user).subscribe(
        success => {
          this.showMessageSuccess('Usuário cadastrado com sucesso!')
          this.resetForm()
        },
        error => {
          if(error.status == 404) {
            this.showMessageWarning('Esse usuário já existe no sistema!')
          } else {
            this.showMessageDanger('Erro ao cadastrar usuário!')
          }
        }
      )
    }
  }

  checkFields() {
    let name = this.form.get('name').value
    let cpf = null
    let cnpj = null
    let address = null
    let telephone = null

    if(this.form.get('cpf_cnpj').value.length > 11) {
      cnpj = this.form.get('cpf_cnpj').value
    } else if(this.form.get('cpf_cnpj').value.length == 11) {
      cpf = this.form.get('cpf_cnpj').value
    }

    if(this.list_address.length < 1) {
      address = new Address(0, this.form.get('address').value, true)
      this.list_address.push(address)
    } else {
      if(this.index_select == -1) {
        this.list_address[0].main = true
      } else {
        this.list_address[this.index_select].main = true
      }
    }

    if(this.list_telephone.length < 1) {
      telephone = this.form.get('telephone').value
      this.list_telephone.push(telephone)
    }

    address = JSON.stringify(this.list_address)
    telephone = JSON.stringify(this.list_telephone)

    const user = new User(1, name, cpf, cnpj, address, telephone)

    return user
  }

  resetForm() {
    this.form.patchValue({
      name: null,
      cpf_cnpj: null,
      address: null,
      telephone: null
    })

    this.list_address = []
    this.list_telephone = []
  }

  onCancel() {
    this.router.navigate(['home'])
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
