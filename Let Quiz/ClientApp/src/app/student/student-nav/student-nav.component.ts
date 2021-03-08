import {Component, OnInit} from '@angular/core';
import {Account} from '../../models/Account';
import {Router} from '@angular/router';
import {AccountService} from '../../services/AccountService';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-student-nav',
    templateUrl: './student-nav.component.html',
    styleUrls: ['./student-nav.component.css']
})
export class StudentNavComponent implements OnInit {

    currentAccount$: Observable<Account>;

    constructor(private router: Router, private accountService: AccountService) {
    }


    ngOnInit() {
        this.currentAccount$ = this.accountService.currentAccount$;
    }

    logout() {
        sessionStorage.clear();
        this.accountService.setCurrentAccount(null);
        this.router.navigate(['/login']);
    }
}
