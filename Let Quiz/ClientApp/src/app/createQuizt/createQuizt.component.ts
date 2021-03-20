import { Router } from '@angular/router';
import { Quiz } from '../models/Quiz';
import { Account } from './../models/Account';
import { Answer } from './../models/Answer';
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
    listQuestion: Question[];
    constructor(private quiztService: QuizService, private questionService: QuestionService,private router: Router) {     }
    errorCreateQuestion: string;
    ngOnInit() {
        this.listQuestion = JSON.parse(sessionStorage.getItem('listQuestion'));
        if (this.listQuestion == null) {
            this.listQuestion = new Array();
        }
        sessionStorage.setItem('listQuestion', JSON.stringify(this.listQuestion));
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
        let index = this.listQuestion.findIndex(c => c.questionId === fg);
        this.listQuestion.splice(index, 1);
        sessionStorage.setItem('listQuestion', JSON.stringify(this.listQuestion));
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
        if (this.listQuestion != null) {
            if (this.listQuestion.length == 0) {
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
                for (let q of this.listQuestion) {
                    let question: Question = {
                        questionId: q.questionId,
                        content: q.content,
                        answers: []
                    }
                    for (let a of q.answers) {
                        let answer: Answer = {
                            answerId: a.answerId,
                            content: a.content,
                            isCorrect: a.isCorrect
                        }
                        question.answers.push(answer);
                    }
                    quizt.questionDtos.push(question);
                }
                this.quiztService.insertQuizzes(quizt, token).subscribe(
                    (data: Quiz) => {
                        this.router.navigate(['teacher-index']);
                    }
                );
            }
            sessionStorage.setItem('listQuestion', null);
            sessionStorage.setItem('quizt', null);
        }
    }
}
