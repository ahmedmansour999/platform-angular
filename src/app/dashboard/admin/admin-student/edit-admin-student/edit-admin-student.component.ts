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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentService } from '../../../../service/student.service';

@Component({
  selector: 'app-edit-admin-student',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    FormsModule
  ],  templateUrl: './edit-admin-student.component.html',
  styleUrl: './edit-admin-student.component.css'
})
export class EditAdminStudentComponent {
  studentId : any  ;
  student : any ;
  loginForm! : FormGroup;
  constructor(private studentApi:StudentService , private router : ActivatedRoute ){}


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






  ngOnInit(): void {



    this.router.paramMap.subscribe((data)=>{
      this.studentId = data.get('id') ;

    })



     this.studentApi.oneStudent(this.studentId).subscribe((data : any)=>{
      this.student = data ,
      console.log(this.student);

      this.initializeForm();
      })

  }

  initializeForm(): void {
    this.loginForm = new FormGroup({

      name: new FormControl(this.student.user.name, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$'),
      ]),
      email: new FormControl(this.student.user.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.student.user.password, [
        Validators.required,
      ]),
      age: new FormControl(this.student.user.age, [
        Validators.required,
        Validators.pattern('^[0-9]{2}'),
      ]),
      about: new FormControl(this.student.user.about || ''),
      image: new FormControl(this.student.user.image || ''),
      number: new FormControl(this.student.user.number, [
        Validators.required,
        Validators.pattern('^[0-9]{11}'),
      ]),
      address: new FormControl(this.student.user.address, [Validators.required]),
    });
  }
  handleSubmitForm() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {

      const userData = this.loginForm.value;
      console.log(userData);

      this.studentApi.updateStudent(this.studentId , userData).subscribe(
          ()=>{
            this.initializeForm();
          }
      ) ;

    } else {
      console.log('Form invalid');
    }
  }

}
