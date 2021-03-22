import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../models/Quiz';
import { PasswordQuiz } from '../../models/PasswordQuiz';
import { Question } from '../../models/Question';
import { QuizService } from '../../services/QuizService';
import { QuestionService } from '../../services/QuestionService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './view-quiz.component.html',
    styleUrls: ['./view-quiz.component.css'],
    providers: [NgbModal]
})

export class ViewQuizDetail implements OnInit {

    account: Account = JSON.parse(sessionStorage.getItem('account'));
    quizID: number = JSON.parse(sessionStorage.getItem('quizID'));
    questions: Question[];
    quiz: Quiz;
    hide: boolean = true;
    OldPassword: string = "";
    NewPassword: string = "";
    errPassword: string = "";
    showMessage: string;
    constructor(private quizService: QuizService, private questionService: QuestionService, private router: Router, private modalService: NgbModal) { }

    ngOnInit() {
        let token: string = sessionStorage.getItem('token');

        this.quizService.getQuizDetail(this.quizID, token).subscribe(
            (data: Quiz) => this.quiz = data);

        this.questionService.getQuestionsByQuizID(this.quizID.toString(), token).subscribe(
            (data: Question[]) => {
                this.questions = data
            }
        );
        
    }

    logout() {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }

    open(change, OldPassword: string) {
        this.errPassword = "";
        this.OldPassword = OldPassword;
        this.modalService.open(change);
    }

    show() {
        this.hide = !this.hide;
    }

    submit(message) {
        if (this.OldPassword === this.NewPassword) {
            this.errPassword = "New password is duplicate with old password";
        } else {
            let token: string = sessionStorage.getItem('token');
            let password: PasswordQuiz = {
                quizId: this.quizID,
                password: this.NewPassword
            }
            this.quizService.changePassword(password, token).subscribe(() => {
                this.modalService.dismissAll();
                this.NewPassword = "";
                this.showMessage = "Change password successful!";
                this.modalService.open(message);
                //alert("Change password successful!");
                this.ngOnInit();   
            });
        }
    }

    reOpen(reopen) {
        this.errPassword = "";
        this.modalService.open(reopen);
    }

    reOpenQuiz(message) {
        if (this.quiz.isExpire) {
            let token: string = sessionStorage.getItem('token');
            this.quizService.openQuiz(this.quizID.toString(), token).subscribe(() => {
                this.modalService.dismissAll();
                this.ngOnInit();
                this.showMessage = "Re-open quiz successful!";
                this.modalService.open(message);
                //alert("Re-open quiz successful!");
            });
        } else {
            this.errPassword = "This quiz is in opening!";
        }
        
    }
}
