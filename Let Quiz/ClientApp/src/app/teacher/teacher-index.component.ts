import { Router } from '@angular/router';
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
    quizID: number;
    err: string;

    constructor(private quizService: QuizService, private router: Router, private modalService: NgbModal) { }

    ngOnInit() {
        let token: string = sessionStorage.getItem('token');

        this.quizService.getOwnQuizzes(token).subscribe(
            (data: Quiz[]) => this.quizzes = data
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

}
