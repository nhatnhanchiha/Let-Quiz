import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from '../services/AccountService';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StudentAuthGuard implements CanActivate {
    constructor(private accountService: AccountService, private router: Router) {
    }

    canActivate(): Observable<boolean> {
        return this.accountService.currentAccount$.pipe(
            map(account => {
                if (!account.isTeacher) {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                }
            })
        );
    }
}
