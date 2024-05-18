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
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { CourseService } from '../../../service/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-course',
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
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent {
  token : any ;
  lecturer : any ;
  files : any ;
  url   :any  ;
  format :any  ;
  course :any ;
  loginForm!: FormGroup
  courseId: any;


  constructor(      private route: ActivatedRoute,    private lecturerApi:LecturerService ,private _snackBar: MatSnackBar , private tokenApi:TokenClass , private courseApi : CourseService ){}


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
        this.lecturer = data[0] 
      })

      this.route.paramMap.subscribe((param :any ) => {
        this.courseId = param.get('id');
        console.log('courseId' , this.courseId);

        this.fetchImage();
      });


    }




  }

  fetchImage(){
    this.courseApi.getCourse(this.courseId).subscribe((data)=>{
      this.course = data ;
      this.inputValue()
      const imageUrl = this.course[0].image ;
      this.url = `http://127.0.0.1:8000/storage/image/${imageUrl}`;
      console.log(this.course);
    })
  }

  inputValue(){
    this.loginForm= new FormGroup({
      name: new FormControl(this.course[0]?.course_name, [
        Validators.required,
        Validators.minLength(3)
      ]),
      duration: new FormControl(this.course[0]?.duration, [
        Validators.required
            ]),
      price: new FormControl(this.course[0]?.price, [
        Validators.required,
        Validators.pattern(/^(0|[1-9]\d*)(\.\d{1,2})?$/)
      ]),
      image: new FormControl(this.course[0]?.image),

    });
  }

  handleSubmitForm() {
    if (this.loginForm.valid) {

      const userData = new FormData();


      userData.append('course_name', this.loginForm.get('name')?.value);
      userData.append('price', this.loginForm.get('price')?.value);
      userData.append('duration', this.loginForm.get('duration')?.value);
      if (this.files && this.files.name !== this.course[0]?.image ) {
        console.log('hello');
        userData.append('image', this.files , this.files?.name);
      }else{
        userData.append('image', this.loginForm.value.image);
      }

      userData.append('lecturer_id', this.token.id);


      this.courseApi.editCourse(userData , this.courseId).subscribe(
        () => {
          this._snackBar.open('Added successfully', 'Retry');
          this.loginForm.reset() ;
          this.url = null ;
        },
        error => {
          if (error.error && error.error.message) {
            this._snackBar.open(error.error.errors.courses, 'Retry');
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
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;

      }
    }
  }



}
