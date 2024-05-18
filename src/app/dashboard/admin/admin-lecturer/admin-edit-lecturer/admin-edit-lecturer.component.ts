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
import { LecturerService } from '../../../../service/lecturer.service';


@Component({
  selector: 'app-admin-edit-lecturer',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './admin-edit-lecturer.component.html',
  styleUrl: './admin-edit-lecturer.component.css'
})
export class AdminEditLecturerComponent {

  lecturerId : any  ;
  lecturer : any ;
  loginForm! : FormGroup;



  constructor(private lecturerApi:LecturerService , private router : ActivatedRoute ){}



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
      this.lecturerId = data.get('id') ;

    })



     this.lecturerApi.oneLecturer(this.lecturerId).subscribe((data : any)=>{
      this.lecturer = data[0] ,
      this.initializeForm();
      })

  }

  initializeForm(): void {
    this.loginForm = new FormGroup({

      name: new FormControl(this.lecturer.user.name, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$'),
      ]),
      email: new FormControl(this.lecturer.user.email, [
        Validators.required,
        Validators.email,
      ]),
      graduate: new FormControl(this.lecturer.user.graduate, [
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*')
      ]),
      password: new FormControl(this.lecturer.user.password, [
        Validators.required,
      ]),
      age: new FormControl(this.lecturer.user.age, [
        Validators.required,
        Validators.pattern('^[0-9]{2}'),
      ]),
      about: new FormControl(this.lecturer.user.about || ''),
      image: new FormControl(this.lecturer.user.image || ''),
      number: new FormControl(this.lecturer.user.number, [
        Validators.required,
        Validators.pattern('^[0-9]{11}'),
      ]),
      address: new FormControl(this.lecturer.user.address, [Validators.required]),
      specialist: new FormControl('', [Validators.required]),
    });
  }
  handleSubmitForm() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {

      const userData = this.loginForm.value;
      console.log(userData);

      this.lecturerApi.updateLecturer(this.lecturerId , userData).subscribe(
          ()=>{
            this.initializeForm();
          }
      ) ;

    } else {
      console.log('Form invalid');
    }
  }

}


