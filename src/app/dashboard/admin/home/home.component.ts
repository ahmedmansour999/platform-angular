import { CourseService } from '../../../service/course.service';
import { LectureService } from '../../../service/lecture.service';
import { StudentService } from '../../../service/student.service';
import { VedioService } from '../../../service/vedio.service';
import { LecturerService } from './../../../service/lecturer.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class AdminHomeComponent {
  student: any;
  lecturer: any;
  vedio: any;
  lecture: any;
  course: any;
  NoStudent: number = 0;
  NoLecturer: number = 0;
  NoVedio: number = 0;
  NoLecture: number = 0;
  NoCourse: number = 0;

  constructor(
    private lecturerApi: LecturerService,
    private studentApi: StudentService,
    private vedioApi: VedioService ,
    private lectureApi : LectureService ,
    private courseApi : CourseService
  ) {}

  ngOnInit(): void {
    // get the number of student
    this.studentApi.allStudent().subscribe((data) => {
      this.student = data;
      this.NoStudent = this.student.length;
    });

    // get the number of lecturer
    this.lecturerApi.allLecturer().subscribe((data) => {
      this.lecturer = data;
      this.NoLecturer = this.lecturer.length;
    });

    // get the number of lecturer
    this.vedioApi.allVedio().subscribe((data) => {
      this.vedio = data;
      this.NoVedio = this.vedio.length;
    });

    this.lectureApi.allLecture().subscribe((data)=>{
      this.lecture = data ;
      this.NoLecture = this.lecture.length ;
    })

    this.courseApi.AllCourse().subscribe((data)=>{
      this.course = data ;
      this.NoCourse = this.course.length ;
    })

  }
}
