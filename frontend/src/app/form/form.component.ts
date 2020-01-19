import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { User } from 'src/models/user'
import { Address } from 'src/models/address'
import { ApiService } from '../api.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup
  form_title: string = "Cadastrar Usuário"
  form_address: string = "Endereço"
  
  id: number
  editUser: boolean = false
  user: User
  address: Address

  listAddress: Address[] = []
  listTelephone: Array<String> = []
  indexSelect: number = -1

  constructor(
    private formBuilder: FormBuilder,
    private service: ApiService,
    private route: ActivatedRoute,
    private router: Router
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
      this.id = params['id']
    })

    if(this.id != undefined) {
      this.form_title = "Atualizar Usuário"
      this.form_address = "Endereço principal escolhido anteriormente"
      this.editUser = true
      this.getUserById(this.id)
    }
  }

  getUserById(id) {
    this.service.getUserById(id).subscribe(
      (response) => {
       this.populateForm(response)
      },
      error => {
        alert('Não foi possível encontrar o Usuário!')
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

    const convertAddress = JSON.parse(user.address)
    const convertTelephone = JSON.parse(user.telephone)

    this.listAddress = convertAddress
    this.listTelephone = convertTelephone
    
    this.listAddress.map(address => {
      if(address.main = true) {
        this.indexSelect = address.id
        address_form = address.description
      }
    })

    telephone_form = this.listTelephone[0]

    this.form.patchValue({
      name: name_form,
      cpf_cnpj: cpf_cnpj_form,
      address: address_form,
      telephone: telephone_form
    })
  }

  onAddAddress() {
    let id = this.listAddress.length

    this.address = new Address(id, this.form.value.address, false)
    this.listAddress.push(this.address)    
  }

  onAddressMain(event) {
    this.listAddress.map((address, index) => {
      this.listAddress[index].main = false
    })

    const selectOption = event.target['options']
    this.indexSelect = selectOption.selectedIndex
  }

  onAddTelephone() {
    this.listTelephone.push(this.form.value.telephone)
  }

  onSubmit(){
    this.user = this.checkFields()
    if(this.id != undefined) {
      this.service.updateUser(this.id ,this.user).subscribe(
        success => {
          alert('Usuário atualizado com sucesso')
          this.resetForm()
          this.router.navigate([''])
        },
        error => {
          alert('Erro ao atualizar Usuário!')
        }
      )
    } else {
      this.service.createUser(this.user).subscribe(
        (response) => {
          if(response.id == 1) {
            alert('Usuário já existe')
          } else {
            alert('Usuário cadastrado com sucesso!')
            this.resetForm()
          }
        },
        error => {
          alert('Erro ao cadastrar Usuário!')
        },
        () => {

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

    if(this.form.get('cpf_cnpj').value.length >= 14) {
      cnpj = this.form.get('cpf_cnpj').value
    } else if(this.form.get('cpf_cnpj').value.length <= 11) {
      cpf = this.form.get('cpf_cnpj').value
    }
    
    if(this.listAddress.length < 1) {
      address = new Address(0, this.form.get('address').value, true)
      this.listAddress.push(address)
      address = JSON.stringify(this.listAddress)
    } else {
      if(this.indexSelect == -1) {
        this.listAddress[0].main = true
      } else {
        this.listAddress[this.indexSelect].main = true
      }
      
      address = JSON.stringify(this.listAddress)
    }
    
    if(this.listTelephone.length < 1) {
      telephone = this.form.get('telephone').value
      this.listTelephone.push(telephone)
      telephone = JSON.stringify(this.listTelephone)
    } else {
      telephone = JSON.stringify(this.listTelephone)
    }
    
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
    this.listAddress = []
    this.listTelephone = []
  }
}
