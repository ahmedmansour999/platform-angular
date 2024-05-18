import { TokenClass } from './../../../class/token-class';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { LectureService } from '../../../service/lecture.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-lecture',
  standalone: true,
  imports: [MatCardModule , DatePipe , RouterLink],
  templateUrl: './lecture.component.html',
  styleUrl: './lecture.component.css'
})
export class LectureComponent {

  lectures : any[] = [] ;
  tokenId : number = 0 ;


  constructor(private tokenApi : TokenClass , private lectureApi : LectureService  , private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {

    const token =  this.tokenApi.getData('userAccess') ;


    if (token.id != null ) {

      this.tokenId = token.id ;
      this.getLecture(this.tokenId) ;
    }
  }

  getLecture(id : number ){
    this.lectureApi.lecturerPdf(this.tokenId).subscribe(
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
        this.getLecture(this.tokenId) ;
      } , (error)=>{
        if (error.error && error.error.message) {
          this._snackBar.open(error.error.errors.vedio, 'Retry');
        }
      } );

    }
}
