import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
HttpClient,
HttpHeaders,
HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
providedIn: 'root'
})
export class AuthService {
endpoint: string = 'https://backend-ecommerce-jwt-2024.vercel.app/api';
headers = new HttpHeaders().set('Content-Type', 'application/json');
currentUser = {};
constructor(private http: HttpClient, public router: Router) {}
// Sign-up
signUp(user: User): Observable<any> {
let api = `${this.endpoint}/users/register/`;
return this.http.post(api, user).pipe(catchError(this.handleError));
}
// Sign-in
signIn(user: User) {
return this.http
.post<any>(`${this.endpoint}/users/login`, user)
.subscribe({
next: (res:any) => {
localStorage.setItem('access_token', res.token);
localStorage.setItem('refresh_token', res.refreshToken);
},
error: (e:any) => {
console.log(e);
alert("Error !")
},
complete: () => {
  this.router.navigate(['products']);
}
});
}
getToken() {
return localStorage.getItem('access_token');
}
getisLoggedIn(): boolean {
let authToken = localStorage.getItem('access_token');
return authToken !== null ? true : false;
}
doLogout() {
let removeToken = localStorage.removeItem('access_token');
localStorage.removeItem('refresh_token');
if (removeToken == null) {
this.router.navigate(['log-in']);
}
}
// Error
handleError(error: HttpErrorResponse) {
let msg = '';
if (error.error instanceof ErrorEvent) {
// client-side error
msg = error.error.message;
} else {
// server-side error
msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
}
return throwError(msg);
}
//refresh
refreshToken(token: string) {
const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
return this.http.post(`${this.endpoint}/users/refreshToken/`, {
refreshToken: token
}, httpOptions);
}
}