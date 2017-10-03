import { Injectable }       from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
}                           from '@angular/router';
import { AuthService }      from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor (private authService: AuthService, private router: Router) {}

  public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  public canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  public canLoad (route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  public checkLogin (url: string): boolean {
    if (this.authService.isLogged) {
        return true;
    }else {
        this.authService.redirectUrl = url;
        this.router.navigate(['login']);
        return false;
    }
  }
}
