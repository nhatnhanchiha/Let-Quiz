import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AccountService} from '../services/AccountService';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StudentAuthGuard implements CanActivate {
    constructor(private accountService: AccountService, private router: Router) {
    }

    canActivate(): Observable<boolean> {
        return this.accountService.currentAccount$.pipe(
            map(account => {
                if (account != null && !account.isTeacher) {
                    return true;
                } else {
                    this.router.navigate(['/login'])
                }
            })
        )
    }
}
