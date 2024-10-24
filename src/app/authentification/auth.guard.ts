import { CanActivateFn } from '@angular/router';
import {Router} from '@angular/router';
  import { AuthService } from './auth.service';
  import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
const router = inject(Router);
if (authService.getisLoggedIn()!==true) {
window.alert('Access not allowed!');
router.navigate(['login']);
}
return true;
};
