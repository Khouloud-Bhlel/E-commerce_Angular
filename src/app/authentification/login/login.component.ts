import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user';
@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(public authService: AuthService,public router: Router){}
email:string=''
password:string=''
loginUser() {
    const userlogin: User = {
      email: this.email,
      password: this.password,
      _id: null,
      firstname: '',
      lastname: ''
    };
this.authService.signIn(userlogin);
}
}