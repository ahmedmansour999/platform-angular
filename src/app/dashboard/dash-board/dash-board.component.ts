import { Component } from '@angular/core';
import { HeaderComponent } from '../../front-side/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [HeaderComponent ,RouterOutlet ],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent {

}
