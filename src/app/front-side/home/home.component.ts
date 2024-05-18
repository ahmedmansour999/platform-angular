import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AboutComponent } from '../about/about.component';
import { CourseHomeComponent } from '../course-home/course-home.component';
import { OurServiceComponent } from '../our-service/our-service.component';
import { About2Component } from '../about2/about2.component';
import { TokenClass } from '../../class/token-class';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent , AboutComponent , CourseHomeComponent , OurServiceComponent , About2Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  userToken : any  ;

  constructor(private tokenClass : TokenClass){}

  ngOnInit(): void {
    this.userToken = this.tokenClass.getData('userAccess');
  }


}
