import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

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
