import { AccountService } from './../services/AccountService';
import { Account } from './../models/Account';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    constructor(private accountService: AccountService, private router: Router) { }

    acc: Account = {
        username: "",
        password: "",
        name: "",
        isTeacher: true
    }

    onSubmit() {
        this.accountService.getToken(this.acc).subscribe(
            (data: any) => {
                sessionStorage.setItem('token', data);
                
                this.accountService.getAccount(this.acc.username, data).subscribe(
                    (account: Account) => {
                        sessionStorage.setItem('account', JSON.stringify(account));

                        if(account.isTeacher == true) {
                            this.router.navigate(['teacher-index']);
                        } else {
                            // router den component student cua may ong
                        }
                });
            },
            (err: any) => console.log(err)
        );
    }
}