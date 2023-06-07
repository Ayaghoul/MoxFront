import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree,
    Route,
    UrlSegment
} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../authentication/auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router) {
    }


    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const url: string = state.url;
        return this.checkUserLogin(next, url);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state)
    }

    canDeactivate(component: unknown,
                  currentRoute: ActivatedRouteSnapshot,
                  currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }

    canLoad(route: Route,
            segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }


    checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
        if (this.authService.isAuthenticated()) {
            this.router.navigateByUrl('/login')

            return false;
        }
        return true
        // }

    }
}
