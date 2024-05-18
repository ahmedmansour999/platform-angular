import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { TokenClass } from '../../class/token-class';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
})
export class LoginUserComponent implements ErrorStateMatcher {

  constructor( private authApi:AuthService , private http :HttpClient , private tokenClass:TokenClass , private router : Router){}
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  name = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$'),
  ]);
  password = new FormControl('', [
    Validators.required,
    // Validators.pattern('^[A-Za-z].{5,}[A-Z].*d.*'),
  ]);
  specialist = new FormControl('');

  age = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{2}'),
  ]);
  number = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{11}'),
  ]);
  address = new FormControl('', [Validators.required]);
  roles = new FormControl('', [Validators.required]);
  year = new FormControl('', [Validators.required]);

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
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      // Validators.pattern('^[A-Za-z].{5,}[A-Z].*d.*'),
    ]),
    specialist: new FormControl('', ),
    age: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{2}'),
    ]),
    image : new FormControl('') ,
    number: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{11}'),
    ]),
    address: new FormControl('', [Validators.required]),
    roles: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
  });

  handleSubmitForm() {
    console.log(this.loginForm);

    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      this.authApi.register(userData).subscribe(
        response => {
           this.tokenClass.setData('userAccess' , response) ;
           this.router.navigate(['/login']);

        },
        error => {
          console.error('Registration failed:', error);
        }
      );
    } else {
      console.log('Form invalid');
    }
  }
}
