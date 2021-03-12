import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccountService} from '../../services/AccountService';
import {Account} from '../../models/Account';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-student-profile',
    templateUrl: './student-profile.component.html',
    styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
    // @ts-ignore
    @ViewChild('editForm') editForm: FormGroup;
    account: Account;
    nameErr = '';
    passErr = '';


    @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
        if (this.editForm.dirty) {
            $event.returnValue = true;
        }
    }

    constructor(private http: HttpClient, private accountService: AccountService,
                private fb: FormBuilder) {
    }


    ngOnInit() {
        this.loadProfile();
    }


    initialForm() {
        this.editForm = this.fb.group({
            name: [this.account.name],
            password: [''],
        });
    }

    loadProfile() {
        this.accountService.getProfile().subscribe((account: Account) => {
            this.account = account;
            this.initialForm();
        });
    }

    updateProfile() {
        let isValid = true;
        if (this.editForm.controls['name'].value.length <= 0) {
            this.nameErr = 'Name is required!';
            isValid = false;
        } else {
            this.nameErr = '';
        }
        if (this.editForm.controls['password'].value.length <= 0) {
            this.passErr = 'Password is required!';
            isValid = false;
        } else {
            this.passErr = '';
        }

        if (isValid) {
            this.accountService.updateProfile(this.editForm.value).subscribe(() => {
                this.accountService.getProfile().subscribe((account: Account) => {
                    this.account = account;
                    this.accountService.setCurrentAccount(account);
                });
                this.initialForm();
            }, error => {
                if (error.status === 400) {
                    this.passErr = "Wrong password!";
                } else {
                    this.passErr = "Unhandle error, Please contact to admin";
                }
            });
        }
    }
}
