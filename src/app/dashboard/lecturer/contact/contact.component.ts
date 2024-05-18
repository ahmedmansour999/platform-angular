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
import { RouterLink } from '@angular/router';
import { LecturerService } from '../../../service/lecturer.service';
import { TokenClass } from '../../../class/token-class';

@Component({
  selector: 'app-contact',
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
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  token : any ;
  lecturer : any ;
  loginForm! : FormGroup;
  selectedImage : any ;



  constructor(private lecturerApi:LecturerService , private tokenApi:TokenClass ){}



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

    this.token = this.tokenApi.getData('userAccess') ;
    console.log(this.token);

    if (this.token !== null ) {

       this.lecturerApi.oneLecturer(this.token.id).subscribe((data)=>{
        this.lecturer = data[0] ,
        console.log(data);
        this.initializeForm();
      })
    }
  }

  initializeForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(this.lecturer.user.email, [
        Validators.required,
        Validators.email,
      ]),
      name: new FormControl(this.lecturer.user.name, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$'),
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
      image: new FormControl(''),
      number: new FormControl(this.lecturer.user.number, [
        Validators.required,
        Validators.pattern('^[0-9]{11}'),
      ]),
      address: new FormControl(this.lecturer.user.address, [Validators.required]),
      specialist: new FormControl('', [Validators.required]),
    });
  }

  onSelectImage(event : any ) {
    this.selectedImage = event.target.files[0] ;
    const file = event.target.files && event.target.files[0];
 }

  handleSubmitForm() {
    if (this.loginForm.valid) {

      const userData = this.loginForm.value;
      userData.image = this.selectedImage;



      this.lecturerApi.updateLecturer(this.token.id , userData).subscribe(
          ()=>{
            // this.initializeForm();
          }
      ) ;

    } else {
      console.log('Form invalid');
    }
  }

}
