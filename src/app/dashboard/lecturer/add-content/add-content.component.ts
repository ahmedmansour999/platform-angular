import { Component } from '@angular/core';
import { ContentService } from '../../../service/content.service';
import { ActivatedRoute } from '@angular/router';
import { TokenClass } from '../../../class/token-class';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CourseService } from '../../../service/course.service';
import { VedioService } from '../../../service/vedio.service';
import { MatCardModule } from '@angular/material/card';
import { LectureService } from '../../../service/lecture.service';

@Component({
  selector: 'app-add-content',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
  ],
  templateUrl: './add-content.component.html',
  styleUrl: './add-content.component.css',
})
export class AddContentComponent {
  courseId: any;
  token: any;
  formdata!: FormGroup;
  lecturer: any;
  files: any;
  url: any;
  format: any;
  course: any;
  vedios: any;
  lectures: any;
  courseContent: any;
  loginForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private lectureApi: LectureService,
    private tokenApi: TokenClass,
    private courseApi: CourseService,
    private vedioApi: VedioService,
    private contentApi: ContentService,
    private _snackBar: MatSnackBar
  ) {}

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
    this.token = this.tokenApi.getData('userAccess');

    this.route.paramMap.subscribe((param: any) => {
      this.courseId = param.get('id');
    });

    if (this.token !== null) {
      this.vedioApi.vedioLecturer(this.token.id).subscribe((res) => {
        this.vedios = res;
      });

      this.lectureApi.lecturerPdf(this.token.id).subscribe((res) => {
        this.lectures = res;
        console.log('lecture' ,  this.lectures);

      });

      this.contentApi.CourseContent(this.courseId).subscribe((res) => {
        this.courseContent = res;
        console.log('courseContent', this.courseContent);
      });
    }
    this.initialization();
  }

  initialization() {
    this.loginForm = new FormGroup({
      content_type: new FormControl('', [Validators.required]),
      order: new FormControl('', [Validators.required]),
      vedio_id: new FormControl(''),
      lecture_id: new FormControl(''),
      course_id: new FormControl(this.courseId),
    });
  }

  handleSubmitForm() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;

      this.contentApi.addContent(userData).subscribe(
        () => {
          this._snackBar.open('Added successfully', 'Retry');
          this.loginForm.reset();
        },
        (error) => {
          if (error.error && error.error.message) {
            this._snackBar.open(error.error.errors.content, 'Retry');
          } else {
            this._snackBar.open(
              'An error occurred during login. Please try again later.',
              'Retry'
            );
            console.log('Error occurred:', error);
          }
        }
      );
    } else {
      console.log('Form invalid');
    }
  }
}
