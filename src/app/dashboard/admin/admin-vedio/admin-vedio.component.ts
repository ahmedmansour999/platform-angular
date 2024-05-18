import { DatePipe } from '@angular/common';
import { VedioService } from './../../../service/vedio.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-vedio',
  standalone: true,
  imports: [ DatePipe ],
  templateUrl: './admin-vedio.component.html',
  styleUrl: './admin-vedio.component.css'
})
export class AdminVedioComponent {

  vedios : any ;

  constructor( private  vedioApi : VedioService ){}

  ngOnInit(): void {

    this.getAllVedio() ;
  }

  getAllVedio(){
    this.vedioApi.allVedio().subscribe((data)=>{
      this.vedios = data ;
      console.log(this.vedios);

    })
  }

}
