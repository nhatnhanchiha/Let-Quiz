import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccountService} from '../../services/AccountService';
import {Account} from '../../models/Account';
import { FormBuilder, FormGroup } from '@angular/forms';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-teacher-profile',
    templateUrl: './teacher-profile.component.html',
    styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {
    // @ts-ignore
    @ViewChild('editForm') editForm: FormGroup;
    changePasswordForm: FormGroup;
    account: Account;
    nameErr = '';
    passErr = '';
    currentPasswordError = '';
    newPasswordError = '';
    confirmPasswordError = '';
    status = '';


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

    changePasswordClick() {
        document.getElementById('editForm').classList.add('d-none');
        document.getElementById('changePassForm').classList.remove('d-none');
    }


    initialForm() {
        this.editForm = this.fb.group({
            name: [this.account.name],
            password: [''],
        });
        this.changePasswordForm = this.fb.group({
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        });
    }

    updatePassword() {
        let isValid = true;
        this.status = '';
        if (this.changePasswordForm.controls['currentPassword'].value.length <= 0) {
            this.currentPasswordError = 'You must input current password';
            isValid = false;
        } else {
            this.currentPasswordError = '';
        }

        if (this.changePasswordForm.controls['newPassword'].value.length <= 0) {
            this.newPasswordError = 'You must input new password';
            isValid = false;
        } else {
            this.newPasswordError = '';
        }

        if (this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmNewPassword'].value) {
            this.confirmPasswordError = 'Confirm password is incorrect';
            isValid = false;
        } else {
            this.confirmPasswordError = '';
        }

        if (!isValid) {
            return;
        }

        this.accountService.updatePassword(this.changePasswordForm.value).subscribe(() => {
            let done = false;
            this.accountService.getProfile().subscribe((account: Account) => {
                this.account = account;
                this.accountService.setCurrentAccount(account);
                this.initialForm();
                this.status = 'Saved change!';
                done = true;
            });
            if (!done) {
                delay(1000)
            }
        }, error => {
            if (error.status === 400) {
                this.currentPasswordError = 'Wrong password!';
            } else {
                this.currentPasswordError = 'Unhandle error, Please contact to admin';
            }
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
                    this.initialForm();
                });
            }, error => {
                if (error.status === 400) {
                    this.passErr = "Wrong password!";
                } else {
                    this.passErr = "Unhandle error, Please contact to admin";
                }
            });
        }
    }

    cancelChangePassword() {
        this.currentPasswordError = '';
        this.newPasswordError = '';
        this.confirmPasswordError = '';
        this.status = '';
        this.initialForm();
        document.getElementById('editForm').classList.remove('d-none');
        document.getElementById('changePassForm').classList.add('d-none');
    }
}
