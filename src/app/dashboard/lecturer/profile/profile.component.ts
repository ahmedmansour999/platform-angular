import { VedioService } from './../../../service/vedio.service';
import { LecturerService } from './../../../service/lecturer.service';
import { Component } from '@angular/core';
import { TokenClass } from '../../../class/token-class';
import { LectureService } from '../../../service/lecture.service';
import { CourseService } from '../../../service/course.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  token : any ;
  lecturer : any ;
  vedioLenght : number = 0 ;
  lectureLength : number = 0 ;
  courseLength : number = 0 ;

  constructor(private _tokenClass:TokenClass , private LecturerApi:LecturerService , private vedioApi:VedioService , private lectureApi:LectureService , private courseApi:CourseService) {}

  ngOnInit(): void {

    this.token = this._tokenClass.getData('userAccess') ;

    if (this.token !== null ) {
       this.LecturerApi.oneLecturer(this.token.id).subscribe((data)=>{
        this.lecturer = data[0]
      })
      this.vedioApi.vedioLecturer(this.token.id).subscribe((data)=>{
        this.vedioLenght = data.length ;
      })
      this.lectureApi.lecturerPdf(this.token.id).subscribe((data)=>{
        this.lectureLength = data.length ;
      })
      this.courseApi.lecturerCourse(this.token.id).subscribe((data : any)=>{
        this.courseLength = data.length ;
      })
    }

  }



}
