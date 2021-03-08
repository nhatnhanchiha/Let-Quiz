import {Component, OnInit} from '@angular/core';
import {AccountService} from './services/AccountService';
import {Observable} from 'rxjs';
import {Account} from './models/Account';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
    title = 'app';

    constructor(private accountService: AccountService) {
    }

    ngOnInit(): void {
        const account = JSON.parse(sessionStorage.getItem('account'));
        if (account) {
            this.accountService.setCurrentAccount(account);
        }
    }
}
