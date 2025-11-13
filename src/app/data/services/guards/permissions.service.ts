import { Injectable, inject } from '@angular/core';
import { TokenService } from '../utils/token.service';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.tokenService.isLogged()) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }

}

export const LoginGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state:
  RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}
