import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        //check some condition  
        let user = localStorage.getItem('ngUser');
        if (!user) {
            //redirect to login/home page etc
            this._router.navigateByUrl('/');
            return false;
        }
        return true;
    }

}