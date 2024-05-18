import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../../service/admin.service';
import { TokenClass } from '../../../../class/token-class';


@Component({
  selector: 'app-edit-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-admin.component.html',
  styleUrl: './edit-admin.component.css'
})
export class EditAdminComponent {




  checkoutForm!: FormGroup ;
  adminId :number = 0 ;
  admin : any ;


  constructor(private formBuilder: FormBuilder , private AdminApi : AdminService , private tokenApi : TokenClass) {}


  ngOnInit(): void {
     const token= this.tokenApi.getData('userAccess') ;
     this.adminId = token.id

    this.AdminApi.currentAdmin(this.adminId).subscribe((data)=>{
      this.admin = data ;
      this.intialization()
    })

  }



  intialization(){
    this.checkoutForm = this.formBuilder.group({
      name: [this.admin?.name , [
        Validators.required ,
        Validators.minLength(3)
      ]],
      email:  [this.admin?.email , [
        Validators.required ,
        Validators.email
      ]] ,
      password:  [this.admin?.password , [
        Validators.required ,
        Validators.minLength(3)
      ]],
      age:  [this.admin?.age , [
        Validators.required
      ]],
      address:  [this.admin?.address , [
        Validators.required ,
        Validators.minLength(3)
      ]],
      number:  [this.admin?.number , [
        Validators.required
      ]],

    });
  }

  onSubmit(): void {
    console.log(this.checkoutForm.value);
    this.checkoutForm.reset();
  }

}
