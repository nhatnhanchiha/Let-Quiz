import { Router } from '@angular/router';
import { Quiz } from '../models/Quiz';
import { QuizService } from '../services/QuizService';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './student-index.component.html',
    styleUrls: ['./student-index.component.css'],
    providers: [NgbModalConfig, NgbModal]
})

export class StudentIndexComponent implements OnInit {

    quizzes: Quiz[];
    account: Account = JSON.parse(sessionStorage.getItem('account'));
    password: string;
    errPassword: string;
    private quiz: Quiz;
    
    constructor(private quizService: QuizService, private router: Router, private modalService: NgbModal, config: NgbModalConfig) { 
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        let token: string = sessionStorage.getItem('token');

        this.quizService.getQuizzes(token).subscribe(
            (data: Quiz[]) => this.quizzes = data
        );
    }

    logout() {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }

    open (content, quizID: number) {
        this.password = "";
        this.errPassword = "";
        this.modalService.open(content);

        this.quiz = this.quizzes.find(q => q.quizId === quizID);
    }

    onSubmit() {
        if(this.quiz.password === this.password) {
            this.errPassword = "";
            sessionStorage.setItem("quizID", this.quiz.quizId.toString());
            this.router.navigate(['/quiz']);
            this.modalService.dismissAll();
        } else {
            this.errPassword = "Incorrect password";
        }
    }
}