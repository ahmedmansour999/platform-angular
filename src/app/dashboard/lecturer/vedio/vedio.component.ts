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
import { Router } from '@angular/router';

@Component({
  selector: 'app-vedio',
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
  templateUrl: './vedio.component.html',
  styleUrl: './vedio.component.css',
})
export class VedioComponent {
  token: any;
  lecturer: any;
  files: any;

  constructor(
    private lecturerApi: LecturerService,
    private _snackBar: MatSnackBar,
    private tokenApi: TokenClass,
    private vedioApi: VedioService ,
    private router:Router
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
    if (this.token !== null) {
      this.lecturerApi.oneLecturer(this.token.id).subscribe((data) => {
        (this.lecturer = data[0]), console.log(data);
      });
    }
  }

  loginForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    vedio: new FormControl(''),
  });

  handleSubmitForm() {
    if (this.loginForm.valid) {
      const userData = new FormData();
      userData.append('title', this.loginForm.get('title')?.value);
      userData.append('description', this.loginForm.get('description')?.value);
      userData.append('vedio', this.files, this.files.name);
      userData.append('lecturer_id', this.token.id);

      console.log(this.loginForm.get('description')?.value);

      this.vedioApi.AddVedio(userData).subscribe(
        () => {
          this._snackBar.open('Added successfully', 'Retry');
          this.router.navigate(['/dash/lecturer/vedio']) ;

        },
        (error) => {
          if (error.error && error.error.message) {
            this._snackBar.open(error.error.errors.vedio, 'Retry');
          } else {
            this._snackBar.open(
              'An error occurred . Please try again later.',
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


  // show Vedio When Select It
  url: any;
  format: any;
  onSelectFile(event: any) {
    this.files = event.target.files[0];
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('image') > -1) {
        this.format = 'image';
      } else if (file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      };
    }
  }




}
