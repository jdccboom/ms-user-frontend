import { Injectable, inject } from '@angular/core';
import { TokenService } from '../utils/token.service';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);

  realRole: string = "";

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole: string[] = next.data["expectedRole"];
    this.realRole = this.tokenService.getRole();
    console.log(this.realRole);
    console.log(expectedRole);
    
    if (!this.tokenService.isLogged() || !expectedRole.some(r => this.realRole.includes(r))) {
      this.router.navigate([this.router.url]);
      return false;
    }
    return true;
  }
}

export const RolesGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state:
  RouterStateSnapshot): boolean => {
  return inject(RolesService).canActivate(next, state);
}