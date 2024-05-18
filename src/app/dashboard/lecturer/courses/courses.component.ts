import { Component } from '@angular/core';
import { CourseService } from '../../../service/course.service';
import { TokenClass } from '../../../class/token-class';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [DatePipe , RouterLink],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  token : any  ;
  lecturerId : number = 0 ;
  cousers : any ;

  constructor( private router : Router , private courseApi : CourseService , private tokenApi  : TokenClass , private _snackBar: MatSnackBar){}

  ngOnInit(): void {

    this.token = this.tokenApi.getData('userAccess')
    if (this.token != null) {

      this.lecturerId = this.token.id
      this.getCourse(this.lecturerId) ;

    }

  }

  getCourse(id : number ){
    this.courseApi.lecturerCourse(id).subscribe((data)=>{
      this.cousers = data ;
    })
  }



  delete($id : any){
    this.courseApi.deleteCourse($id).subscribe(() => {
        this._snackBar.open('delete successfully', 'done');
        this.getCourse(this.lecturerId) ;
        
    } , (error)=>{
      if (error.error && error.error.message) {
        this._snackBar.open(error.error.errors.vedio, 'Retry');
      }
    } );

  }

}
