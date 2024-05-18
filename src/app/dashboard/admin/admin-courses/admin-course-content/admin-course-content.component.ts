import { Component } from '@angular/core';
import { ContentService } from '../../../../service/content.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-course-content',
  standalone: true,
  imports: [],
  templateUrl: './admin-course-content.component.html',
  styleUrl: './admin-course-content.component.css'
})
export class AdminCourseContentComponent {

  courseId: number = 0;
  courseContent : any ;
  files : any ;
  private paramMapSubscribtion: Subscription | undefined ;
  private courseContentSupscribtion : Subscription | undefined ;
  SafeResourceUrl!: SafeUrl ;

  constructor(
    private contentApi: ContentService,
    private route: ActivatedRoute ,
    private ContentApi:ContentService,
    private sanitizer: DomSanitizer ,
    private _snackBar: MatSnackBar

  ) {}

  ngOnInit(): void {

    this.paramMapSubscribtion = this.route.paramMap.subscribe((param: any) => {
      this.courseId = param.params.id;

    });


    this.getContent() ;


  }


  getContent(){
    this.courseContentSupscribtion = this.contentApi.CourseContent(this.courseId).subscribe((data)=>{
      this.courseContent = data ;
    })
  }

  url   :any  ;
  ext : string = "" ;
  onSelectFile(type : string  , urlPath:any) {

    this.url = urlPath ;
    if (this.url) {
      var format = this.url.split('.') ;
      this.ext = format[format.length - 1]
    }
  }

  delete(id: number) {
    this.contentApi.deleteContent(id).subscribe(() => {
      setTimeout(() => {
        this._snackBar.open('delete successfully', 'done');
        this.getContent() ;
      }, 2 );
    } , (error)=>{
      if (error.error && error.error.message) {
        this._snackBar.open(error.error.errors.vedio, 'Retry');
      }
    } );

  }

  ngOnDestroy(): void {
    this.paramMapSubscribtion?.unsubscribe;
    this.courseContentSupscribtion?.unsubscribe;
  }

}
