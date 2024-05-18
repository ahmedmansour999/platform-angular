import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { LectureService } from '../../../service/lecture.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-admin-lecture',
  standalone: true,
  imports: [MatCardModule , DatePipe , RouterLink],
  templateUrl: './admin-lecture.component.html',
  styleUrl: './admin-lecture.component.css'
})
export class AdminLectureComponent {
  lectures : any[] = [] ;
  tokenId : number = 0 ;


  constructor(  private lectureApi : LectureService  , private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
      this.getLecture() ;
  }

  getLecture( ){
    this.lectureApi.allLecture().subscribe(
      (data) => {
        this.lectures = data;
        console.log( 'data' , this.lectures);
      },
      (error) => {
        console.log(error);
      }
    );
  }


    // delete Vedio

    delete(id: number) {

      this.lectureApi.deltePdf(id).subscribe(() => {
        this.getLecture() ;
      } , (error)=>{
        if (error.error && error.error.message) {
          this._snackBar.open(error.error.errors.vedio, 'Retry');
        }
      } );

    }
}

