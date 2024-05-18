import { Component } from '@angular/core';
import { CourseService } from '../../../service/course.service';
import { ContentService } from '../../../service/content.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-courses',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './admin-courses.component.html',
  styleUrl: './admin-courses.component.css'
})
export class AdminCoursesComponent {

  courses : any ;

  constructor(private courseApi : CourseService){}

  ngOnInit(): void {

    this.courseApi.AllCourse().subscribe((data)=>{
      this.courses = data ;
      console.log(this.courses);
    })

  }

}
