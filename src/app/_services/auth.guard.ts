import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanActivateChild } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private _router: Router) {
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.handle(route);
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.handle(route);
    }

    public handle(route:any) {
        let currentUser = localStorage.getItem('CurrentUser');
        let role = localStorage.getItem('role');
        if (currentUser) {
            if (route.data && route.data.roles) {
                var userRoles = route.data.roles;
                if(userRoles.indexOf(role) > -1){
                    return true;
                }else{
                    this._router.navigateByUrl('/');
                    return false;
                }
            }
            return true;
        }
        else {
            this._router.navigateByUrl('/login');
            return false;
        }
    }

}
