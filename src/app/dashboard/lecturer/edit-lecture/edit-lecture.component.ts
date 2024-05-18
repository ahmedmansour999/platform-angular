import { ActivatedRoute } from '@angular/router';
import { LectureService } from './../../../service/lecture.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
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
import { TokenClass } from '../../../class/token-class';
import { LecturerService } from '../../../service/lecturer.service';
import { VedioService } from '../../../service/vedio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-lecture',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './edit-lecture.component.html',
  styleUrl: './edit-lecture.component.css',
})
export class EditLectureComponent {
  files: any;
  url: any;
  format: any;
  safeUrl!: SafeResourceUrl;
  lectureId: any;
  lecture: any;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar,
    private lectureApi: LectureService
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
    this.route.paramMap.subscribe((param) => {
      this.lectureId = param.get('id');
    });

    this.lectureApi.oneLecture(this.lectureId).subscribe((data) => {
      this.lecture = data;
      this.initializeForm() ;
    });
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      title: new FormControl(this.lecture?.title || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(this.lecture?.description || '', [
        Validators.required,
        Validators.minLength(15),
      ]),
      lecture: new FormControl(this.lecture?.lecture || null),
    });
  }


  handleSubmitForm() {

    if (this.loginForm.valid) {
      const userData = new FormData();
      userData.append('title', this.loginForm.get('title')?.value);
      userData.append('description', this.loginForm.get('description')?.value);
      if (this.files && this.files.name !== this.lecture.lectures) {
        userData.append('lecture', this.files, this.files.name);
      } else {
        userData.append('lecture', this.lecture.lectures);
      }
      this.lectureApi.updateLecture(userData , this.lectureId).subscribe(
        () => {
          this._snackBar.open('Added successfully', 'Retry');
          this.loginForm.reset();
          this.url = null;
        },
        (error) => {
          if (error.error && error.error.message) {
            this._snackBar.open(error.error.errors.lecture, 'Retry');
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

  onSelectFile(event: any) {
    this.files = event.target.files[0];

    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('pdf') > -1) {
        this.format = 'pdf';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      };
    }
  }
}
