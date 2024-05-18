import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-lecturer',
  standalone: true,
  imports: [RouterOutlet , RouterLink , ProfileComponent],
  templateUrl: './lecturer.component.html',
  styleUrl: './lecturer.component.css'
})
export class LecturerComponent {

}
