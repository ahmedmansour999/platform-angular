import { Component } from '@angular/core';
import { HeaderComponent } from '../front-side/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-show-app',
  standalone: true,
  imports: [HeaderComponent , RouterOutlet],
  templateUrl: './show-app.component.html',
  styleUrl: './show-app.component.css'
})
export class ShowAppComponent {

}
