import { PagingQuiz } from './../models/PagingQuiz';
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
    pagingQuiz: PagingQuiz = {
        searchValue: "",
        currentPage: 1,
        maxPage: 1,
        nextPage: null,
        previousPage: null,
        quizzes: null
    }

    account: Account = JSON.parse(sessionStorage.getItem('account'));
    password: string;
    errPassword: string;
    searchValue = "";

    private quiz: Quiz;
    private maxRecord = 2;

    constructor(private quizService: QuizService, private router: Router, private modalService: NgbModal, config: NgbModalConfig) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {

        let token: string = sessionStorage.getItem('token');
        let currentPage = 1;

        this.quizService.getQuizzes(token, this.searchValue, currentPage, this.maxRecord).subscribe(
            (data: PagingQuiz) => {
                this.pagingQuiz = data;
                this.quizzes = data.quizzes;
            },
            (err :any) => this.router.navigate(['/login'])
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

    nextPage() {

        let token: string = sessionStorage.getItem('token');

        if(this.pagingQuiz.nextPage != null) {
            this.quizService.changePage(token, this.pagingQuiz.nextPage).subscribe(
                (data: PagingQuiz) => {
                    this.pagingQuiz = data;
                    this.quizzes = data.quizzes;
                }
            )
        }
    }

    previousPage() {

        let token: string = sessionStorage.getItem('token');

        if(this.pagingQuiz.previousPage != null) {
            this.quizService.changePage(token, this.pagingQuiz.previousPage).subscribe(
                (data: PagingQuiz) => {
                    this.pagingQuiz = data;
                    this.quizzes = data.quizzes;
                }
            )
        }
    }

    search() {

        let token: string = sessionStorage.getItem('token');
        let currentPage = 1;

        this.quizService.getQuizzes(token, this.searchValue, currentPage, this.maxRecord).subscribe(
            (data: PagingQuiz) => {
                this.pagingQuiz = data;
                this.quizzes = data.quizzes;
            }
        );
    }

    onSubmit() {
        if(this.quiz.password === this.password) {
            this.errPassword = "";
            sessionStorage.setItem("quizID", this.quiz.quizId.toString());
            sessionStorage.setItem("quiz", JSON.stringify(this.quiz));
            this.router.navigate(['/quiz']);
            this.modalService.dismissAll();
        } else {
            this.errPassword = "Incorrect password";
        }
    }
}
