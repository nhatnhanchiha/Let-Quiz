import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './teacher-index.component.html',
    styleUrls: ['./teacher-index.component.css'],
})

export class TeacherIndexComponent implements OnInit {

    account: Account = JSON.parse(sessionStorage.getItem('account'));
    
    constructor(private router: Router) {     }

    ngOnInit() {
        let token: string = sessionStorage.getItem('token');
    }

    logout() {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
}
