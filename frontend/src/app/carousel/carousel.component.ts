import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  slides = [
    {image: 'https://www.sevenmentor.com/wp-content/uploads/2019/10/angular-8.jpg'},
    {image: 'https://solidstudio.io/img/springboot.jpg?ver=1'},
    {image: 'https://www.terakoya.work/wp-content/uploads/2019/01/mysql.jpg'},
    {image: 'https://froylancamacho.com/content/images/size/w2000/2019/02/docker.png'},
    {image: 'https://www.bootstrapdash.com/wp-content/uploads/2017/08/bootstrap-4-beta-whats-new.jpg'},
  ]
  showIndicator = true

  constructor() { }

  ngOnInit() {
  }

}
