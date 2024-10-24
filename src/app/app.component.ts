import { Component } from '@angular/core';
import { AuthService } from './authentification/auth.service';
import { User } from './authentification/user';  // Import the User model or use the correct path

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ecommerce';
  
  constructor(public authService: AuthService) { }

  logout() {
    this.authService.doLogout();
  }

}
