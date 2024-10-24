import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './authentification/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getisLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirige l'utilisateur vers la page de connexion s'il n'est pas connecté
      return false;
    }
  }
}