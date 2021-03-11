import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AccountService} from '../services/AccountService';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StudentAuthGuard implements CanActivate {
    constructor(private accountService: AccountService, private router: Router) {
    }

    canActivate(): boolean {
        this.accountService.currentAccount$.pipe(
            map(account => {
                if (!account.isTeacher) {
                    return true;
                } else {
                    this.router.navigate(['/login'])
                }
            })
        )

        this.router.navigate(['/login'])
        return false;
    }
}
