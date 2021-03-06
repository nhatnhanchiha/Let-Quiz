import {AccountService} from './../services/AccountService';
import {Account} from './../models/Account';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    ngOnInit(): void {
        this.accountService.currentAccount$.subscribe(account => {
            if (account) {
                if (account.isTeacher == true) {
                    this.router.navigate(['teacher-index']);
                } else {
                    this.router.navigate(['student-index']);
                }
            }
        });
    }

    constructor(private accountService: AccountService, private router: Router) {
    }

    acc: Account = {
        username: '',
        password: '',
        name: '',
        isTeacher: true,
        status: true
    };

    errorLogin: string;

    onSubmit() {
        this.accountService.getToken(this.acc).subscribe(
            (data: any) => {
                sessionStorage.setItem('token', data);
                this.accountService.getAccount(this.acc.username, data).subscribe(
                    (account: Account) => {
                        sessionStorage.setItem('account', JSON.stringify(account));
                        this.accountService.setCurrentAccount(account);
                        if (account.isTeacher == true) {
                            this.router.navigate(['teacher-index']);
                        } else {
                            this.router.navigate(['student-index']);
                        }
                    });
            },
            (err: any) => this.errorLogin = 'Invalid username or password'
        );
    }
}
