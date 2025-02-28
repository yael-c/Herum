import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean {
    const token = StorageService.getItem('accessToken');
    if (!token) {
      // this._authService.logout();
      this.router.navigate(['/login']);

      return false;
    }

    this.router.navigate(['/']);
    return true;
  }
}