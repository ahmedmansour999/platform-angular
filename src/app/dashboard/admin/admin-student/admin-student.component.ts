import { Component } from '@angular/core';
import { StudentService } from '../../../service/student.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-student',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-student.component.html',
  styleUrl: './admin-student.component.css'
})
export class AdminStudentComponent {
  students :any ;

  constructor(
    private studentApi: StudentService,

  ) {}

  ngOnInit(): void {
    this.allStudent() ;
  }

  allStudent(){
    this.studentApi.allStudent().subscribe((data)=>{
      this.students = data ;
    })
  }

  delete($id : number){
    if (confirm('Are you sure you want to delete this Student?')) {
      this.studentApi.deleteStudent($id).subscribe(
        () => {this.allStudent() }
      );
    }
  }
}
