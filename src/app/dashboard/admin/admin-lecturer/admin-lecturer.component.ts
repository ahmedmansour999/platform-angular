import { Component } from '@angular/core';
import { LecturerService } from '../../../service/lecturer.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-lecturer',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './admin-lecturer.component.html',
  styleUrl: './admin-lecturer.component.css'
})
export class AdminLecturerComponent {


  lecturers :any ;

  constructor(
    private lecturerApi: LecturerService,

  ) {}

  ngOnInit(): void {
    this.allLecturer()
  }

  allLecturer(){
    this.lecturerApi.allLecturer().subscribe((data)=>{
      this.lecturers = data ;

    })
  }

  

  delete($id : number){
    if (confirm('Are you sure you want to delete this lecturer?')) {
      this.lecturerApi.deletelecturer($id).subscribe(
        () => {
          this.allLecturer()

        },
        error => {
        }
      );
    }
  }


}
