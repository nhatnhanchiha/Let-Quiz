import { Router } from '@angular/router';
import { Question } from '../models/Question';
import { Answer } from '../models/Answer';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './createQuestion.component.html',
    styleUrls: ['./createQuestion.component.css'],
})

export class CreateQuestionComponent implements OnInit {

    account: Account = JSON.parse(sessionStorage.getItem('account'));
    ListQuantion: Question[] = JSON.parse(sessionStorage.getItem('listQuestion'));
    question: Question = {
        questionId: 1,
        content: "",
        answers: new Array()
    };
    correctAnswer: string;
    otherAnswer: string;
    otherChoice: string[] = new Array();
    otherChoices: Answer[] = new Array();
    a: Answer = {
        answerId: 1,
        content: "",
        isCorrect: true
    };
    x: number = 0;
    constructor(private router: Router) {     }
    errorCreateQuestion: string;
    ngOnInit() {
        let token: string = sessionStorage.getItem('token');
    }

    logout() {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
    addChocie() {
        if (this.otherChoice.includes(this.otherAnswer) || this.otherAnswer === this.correctAnswer || this.otherAnswer.length == 0) {
            confirm("can't add this choice");
        } else {
            this.otherChoice.push(this.otherAnswer);
            var x: Answer = {
                answerId: 1,
                content: this.otherAnswer,
                isCorrect: false
            };
            this.otherChoices.push(x);
        }
    }
    removeChocie(fg: string) {
        let index = this.otherChoice.findIndex(c => c === fg);
        this.otherChoice.splice(index, 1);
        this.otherChoices.splice(index, 1);
    }
    onSubmit() {
        if (this.otherChoice.length <= 0) {
            confirm("add more other choice to create question");
        } else {
            this.a.content = this.correctAnswer;
            this.question.answers.push(this.a);
            for (let s of this.otherChoices) {
                this.question.answers.push(s);
            }
            this.question.questionId = this.ListQuantion.length;
            this.ListQuantion.push(this.question);
            sessionStorage.setItem('listQuestion', JSON.stringify(this.ListQuantion));
            this.router.navigate(['/createQuizt']);
        }
    }
}
