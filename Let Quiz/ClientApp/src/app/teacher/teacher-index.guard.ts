import { Account } from '../models/Account';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TeacherIndexGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let account: Account = JSON.parse(sessionStorage.getItem('account'));

        if(account != null) {
            if(account.isTeacher == true){
                return true;
            }
        }

        this.router.navigate(['/login']);

        return false;
    }
}
