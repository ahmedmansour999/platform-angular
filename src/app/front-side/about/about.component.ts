import { TokenClass } from './../../class/token-class';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  userToken :any ;

  constructor( private tokenClass : TokenClass ){}

  
  ngOnInit(): void {
    this.userToken = this.tokenClass.getData('userAccess');
  }


}
