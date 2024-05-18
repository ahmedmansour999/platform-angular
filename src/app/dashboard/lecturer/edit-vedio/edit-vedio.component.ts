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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-vedio',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './edit-vedio.component.html',
  styleUrl: './edit-vedio.component.css',
})
export class EditVedioComponent {
  token: any;
  lecturer: any;
  files: any;
  vedioId: any;
  vedio: any;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private lecturerApi: LecturerService,
    private _snackBar: MatSnackBar,
    private tokenApi: TokenClass,
    private vedioApi: VedioService,
    private route: ActivatedRoute ,
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
        this.lecturer = data[0];
      });

      this.route.paramMap.subscribe((param) => {
        this.vedioId = param.get('id');
        this.fetchVedio();
      });

      this.vedioApi.oneVedio(this.vedioId).subscribe((res) => {
        this.vedio = res;

        const vedioUrl = this.vedio.vedio;
        this.url = `http://127.0.0.1:8000/storage/vedio/${vedioUrl}`;
      });
      this.initializeForm() ;
    }
  }

  fetchVedio(): void {
    this.vedioApi.oneVedio(this.vedioId).subscribe((res) => {
      this.vedio = res;
      const vedioUrl = this.vedio.vedio;
      this.url = `http://127.0.0.1:8000/storage/vedio/${vedioUrl}`;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      title: new FormControl(this.vedio?.title, [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(this.vedio?.description, [
        Validators.required,
        Validators.minLength(15),
      ]),
      vedio: new FormControl(this.vedio?.vedio),
    });
  }

  handleSubmitForm() {
    if (this.loginForm.valid) {
      const userData = new FormData();
      userData.append('title', this.loginForm.get('title')?.value);
      userData.append('description', this.loginForm.get('description')?.value);
      if (this.files && this.files.name !== this.vedio.vedio) {
        userData.append('vedio', this.files, this.files.name);
      } else {
        userData.append('vedio', this.vedio.vedio);
      }
      userData.append('lecturer_id', this.token.id);


      this.vedioApi.updateVedio(userData , this.vedioId).subscribe(
        () => {
          this._snackBar.open('update successfully', 'Retry');
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
