import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  router: Router;
  constructor (router: Router) {
    this.router = router;
  }
  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      return true;
    } else {
      this.router.navigate(['login']);
    }
  }
}
