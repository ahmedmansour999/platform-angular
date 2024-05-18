import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseApi = 'http://127.0.0.1:8000/api/course' ;
  lecurerCourseApi = 'http://127.0.0.1:8000/api/lecturer-course' ;

  constructor( private http : HttpClient  ) { }


  public getCourse(id:number){
    const url = `${this.courseApi}/${id}`
    return this.http.get(url) ;
  }

  public AllCourse(){
    
    return this.http.get(this.courseApi) ;
  }

  public lecturerCourse(id : number){
    const url = `${this.lecurerCourseApi}/${id}`
    return this.http.get(url) ;
  }

  public addCourse(courseData :any ){

    return this.http.post(this.courseApi , courseData) ;

  }

  public editCourse(courseData :any , id:number ){

    const url = `${this.courseApi}/${id}`
    return this.http.patch(url , courseData) ;
  }
  public deleteCourse( id:number ){

    const url = `${this.courseApi}/${id}`
    return this.http.delete(url) ;
  }


}
