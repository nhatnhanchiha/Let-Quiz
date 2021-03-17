import { Router } from '@angular/router';
import { PagingQuiz } from './../models/PagingQuiz';
import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/Quiz';
import { QuizService } from '../services/QuizService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './teacher-index.component.html',
    styleUrls: ['./teacher-index.component.css'],
    providers: [NgbModal]
})

export class TeacherIndexComponent implements OnInit {

    account: Account = JSON.parse(sessionStorage.getItem('account'));
    quizzes: Quiz[];
    pagingQuiz: PagingQuiz = {
        searchValue: "",
        currentPage: 1,
        maxPage: 1,
        nextPage: null,
        previousPage: null,
        quizzes: null
    }
    searchValue = "";
    private maxRecord = 5;
    quizID: number;
    err: string;

    constructor(private quizService: QuizService, private router: Router, private modalService: NgbModal) { }

    ngOnInit() {
        let token: string = sessionStorage.getItem('token');
        let currentPage = 1;

        this.quizService.getQuizzes(token, this.searchValue, currentPage, this.maxRecord).subscribe(
            (data: PagingQuiz) => {
                this.pagingQuiz = data;
                this.quizzes = data.quizzes;
            },
            (err: any) => this.router.navigate(['/login'])
        );
    }

    logout() {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }

    view(quizID: number) {
        sessionStorage.setItem("quizID", quizID.toString());
        this.router.navigate(['/view-quiz-detail']);
    }

    closeConfirm(close, ID: number) {
        this.quizID = ID;
        this.err = "";
        this.modalService.open(close);
    }

    closeQuiz() {
        let token: string = sessionStorage.getItem('token');
        this.quizService.getQuizDetail(this.quizID, token).subscribe((data: Quiz) => {
            if (data.isExpire) {
                this.err = "It's closed!";
            } else {
                this.quizService.closeQuiz(data.quizId, token).subscribe(() => {
                    this.modalService.dismissAll();
                    alert("Close quiz successful!");
                    this.ngOnInit();
                }); 
            }
        });
    }

    nextPage() {

        let token: string = sessionStorage.getItem('token');

        if (this.pagingQuiz.nextPage != null) {
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

        if (this.pagingQuiz.previousPage != null) {
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
}
