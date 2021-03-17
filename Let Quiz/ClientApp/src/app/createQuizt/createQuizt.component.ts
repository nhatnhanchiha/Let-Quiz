import { Router } from '@angular/router';
import { Quiz } from '../models/Quiz';
import { Account } from './../models/Account';
import { QuestionService } from './../services/QuestionService';
import { Question } from '../models/Question';
import { QuizService } from './../services/QuizService';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './createQuizt.component.html',
    styleUrls: ['./createQuizt.component.css'],
})

export class CreateQuiztComponent implements OnInit {

    account: Account = JSON.parse(sessionStorage.getItem('account'));
    quiz: Quiz = JSON.parse(sessionStorage.getItem('quizt'));
    ListQuantion: Question[];
    constructor(private quiztService: QuizService, private questionService: QuestionService,private router: Router) {     }
    errorCreateQuestion: string;
    ngOnInit() {
        this.ListQuantion = JSON.parse(sessionStorage.getItem('listQuestion'));
        if (this.ListQuantion == null) {
            this.ListQuantion = new Array();
        }
        sessionStorage.setItem('listQuestion', JSON.stringify(this.ListQuantion));
        this.quiz = JSON.parse(sessionStorage.getItem('quizt'));
        if (this.quiz == null) {
            var q: Quiz = {
                quizId: 10,
                name: "",
                password: "",
                createDate: "",
                duration: 0,
                isExpire: false,
                maxPoint: 10,
                teacherName: this.account.username,
                questionDtos: null
            };
            this.quiz = q;
        }
        sessionStorage.setItem('quizt', JSON.stringify(this.quiz));
    }

    removeQuestion(fg: number) {
        let index = this.ListQuantion.findIndex(c => c.questionId === fg);
        this.ListQuantion.splice(index, 1);
        sessionStorage.setItem('listQuestion', JSON.stringify(this.ListQuantion));
        sessionStorage.setItem('quizt', JSON.stringify(this.quiz));
    }
    logout() {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
    addQuestion() {
        sessionStorage.setItem('quizt', JSON.stringify(this.quiz));
        this.router.navigate(['/createQuestion'])
    }
    onSubmit() {
        if (this.ListQuantion != null) {
            if (this.ListQuantion.length == 0) {
                confirm("can't Create you must add question");
            } else {
                let token: string = sessionStorage.getItem('token');
                let quizt: Quiz = {
                    quizId: 0,
                    name: this.quiz.name,
                    password: this.quiz.password,
                    createDate: "0001-01-01T00:00:00",
                    duration: this.quiz.duration,
                    isExpire: false,
                    maxPoint: 100,
                    teacherName: this.quiz.teacherName,
                    questionDtos: []
                }
                this.quiztService.insertQuizzes(quizt, token).subscribe(
                    (data: Quiz) => {
                        for (let q of this.ListQuantion) {
                            let ques: Question = {
                                answers: q.answers,
                                content: q.content,
                                questionId: q.questionId
                            }
                            this.questionService.insertQuestion(ques, token).subscribe(
                                (data: Question) => {
                                    console.log("ss");
                                }
                            );
                        }
                        this.router.navigate(['teacher-index']);
                    }
                );
            }
            sessionStorage.setItem('listQuestion', null);
            sessionStorage.setItem('quizt', null);
        }
    }
}
