import { Component } from '@angular/core';
import { StudentService } from '../../service/student.service';
import { TokenClass } from '../../class/token-class';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {


  studentId : number = 0 ;
  student : any ;

  constructor( private studentApi : StudentService , private tokenApi : TokenClass ){}

  ngOnInit(): void {

    // get id of user from Local Storage
    const tokenData :any = this.tokenApi.getData('userAccess') ;
    this.studentId = tokenData.id ;


    this.studentApi.oneStudent(this.studentId).subscribe((data)=>{
      this.student = data ;
      console.log(data);

    })

  }

}

