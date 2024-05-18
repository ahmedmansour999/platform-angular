import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { error } from 'console';
import { TokenClass } from '../../class/token-class';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule , MatButtonToggleModule ,RouterLink , ReactiveFormsModule ,MatIconModule , MatSelectModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements ErrorStateMatcher {



  constructor( private authApi : AuthService ,private _snackBar: MatSnackBar , private router:Router , private tokenClass:TokenClass ){}

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required ]);


  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
  matcher = this;



  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),

  });

  handleSubmitForm() {
    const userData = this.loginForm.value;
    console.log(this.loginForm.valid);

    if(this.loginForm.valid === true){

      this.authApi.login(userData).subscribe((res)=>{
        this.tokenClass.setData('userAccess' , res) ;

        this.router.navigate(['/']);
      } , error => {
        console.error('Login error:', error);
        if (error.error && error.error.message) {
          this._snackBar.open(error.error.error, 'retry');

        } else {
          this._snackBar.open("An error occurred during login. Please try again later.", 'retry');
        }
      } )

    }else
    {
      this._snackBar.open("Enter Valid Value", 'retry');

    }

  }

}


