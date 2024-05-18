import { Component } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { TokenClass } from '../../class/token-class';
import { error } from 'console';

@Component({
  selector: 'app-course-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-home.component.html',
  styleUrl: './course-home.component.css'
})
export class CourseHomeComponent {


  courses : any ;
  carts : any ;
  user_id : number = 0 ;

  constructor( private courseApi : CourseService , private cartApi : CartService , private token : TokenClass ){}

  ngOnInit(): void {

    this.getCourses() ;

    const userData =  this.token.getData('userAccess') ;
    this.user_id = userData.id ;

    this.getCart()
  }

  getCart(){
    this.cartApi.allCart().subscribe((data)=>{
      this.carts = data ;
    })
  }

  getCourses(){
    this.courseApi.AllCourse().subscribe((data)=>{
      this.courses = data ;
    })
  }

  AddToCart( course_id :any ){
    this.cartApi.AddCart({ course_id: course_id, user_id: this.user_id }).subscribe(error=>{
      console.log(error);
    }) ;
    this.getCart()
  }

  removeFromCart(id : any){
    this.cartApi.deleteCart(id).subscribe(error=>{
      console.log(error);
    }) ;
    this.getCart() ;
  }

}
