import { Component } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authserv: AuthService, private router: Router) {}
  user: User = new User();

  Ajoutuser = () => {
    this.authserv.signUp(this.user).subscribe((data) => {
      // Assuming that the login route is 'login' and products route is 'products'
      this.router.navigate(['products']);
    });
  }
}
