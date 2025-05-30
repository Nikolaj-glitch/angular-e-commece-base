import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/login/auth.services';
import { Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (authService.isAuthenticated() == false) {
    router.navigate(['']);
    return false
  }
  return true
};
