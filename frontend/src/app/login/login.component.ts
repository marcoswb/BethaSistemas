import { Login } from './../../models/login';
import { AlertModalService } from './../shared/alert-modal/alert-modal.service';
import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private service: ApiService,
    private router: Router,
    private alertService: AlertModalService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    })

    this.verifyAuthorization()
  }

  verifyAuthorization() {
    const authorization = sessionStorage.getItem("authorization")
    if(authorization == "true") {
      this.router.navigate(["home"])
    }
  }

  onLogin() {
    const username = this.form.get("username").value
    const password = this.form.get("password").value

    const user = new Login(username, password)

    this.service.authenticationUser(user).subscribe(
      success => {
        sessionStorage.setItem("authorization", "true")
        this.router.navigate(['home'])
      },
      error => {
        if(error.status == 404) {
          this.showMessageWarning('Usuário ou senha inválido')
        } else {
          this.showMessageDanger('Erro ao efetuar login!')
        }
      }
    )
  }

  onRegister() {
    const username = this.form.get("username").value
    const password = this.form.get("password").value

    const user = new Login(username, password)

    this.service.createLogin(user).subscribe(
      success => {
        sessionStorage.setItem("authorization", "true")
        this.router.navigate(['home'])
      },
      error => {
        if(error.status == 404) {
          this.showMessageWarning('Esse username já existe no sistema!')
        } else {
          this.showMessageDanger('Erro ao efetuar registro!')
        }
      }
    )
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
