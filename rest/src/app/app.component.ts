import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// "export" statement makes this class visible from another file through "import" statement
export class AppComponent {
  title = 'rest';
}
