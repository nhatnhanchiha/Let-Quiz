import { Router } from '@angular/router';
import { AccountService } from './../services/AccountService';
import { Account } from './../models/Account';
import { Component } from '@angular/core';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {

    newAccount: Account = {
        username: "",
        name: "",
        password: "",
        isTeacher: false,
        status: true
    };

    confirmPassword: string = "";

    msgErrorUserName: string = "";
    msgErrorConfirm: string = "";

    private errCondit: boolean;

    constructor(private accountService: AccountService, private router: Router) { }

    onSubmit() {
        if (this.newAccount.password === this.confirmPassword) {
            this.msgErrorConfirm = "";
            this.errCondit = false;
        } else {
            this.msgErrorConfirm = "confirm password doesn't match";
            this.errCondit = true;   
        }

        if(this.errCondit === false) {
            this.accountService.register(this.newAccount).subscribe(
                (data: Account) => this.router.navigate(['/login'])
            )
        }
    }

    onblur() {
        this.accountService.checkUserNameExist(this.newAccount.username).subscribe(
            (data: Account) => {
                if(data.username.length > 0) {
                    this.msgErrorUserName = "This username is already registered";
                    this.errCondit = true;
                } else {
                    this.msgErrorUserName = "";
                    this.errCondit = false;
                }
            }
        );
    }
}