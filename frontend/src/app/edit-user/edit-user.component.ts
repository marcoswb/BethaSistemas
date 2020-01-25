import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    this.verifyAuthorization()
  }

  verifyAuthorization() {
    const authorization = sessionStorage.getItem("authorization")
    if(authorization == "false") {
      this.router.navigate([""])
    }
  }
}
