import { LectureService } from './../../../service/lecture.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TokenClass } from '../../../class/token-class';
import { LecturerService } from '../../../service/lecturer.service';
import { VedioService } from '../../../service/vedio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-lecture',
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
  templateUrl: './add-lecture.component.html',
  styleUrl: './add-lecture.component.css'
})
export class AddLectureComponent {


  token : any ;
  lecturer : any ;
  files : any ;
  url   :any  ;
  format :any  ;
  safeUrl!: SafeResourceUrl;


  constructor(private sanitizer: DomSanitizer , private router:Router  , private lecturerApi:LecturerService ,private _snackBar: MatSnackBar , private tokenApi:TokenClass , private lectureApi : LectureService){}


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

    if (this.token !== null ) {

       this.lecturerApi.oneLecturer(this.token.id).subscribe((data)=>{
        this.lecturer = data[0]
      })
    }



  }

  loginForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(15)
    ]),
    lecture: new FormControl('')
  });

  handleSubmitForm() {
    if (this.loginForm.valid) {

      const userData = new FormData();
      userData.append('title', this.loginForm.get('title')?.value);
      userData.append('description', this.loginForm.get('description')?.value);
      userData.append('lectures', this.files, this.files.name);
      userData.append('lecturer_id', this.token.id);


      this.lectureApi.createLecture(userData).subscribe(
        () => {
          this._snackBar.open('Added successfully', 'Retry');
          this.router.navigate(['/dash/lecturer/lecture']) ;

        },
        error => {
          if (error.error && error.error.message) {
            this._snackBar.open(error.error.errors.lecture, 'Retry');
          } else {
            this._snackBar.open("An error occurred during login. Please try again later.", 'Retry');
            console.log('Error occurred:', error);
          }
        }
      );
    } else {
      console.log('Form invalid');
    }
  }



  onSelectFile(event : any ) {

    this.files = event.target.files[0] ;

    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('pdf')> -1){
        this.format = 'pdf';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);



      }
    }

  }





}




