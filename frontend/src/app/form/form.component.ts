import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/models/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  listAdrress: Array<String> = [];
  listTelephone: Array<String> = [];
  user: User;
  userFinal: User;
  name: string;
  cpf: string;
  cnpj: string;
  address: string;
  telephone: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      cpf_cnpj: [null, Validators.required],
      address: [null, Validators.required],
      telephone: [null, Validators.required],
    })

  }

  addAddress() {
    this.listAdrress.push(this.form.value.address);
    console.log(this.form);
  }

  addTelephone() {
    this.listTelephone.push(this.form.value.telephone);
    console.log(this.listTelephone);
  }

  onSubmit(){
    this.userFinal = this.verificarCampos(this.form.value);

    console.log(this.userFinal);
    this.form.reset();
  }

  verificarCampos(object) {
    this.name = object.name;

    if(object.cpf_cnpj.length >= 14) {
      this.cnpj = object.cpf_cnpj;
      this.cpf = null;
    } else if(object.cpf_cnpj.length <= 11) {
      this.cpf = object.cpf_cnpj;
      this.cnpj = null;
    }
    
    if(this.listAdrress.length < 1) {
      this.address = object.address;
    } else {
      this.address = JSON.stringify(this.listAdrress);
    }
    
    if(this.listTelephone.length < 1) {
      this.telephone = object.telephone;
    } else {
      this.telephone = JSON.stringify(this.listTelephone);
    }
    
    this.user = new User(1, this.name, this.cpf, this.cnpj, this.address, this.telephone);
    
    return this.user;
  }
}
