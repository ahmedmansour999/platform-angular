import { ContentService } from './../../../service/content.service';
import { Component } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../service/course.service';

@Component({
  selector: 'app-course-details-home',
  standalone: true,
  imports: [],
  templateUrl: './course-details-home.component.html',
  styleUrl: './course-details-home.component.css',
})
export class CourseDetailsHomeComponent {
  courseId: any;
  contents: any;
  course : any ;
  files: any;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private contentApi: ContentService ,
    private courseApi : CourseService
  ) {}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((data) => {
      const param = data;
      this.courseId = param.get('id');
    });

    this.contentApi.CourseContent(this.courseId).subscribe((data) => {
      this.contents = data;
      console.log(this.contents);
    });

    this.courseApi.getCourse(this.courseId).subscribe((data)=>{
      const courseData : any = data ;

      this.course = courseData[0] ;

      console.log(this.course);


    })
  }

  url: any ;
  ext: string = '';
  onSelectFile(type: string, urlPath: any) {
    this.url = urlPath;
    if (this.url) {
      var format = this.url.split('.');
      this.ext = format[format.length - 1];
    }
  }
}
