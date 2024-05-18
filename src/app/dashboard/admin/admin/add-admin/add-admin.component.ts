import { Router } from '@angular/router';
import { AuthService } from './../../../../service/auth.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../../service/admin.service';
import { TokenClass } from '../../../../class/token-class';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css',
})
export class AddAdminComponent {
  adminId: number = 0;
  admin: any;

  constructor(private _snackBar: MatSnackBar , private sanitizer: DomSanitizer , private formBuilder: FormBuilder, private authApi: AuthService , private router : Router ) {}

  ngOnInit(): void {}

  checkoutForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    age: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.minLength(3)]],
    number: ['', [Validators.required]],
    roles : 'control'
  });




  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const FormData = this.checkoutForm.value;

      this.authApi.register(FormData).subscribe(()=>{
        this._snackBar.open("add Success", 'Done');
        this.router.navigate(['/admin/admin'])
      } , error =>{
        if( error.error ){
          this._snackBar.open(error.error.error.email, 'Done');

        }
      }  ) ;
    }
  }
}
