import { RouterLink } from '@angular/router';
import { TokenClass } from '../../../class/token-class';
import { AdminService } from './../../../service/admin.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {

  admin :any ;
  adminId : number = 0 ;

  constructor( private adminApi :AdminService  , private tokenApi : TokenClass){}

  ngOnInit(): void {

    const token = this.tokenApi.getData('userAccess') ;
    console.log(token);

    if (token) {
      this.adminId = token.id
    }

    this.adminApi.currentAdmin(this.adminId).subscribe((data)=>{
      this.admin = data ;
      console.log(this.admin);
    })

  }

}
