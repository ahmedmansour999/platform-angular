import { Component } from '@angular/core';
import { VedioService } from '../../../service/vedio.service';
import { error } from 'console';
import { MatCardModule } from '@angular/material/card';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TokenClass } from '../../../class/token-class';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-vedio',
  standalone: true,
  imports: [
    MatCardModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatPaginatorModule,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './show-vedio.component.html',
  styleUrl: './show-vedio.component.css',
})
export class ShowVedioComponent {
  vedios: any;
  pageSize = 5;
  currentPage = 1;
  length: any;
  token : any ;

  constructor(
    private vedioApi: VedioService,
    private tokenApi: TokenClass,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
     this.token = this.tokenApi.getData('userAccess');



    if (this.token.id != null) {
      this.getAllVedio() ;
    }
  }


  getAllVedio(){
    this.vedioApi.vedioLecturer(this.token.id).subscribe(
      (data) => {
        this.vedios = data;
        console.log(this.vedios);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.vedios?.length);
    return this.vedios?.slice(startIndex, endIndex);
  }

  onPageChange(pageEvent: any): void {
    this.currentPage = pageEvent.pageIndex + 1;
  }

  // delete Vedio

  delete(id: number) {

    this.vedioApi.deleteVedio(id).subscribe(() => {
      setTimeout(() => {
        this._snackBar.open('delete successfully', 'done');
      }, 2 );
      this.getAllVedio() ;
    } , (error)=>{
      if (error.error && error.error.message) {
        this._snackBar.open(error.error.errors.vedio, 'Retry');
      }
    } );

  }
}
