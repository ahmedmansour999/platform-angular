import { Component } from '@angular/core';
import { AdminService } from '../../../service/admin.service';
import { TokenClass } from '../../../class/token-class';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class showadminComponent {
  admins :any ;
  id : number = 0 ;

  constructor(
    private adminApi: AdminService,
    private tokenApi : TokenClass
  ) {}

  ngOnInit(): void {
    const token = this.tokenApi.getData('userAccess') ;
    this.allAdmin()
  }

  allAdmin(){
    this.adminApi.allAdmin(this.id).subscribe((data :any )=>{
      this.admins = data ;
    })
  }



  delete($id : number){
    if (confirm('Are you sure you want to delete this lecturer?')) {
      this.adminApi.delete($id) ;
      this.allAdmin() ;

    }
  }


}
